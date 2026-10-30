<?php
/**
 * Elektro Beránek — zpracování poptávkového formuláře (kontakt.html).
 *
 * Vyžaduje PHP 7.4+ a funkční funkci mail() na hostingu (běžné u českých webhostingů).
 * Před spuštěním zkontrolujte nastavení níže, hlavně ODESILATEL: adresa musí patřit
 * doméně webu (SPF/DMARC), jinak mohou zprávy končit ve spamu.
 *
 * Odpověď: JSON pro odeslání přes JavaScript (fetch), jinak přesměrování zpět na kontakt.html.
 */

declare(strict_types=1);

date_default_timezone_set('Europe/Prague');

// ---------------- NASTAVENÍ ----------------
const PRIJEMCE   = 'info@elektroberanek.cz';                 // kam se poptávky doručují (z původního webu)
const ODESILATEL = 'web@solarni-elektrarny.eu';              // adresa na doméně webu — ověřte, že ji hosting povoluje
const PREDMET    = 'Poptávka z webu solarni-elektrarny.eu';
const LIMIT_ZA_HODINU = 5;                                   // max. odeslání z jedné IP adresy za hodinu
const MIN_SEKUND = 3;                                        // rychlejší odeslání = robot
// -------------------------------------------

$wantsJson = (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
          || (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch');

function odpoved(bool $ok, string $chyba = '', int $kod = 200): void {
    global $wantsJson;
    http_response_code($kod);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $chyba], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: kontakt.html?stav=' . ($ok ? 'odeslano' : 'chyba') . '#poptavka', true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    odpoved(false, 'Formulář je potřeba odeslat metodou POST.', 405);
}

// Ochrana proti odeslání z cizího webu (pokud prohlížeč hlavičku Origin posílá)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST);
    $serverHost = preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? ''));
    if (!$host || strcasecmp($host, $serverHost) !== 0) {
        odpoved(false, 'Neplatný původ požadavku.', 403);
    }
}

$vstup = static function (string $klic, int $max): string {
    $v = isset($_POST[$klic]) && is_string($_POST[$klic]) ? $_POST[$klic] : '';
    $v = trim(str_replace("\0", '', $v));
    return function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max);
};
$jednoradkove = static fn(string $s): string => trim(preg_replace('/[\r\n\t]+/u', ' ', $s) ?? '');

$jmeno   = $jednoradkove($vstup('jmeno', 120));
$telefon = $jednoradkove($vstup('telefon', 30));
$email   = $jednoradkove($vstup('email', 160));
$sluzba  = $jednoradkove($vstup('sluzba', 80));
$obec    = $jednoradkove($vstup('obec', 120));
$zprava  = $vstup('zprava', 3000);
$past    = $vstup('web', 200);
$ts      = (int) $vstup('ts', 20);

// Past na roboty: skryté pole musí zůstat prázdné. Robotovi tváříme úspěch, nic se ale neodešle.
if ($past !== '') {
    odpoved(true);
}
if ($ts > 0 && (time() * 1000 - $ts) < MIN_SEKUND * 1000) {
    odpoved(false, 'Formulář byl odeslán příliš rychle. Zkuste to prosím znovu.', 429);
}

// Validace na serveru
$povoleneSluzby = [
    'Fotovoltaická elektrárna na klíč', 'Sestava FVE 5', 'Sestava FVE 10-1', 'Sestava FVE Full', 'Sestava FVE Solax',
    'Revize nebo servis elektrárny', 'Vyřízení dotace NZÚ', 'Montáž svépomocí s revizí', 'Elektroinstalace a elektromontáže', 'Jiný dotaz',
];
$chyby = [];
if ((function_exists('mb_strlen') ? mb_strlen($jmeno, 'UTF-8') : strlen($jmeno)) < 2) $chyby[] = 'jméno';
if ($email === '' && $telefon === '') $chyby[] = 'telefon nebo e-mail';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $chyby[] = 'platný e-mail';
if ($telefon !== '' && !preg_match('/^(\+|00)?[0-9]{9,14}$/', preg_replace('/[\s()\-]/', '', $telefon) ?? '')) $chyby[] = 'platný telefon';
if (!in_array($sluzba, $povoleneSluzby, true)) $chyby[] = 'požadovanou službu';
if ($chyby) {
    odpoved(false, 'Zkontrolujte prosím: ' . implode(', ', $chyby) . '.', 422);
}

// Jednoduchý limit počtu odeslání z jedné IP (ukládá se jen hash IP, na hodinu)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'neznama';
$limitSoubor = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'eb-form-' . hash('sha256', $ip . __FILE__) . '.json';
$nyni = time();
$zaznamy = [];
if (is_readable($limitSoubor)) {
    $zaznamy = json_decode((string) file_get_contents($limitSoubor), true) ?: [];
    $zaznamy = array_values(array_filter($zaznamy, static fn($t) => is_int($t) && $t > $nyni - 3600));
}
if (count($zaznamy) >= LIMIT_ZA_HODINU) {
    odpoved(false, 'Z vaší adresy už bylo odesláno více poptávek. Zkuste to prosím později nebo zavolejte.', 429);
}

// Sestavení e-mailu (prostý text, UTF-8)
$radky = [
    'Nová poptávka z webu solarni-elektrarny.eu',
    str_repeat('-', 44),
    'Jméno:    ' . $jmeno,
    'Telefon:  ' . ($telefon !== '' ? $telefon : '—'),
    'E-mail:   ' . ($email !== '' ? $email : '—'),
    'Služba:   ' . $sluzba,
    'Obec:     ' . ($obec !== '' ? $obec : '—'),
    '',
    'Zpráva:',
    $zprava !== '' ? $zprava : '—',
    '',
    str_repeat('-', 44),
    'Odesláno: ' . date('j. n. Y H:i'),
];
$telo = implode("\r\n", $radky);
$predmet = '=?UTF-8?B?' . base64_encode(PREDMET . ' – ' . $sluzba) . '?=';
$hlavicky = [
    'From: =?UTF-8?B?' . base64_encode('Web Elektro Beránek') . '?= <' . ODESILATEL . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: solarni-elektrarny.eu',
];
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $hlavicky[] = 'Reply-To: ' . $email; // e-mail je validovaný a bez konců řádků → bez rizika vložení hlaviček
}

$odeslano = @mail(PRIJEMCE, $predmet, $telo, implode("\r\n", $hlavicky), '-f' . ODESILATEL);
if (!$odeslano) { // některé hostingy parametr -f nepovolují
    $odeslano = @mail(PRIJEMCE, $predmet, $telo, implode("\r\n", $hlavicky));
}

if (!$odeslano) {
    error_log('[odeslat.php] mail() selhal pro poptávku od ' . $jmeno);
    odpoved(false, 'Server zprávu nepřijal k doručení.', 500);
}

$zaznamy[] = $nyni;
@file_put_contents($limitSoubor, json_encode($zaznamy), LOCK_EX);
odpoved(true);
