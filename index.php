<?php
// Původní úvodní stránka index.php → trvalé přesměrování na kořen webu.
// Pokud server volá index.php jako výchozí soubor pro „/", zobrazí se přímo index.html (bez smyčky).
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
if (preg_match('~/index\.php$~i', $uri)) {
    header('Location: /', true, 301);
    exit;
}
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/index.html');
