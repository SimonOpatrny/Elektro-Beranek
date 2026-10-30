# _vyvoj — nástroje pro úpravy webu

Tato složka se **nenahrává na hosting**.

## Generátor stránek

Hlavička, patička, navigace, ikony a metadata jsou definované na jednom místě v `lib/`.
Obsah každé stránky je v `pages/*.mjs`. Po úpravě spusťte (Node.js 18+):

```
node build.mjs
```

Vygenerované `*.html` se zapíší do kořene webu. Generátor zároveň doplní českou typografii
(nezlomitelné mezery po jednopísmenných předložkách a mezi číslem a jednotkou).

- `lib/layout.mjs` — firemní údaje (`FIRM`), navigace, hlavička, patička, `<picture>`, strukturovaná data
- `lib/icons.mjs` — sada vlastních ikon (SVG sprite)
- `lib/energy.mjs` — interaktivní schéma hybridní elektrárny
- `lib/typo.mjs` — česká typografie
- `pages/` — obsah stránek (ceník: pole `PKGS` v `pages/cenik.mjs`, FAQ: pole `CATS` v `pages/faq.mjs`)

## Obrázky

`images.py` (Python 3 + Pillow s podporou AVIF) vyrobí z originálů v `../_podklady/` výřezy
v AVIF a WebP. Výřez a velikosti se nastavují v tabulce `JOBS`. Rozměry se zapíší do `images.json`,
odkud je čte generátor (kvůli `width`/`height` a stabilnímu rozvržení).

```
pip install pillow
python images.py               # všechny
python images.py montaz-panel  # jen vybraný
```

## Testy

```
cd ..            # kořen webu
php -S 127.0.0.1:8080
# v druhém terminálu:
cd _vyvoj && npm install && npx playwright install chromium && node test.cjs
```

Testy kontrolují odkazy a kotvy, chyby konzole, přetečení na 9 šířkách, přístupnost (axe-core),
mobilní menu, podmenu, FAQ, schéma, mapu, formulář a přesměrování starých adres.
Pro kontrolu obsahu odeslaného e-mailu spusťte PHP s falešným sendmailem a nastavte `MAILFILE`.
