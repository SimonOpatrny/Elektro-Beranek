# Elektro Beránek — redesign webu solarni-elektrarny.eu

Kompletní nový web pro **Elektro Beránek | Solární elektrárny** (Václav Beránek, Vejprnice).
Čisté HTML, CSS a JavaScript bez frameworků a bez externích knihoven. Fonty i obrázky jsou uložené přímo ve webu.

Pracovní verze vznikla 29. 10. 2026 na základě auditu původního webu https://www.solarni-elektrarny.eu/.
**Produkční web nebyl nijak měněn.**

---

## 1. Jak web zobrazit

**Nejrychleji:** otevřete `index.html` dvojklikem v prohlížeči. Funguje vše kromě odeslání formuláře
(soubor z disku nemá kam zprávu poslat, formulář to návštěvníkovi poctivě oznámí).

**Jako na hostingu (včetně formuláře a přesměrování):** ve složce webu spusťte

```
php -S 127.0.0.1:8080
```

a otevřete http://127.0.0.1:8080/. Bez nastaveného poštovního serveru formulář vrátí chybu
„Server zprávu nepřijal k doručení“ — to je správné chování, nic se nepředstírá.

Ve VS Code lze použít i rozšíření Live Server (bez PHP, tedy bez odesílání formuláře).

---

## 2. Stránky

| Nová stránka | Původní adresa | Obsah |
|---|---|---|
| `index.html` | `/`, `index.php` | Úvod: hero, služby, „na klíč“, postup, ceník, komponenty, dotace, FAQ |
| `sluzby.html` | `sluzby.php` | Přehled 6 služeb, podrobný postup montáže, platba |
| `fotovoltaika.html` | `fotovoltaika.php` | Typy elektráren, srovnání, interaktivní schéma hybridní FVE, měnič, baterie |
| `instalace.html` | `instalace.php` | Postup v 10 krocích, rychlost instalace, revize, slovníček, montáž svépomocí |
| `dotace.html` | `dotace.php` | Vyřízení dotace NZÚ, rozdělení práce, cesta k dotaci |
| `cenik.html` | `cenik.php` | 4 standardní sestavy, srovnávací tabulka, co obsahuje „na klíč“ |
| `onas.html` | `onas.php` | Firma, tým, přístup, co získáte, firemní údaje, užitečné odkazy |
| `faq.html` | `faq.php` | 7 otázek ve 3 kategoriích |
| `kontakt.html` | `kontakt.php` | Kontakty, otevírací doba, poptávkový formulář, mapa |
| `ochrana-osobnich-udaju.html` | — (nová) | Informace o zpracování údajů z formuláře |
| `404.html` | — (nová) | Chybová stránka |

Staré adresy `*.php` se trvale (301) přesměrují na nové — dvojitě: pravidly v `.htaccess`
a záložně malými PHP soubory se stejnými názvy (fungují i na hostingu, který `.htaccess` ignoruje).

---

## 3. Nasazení na hosting

1. **Zálohujte původní web** (všechny soubory na FTP).
2. Nahrajte do kořene webu obsah této složky **kromě** `_vyvoj/`, `_podklady/` a `README.md`.
   Původní `*.php` soubory se přepíšou přesměrováními — to je záměr.
3. Staré složky `css/`, `js/`, `bootstrap/`, `img/` nový web nepotřebuje; po ověření je můžete smazat.
4. Nastavte formulář (kapitola 4) a odešlete zkušební poptávku.
5. V Google Search Console odešlete novou mapu webu `https://www.solarni-elektrarny.eu/sitemap.xml`.

`.htaccess` předpokládá Apache (běžné u českých hostingů). Všechny bloky jsou v `<IfModule>`,
takže chybějící modul web nerozbije. Vynucení HTTPS a HSTS je záměrně vypnuté (hosting běží za proxy
`openresty`, hrozila by smyčka přesměrování) — HTTPS zapněte v administraci hostingu.

---

## 4. Poptávkový formulář

Soubor `odeslat.php` (PHP 7.4+) přijme poptávku, ověří ji a odešle e-mailem přes funkci `mail()`.

V hlavičce souboru zkontrolujte:

```php
const PRIJEMCE   = 'info@elektroberanek.cz';   // kam chodí poptávky (převzato z původního webu)
const ODESILATEL = 'web@solarni-elektrarny.eu'; // adresa na doméně webu — ověřte u hostingu
```

Ochrany: kontrola na serveru i v prohlížeči, skryté pole proti robotům, minimální doba vyplnění,
limit 5 odeslání za hodinu z jedné IP (ukládá se jen hash), kontrola původu požadavku,
ochrana proti vložení e-mailových hlaviček, ochrana proti dvojímu odeslání.
Funguje i bez JavaScriptu (po odeslání návrat na `kontakt.html?stav=odeslano` / `?stav=chyba`).

Pokud hosting nepovoluje `mail()`, je potřeba odesílání přepnout na SMTP (např. knihovnou PHPMailer
s přístupovými údaji od hostingu). Žádné přístupové údaje v projektu nejsou.

Odkazy z ceníku předvyplní zájem o sestavu: `kontakt.html?sestava=fve-5#poptavka`
(další klíče: `fve-10-1`, `fve-full`, `fve-solax`, `servis`, `dotace`, `svepomoci`, `elektro`).

---

## 5. Co je potřeba ověřit s klientem před spuštěním

Obsah je převzatý z původního webu. Nic nebylo vymyšleno, ale některé údaje jsou z let 2022–2023:

1. **Dotace NZÚ a ceny „po odečtení dotace“.** Původní web uvádí „až 50 % z ceny, max. 205 000 Kč“
   a v ceníku „až 140 000 Kč“. Pravidla NZÚ se od roku 2024 několikrát změnila (podle článků z roku 2026
   je u běžných rodinných domů fotovoltaika podporována hlavně zvýhodněným úvěrem, přímá dotace
   v programu NZÚ Light). Částky a ceník je nutné aktualizovat, nebo je odstranit.
2. **Zálohy.** `sluzby.php` říká „zálohy na komponenty většinou nepožadujeme“, `instalace.php`
   uvádí krok „platba zálohy“. Na nové stránce Instalace je krok formulován neutrálně
   („podle podmínek ve smlouvě o dílo“) — potvrďte správné znění.
3. **Ostrovní elektrárna a ERÚ** — věta o nepotřebném povolení ERÚ (v originále omylem „hybridní“).
4. **„Návratnost investice již do 7 let“** — marketingové tvrzení z původního webu.
5. **Jednotky v ceníku** byly opraveny: kapacita baterií v kWh (původně „kW“), výkon elektráren v kWp.
6. **Zkušenosti** „7 let s fotovoltaikou“ (text z roku 2023) jsou na webu jako „7+ let“.
7. **Fotografie jsou ilustrační** (Unsplash). Ideálně nahradit fotkami skutečných realizací
   (např. z Instagramu @solarni.elektrarna) — stačí vyměnit soubory v `assets/img/` nebo spustit
   `_vyvoj/images.py` s novými zdroji.
8. **Text ochrany osobních údajů** je navržený pro poptávkový formulář — nechte jej zkontrolovat.
9. **Logo**: použit původní znak (beránek, slunce, dům) z `logo.png`. Pro ostré zobrazení doporučuji
   získat logo ve vektoru (SVG).

### Odstraněno z původního webu (záměrně)

- Spamový odkaz „Connections Puzzle“ (connectionsgame.org) v patičce — s firmou nesouvisí.
- Google Analytics a Google Ads, které se načítaly **před** udělením souhlasu, a lišta cookies TermsFeed.
  Nový web žádné sledovací nástroje ani cookies nepoužívá. Pokud je měření potřeba, přidejte jej
  s řádným souhlasem (consent management).
- Nefunkční vyhledávání (u 9 stránek zbytečné).
- Odkaz `goo.gl/maps/…` (služba goo.gl je ukončena) — nahrazen odkazy na Mapy.cz a Google Maps.
- Mapa Google se načítá až po kliknutí (bez cookies třetích stran předem).

---

## 6. Struktura

```
index.html … kontakt.html     stránky
404.html, ochrana-osobnich-udaju.html
odeslat.php                   zpracování formuláře
*.php (onas.php …)            přesměrování starých adres
.htaccess                     přesměrování, bezpečnostní hlavičky, cache, komprese
robots.txt, sitemap.xml, site.webmanifest, favicon.ico
assets/css/styles.css         designový systém + komponenty (jeden soubor)
assets/js/main.js             interakce (menu, schéma energie, FAQ, formulář, mapa)
assets/fonts/                 Archivo (variabilní) + IBM Plex Mono, podmnožina pro češtinu, licence OFL
assets/img/                   fotky v AVIF + WebP ve 2–3 velikostech, produktové fotky, logo, ikony
_vyvoj/                       generátor stránek, zpracování obrázků, testy (nenahrávat na hosting)
_podklady/                    stažené originály (původní web, Unsplash) — nenahrávat na hosting
```

Hlavička a patička jsou na všech stránkách stejné. Pro hromadné úpravy je v `_vyvoj/` generátor
(`node build.mjs`), viz `_vyvoj/README.md`. Drobné úpravy lze dělat i přímo v HTML — pozor jen,
že nové spuštění generátoru ruční změny v HTML přepíše.

---

## 7. Designový systém (stručně)

- **Barvy:** grafit `#121518` / `#0e1113`, antracit `#1b2025`, světlá `#f3f3ef`, bílá, akcent elektrická žlutá `#ffd21f`.
- **Písmo:** Archivo (variabilní šířka i řez — nadpisy rozšířené 108 %), IBM Plex Mono pro technické popisky.
- **Motiv:** typový štítek — sražené rohy, mono popisky, čárkované řádky specifikací, technická mřížka.
- **Body zlomu:** 420, 640, 760, 960, 1100, 1240 px; obsah max. 1320 px.
- Animace respektují `prefers-reduced-motion`; schéma energie má tlačítko pro pozastavení.

---

## 8. Co bylo otestováno (automaticky, Playwright + axe-core + Lighthouse)

- 11 stránek × 9 šířek (320–1920 px): bez vodorovného přetečení.
- Všechny interní odkazy a kotvy existují, žádné chyby v konzoli ani chybějící soubory.
- Každá stránka: jeden H1, souvislá hierarchie nadpisů, `lang="cs"`, alt texty, unikátní titulky a popisy.
- axe-core (WCAG 2.1 A/AA + best practices): 0 porušení na všech stránkách.
- Lighthouse (profil mobil, lokální server bez gzip komprese): výkon 92–98, přístupnost 100, best practices 100, SEO 100, CLS 0 na všech 9 hlavních stránkách.
- Mobilní menu (otevření, Esc, zámek scrollu, fokus), podmenu (myš i klávesnice), FAQ, schéma energie,
  načtení mapy, formulář (validace, předvyplnění z ceníku, úspěšné odeslání s kontrolou obsahu e-mailu,
  chyba serveru, dvojí kliknutí, odeslání bez JavaScriptu), všech 9 přesměrování starých adres.

Netestováno: skutečné doručení e-mailu na hostingu (závisí na jeho nastavení), chování `.htaccess`
na konkrétním serveru, reálná zařízení iOS/Android (testováno v Chromiu s emulací šířek).

---

## 9. Zdroje fotografií

Fotografie z [Unsplash](https://unsplash.com/license) (bezplatná licence pro komerční užití, bez nutnosti uvádět autora):

| Soubor | Zdroj |
|---|---|
| hero-strecha, hero-strecha-l | https://unsplash.com/photos/2SfssudtyIA |
| panely-detail | https://unsplash.com/photos/To-B9ICXPnc |
| montaz-strecha | https://unsplash.com/photos/Q8V1EEvnJgk |
| montaz-panel | https://unsplash.com/photos/wmaP3Tl80ww |
| vrtani-panel | https://unsplash.com/photos/rNn_TU8dvoY |
| dum-cerne-panely | https://unsplash.com/photos/p2GuLUu79Rg |
| dum-panely | https://unsplash.com/photos/Ja8t8nJN2I4 |
| rozvadec-ruce | https://unsplash.com/photos/PkHf7BUWbtk |
| elektrikar-rozvadec | https://unsplash.com/photos/S5uFiFBeq4s |
| jistice | https://unsplash.com/photos/oj1zW_PNI4k |
| prilba-panel | https://unsplash.com/photos/2ASQyjafflo |
| panely-nebe | https://unsplash.com/photos/omfN1pW-n2Y |
| zapad-strecha | https://unsplash.com/photos/0GbrjL3vZF4 |
| multimetr | https://unsplash.com/photos/NLBJ2I0lNr4 |

Z původního webu: logo (znak), odznak „Registrovaný dodavatel NZÚ“, produktové fotky GoodWe ET,
Solax X3 a Dyness Tower (fotografie výrobců). Ilustrační fotky nejsou na webu nikde vydávány za realizace firmy.
