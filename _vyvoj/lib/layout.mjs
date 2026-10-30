import { readFileSync } from 'node:fs';
import { SPRITE, icon } from './icons.mjs';

export { icon };

const IMG = JSON.parse(readFileSync(new URL('../images.json', import.meta.url)));

// Ověřené firemní údaje převzaté z původního webu solarni-elektrarny.eu (audit 29. 10. 2026)
export const FIRM = {
  name: 'Elektro Beránek',
  tagline: 'Solární elektrárny',
  owner: 'Václav Beránek',
  phone: '+420 724 118 006',
  phoneHref: 'tel:+420724118006',
  email: 'info@elektroberanek.cz',
  provozovna: { street: 'Zahradní 555', zip: '330 27', city: 'Vejprnice', region: 'Plzeňský kraj' },
  sidlo: { street: 'Špagátovka 74', zip: '331 51', city: 'Kaznějov', region: 'Plzeňský kraj' },
  ico: '72244569',
  dic: 'CZ7802222197',
  geo: { lat: 49.734636, lng: 13.278857 },
  hours: [
    ['Pondělí – Pátek', '8:00 – 15:00'],
    ['Sobota – Neděle', '10:00 – 13:00'],
  ],
  nzu: 'https://novazelenausporam.cz/specialista/12401',
  facebook: 'https://www.facebook.com/profile.php?id=100095078303793',
  instagram: 'https://www.instagram.com/solarni.elektrarna/',
  parent: 'https://www.elektroberanek.cz/',
  domain: 'https://www.solarni-elektrarny.eu',
};

export const NAV = [
  {
    label: 'Služby', href: 'sluzby.html', key: 'sluzby',
    children: [
      { href: 'sluzby.html', key: 'sluzby', label: 'Přehled služeb', desc: 'Vše od prohlídky po servis' },
      { href: 'fotovoltaika.html', key: 'fotovoltaika', label: 'Fotovoltaika', desc: 'Hybridní, síťové a ostrovní elektrárny' },
      { href: 'instalace.html', key: 'instalace', label: 'Instalace a revize', desc: 'Postup, revize, připojení k síti' },
      { href: 'dotace.html', key: 'dotace', label: 'Dotace NZÚ', desc: 'Žádost vyřídíme za vás' },
    ],
  },
  { label: 'Ceník', href: 'cenik.html', key: 'cenik' },
  { label: 'O nás', href: 'onas.html', key: 'onas' },
  { label: 'FAQ', href: 'faq.html', key: 'faq' },
  { label: 'Kontakt', href: 'kontakt.html', key: 'kontakt' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * <picture> s AVIF + WebP a správnými rozměry (žádný posun layoutu).
 * sizes: atribut sizes; eager: obrázek v první obrazovce.
 */
export function picture(name, { alt = '', sizes = '100vw', cls = '', eager = false, imgCls = '' } = {}) {
  const meta = IMG[name];
  if (!meta) throw new Error('Neznámý obrázek: ' + name);
  const sz = meta.sizes;
  const [w, h] = sz[sz.length - 1];
  const set = (ext) => sz.map(([sw]) => `assets/img/${name}-${sw}.${ext} ${sw}w`).join(', ');
  const mid = sz[Math.min(1, sz.length - 1)][0];
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="assets/img/${name}-${mid}.webp" width="${w}" height="${h}" alt="${esc(alt)}"${imgCls ? ` class="${imgCls}"` : ''} ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}></picture>`;
}

/** Produktová fotka (průhledná WebP). */
export function product(name, alt, cls = '') {
  const [w, h] = IMG[name].sizes[0];
  return `<img class="${cls}" src="assets/img/${name}.webp" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
}

export function preloadHero(name, sizes) {
  const sz = IMG[name].sizes;
  const set = sz.map(([sw]) => `assets/img/${name}-${sw}.avif ${sw}w`).join(', ');
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${sizes}" fetchpriority="high">`;
}

function head({ title, description, path, ogImage = 'assets/img/og-elektro-beranek.jpg', preload = '', jsonld = [], robots = 'index, follow', base = '' }) {
  const url = FIRM.domain + '/' + (path === 'index.html' ? '' : path);
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="cs" class="no-js">
<head>
<meta charset="utf-8">
${base ? `<base href="${base}">\n` : ''}<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#111417">
<meta name="color-scheme" content="dark light">
<meta property="og:type" content="website">
<meta property="og:locale" content="cs_CZ">
<meta property="og:site_name" content="Elektro Beránek | Solární elektrárny">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${FIRM.domain}/${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/archivo-var-cs.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="assets/css/styles.css">
<script src="assets/js/main.js" defer></script>
${ld}
</head>`;
}

function header(active, onLight = false) {
  const isActive = (item) => item.key === active || (item.children || []).some((c) => c.key === active);
  const desktop = NAV.map((item) => {
    if (item.children) {
      const sub = item.children.map((c, i) => `
            <li><a class="dd__link" href="${c.href}"${c.key === active ? ' aria-current="page"' : ''}>
              <span class="dd__idx">0${i + 1}</span>
              <span class="dd__txt"><span class="dd__label">${c.label}</span><span class="dd__desc">${c.desc}</span></span>
              ${icon('arrow', 'dd__arrow')}
            </a></li>`).join('');
      return `
        <li class="nav__item nav__item--dd${isActive(item) ? ' is-current' : ''}" data-dd>
          <button class="nav__link nav__btn" type="button" aria-expanded="false" aria-controls="dd-sluzby">${item.label}${icon('chevron', 'nav__chev')}</button>
          <div class="dd" id="dd-sluzby">
            <ul class="dd__list" role="list">${sub}
            </ul>
            <div class="dd__aside">
              <p class="mono">Nevíte, kde začít?</p>
              <p>Začínáme vždy prohlídkou na místě. Zavolejte a domluvíme termín.</p>
              <a class="dd__phone" href="${FIRM.phoneHref}">${icon('phone')}${FIRM.phone}</a>
            </div>
          </div>
        </li>`;
    }
    return `
        <li class="nav__item${isActive(item) ? ' is-current' : ''}"><a class="nav__link" href="${item.href}"${item.key === active ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
  }).join('');

  const mobile = NAV.map((item) => {
    if (item.children) {
      return `
          <li class="mnav__group">
            <p class="mnav__heading mono">Služby</p>
            <ul role="list">${item.children.map((c) => `
              <li><a class="mnav__link mnav__link--sub" href="${c.href}"${c.key === active ? ' aria-current="page"' : ''}>${c.label}<span>${c.desc}</span></a></li>`).join('')}
            </ul>
          </li>`;
    }
    return `
          <li><a class="mnav__link" href="${item.href}"${item.key === active ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
  }).join('');

  return `
<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
${SPRITE}
<header class="site-header${onLight ? ' site-header--on-light' : ''}" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="index.html" aria-label="Elektro Beránek – Solární elektrárny, úvodní stránka"${active === 'home' ? ' aria-current="page"' : ''}>
      <img class="brand__mark" src="assets/img/logo-znak.webp" width="345" height="190" alt="">
      <span class="brand__text"><span class="brand__name">Elektro Beránek</span><span class="brand__sub">Solární elektrárny</span></span>
    </a>
    <nav class="nav" aria-label="Hlavní navigace">
      <ul class="nav__list" role="list">${desktop}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="header-phone" href="${FIRM.phoneHref}">${icon('phone')}<span>${FIRM.phone}</span></a>
      <a class="btn btn--primary btn--sm header-cta" href="kontakt.html#poptavka">Nezávazně poptat</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mnav" data-menu-toggle>
        <span class="visually-hidden" data-menu-label>Otevřít menu</span>${icon('menu', 'menu-toggle__open')}${icon('close', 'menu-toggle__close')}
      </button>
    </div>
  </div>
</header>
  <div class="mnav" id="mnav" data-mnav hidden>
    <nav class="mnav__inner container" aria-label="Mobilní navigace">
      <ul class="mnav__list" role="list">
          <li><a class="mnav__link" href="index.html"${active === 'home' ? ' aria-current="page"' : ''}>Úvod</a></li>${mobile}
      </ul>
      <div class="mnav__foot">
        <a class="btn btn--primary btn--block" href="kontakt.html#poptavka">Nezávazně poptat${icon('arrow')}</a>
        <a class="mnav__contact" href="${FIRM.phoneHref}">${icon('phone')}${FIRM.phone}</a>
        <a class="mnav__contact" href="mailto:${FIRM.email}">${icon('mail')}${FIRM.email}</a>
      </div>
    </nav>
  </div>`;
}

export function ctaBand({ title = 'Začneme prohlídkou na místě.', text = 'Zavolejte nebo pošlete nezávaznou poptávku. Domluvíme termín, projdeme s vámi objekt a připravíme nabídku na míru.', img = 'zapad-strecha', alt = '' } = {}) {
  return `
<section class="cta-band" aria-labelledby="cta-title">
  ${picture(img, { alt, sizes: '100vw', cls: 'cta-band__bg' })}
  <div class="container cta-band__inner">
    <div class="cta-band__copy reveal">
      <p class="eyebrow">Další krok</p>
      <h2 id="cta-title" class="h1">${title}</h2>
      <p class="lead">${text}</p>
    </div>
    <div class="cta-band__actions reveal">
      <a class="btn btn--primary btn--lg" href="kontakt.html#poptavka">Nezávazně poptat${icon('arrow')}</a>
      <a class="cta-band__phone" href="${FIRM.phoneHref}"><span class="mono">Volejte</span>${FIRM.phone}</a>
      <a class="cta-band__mail" href="mailto:${FIRM.email}">${FIRM.email}</a>
    </div>
  </div>
</section>`;
}

function footer() {
  const p = FIRM.provozovna, s = FIRM.sidlo;
  return `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <a class="brand brand--footer" href="index.html">
          <img class="brand__mark" src="assets/img/logo-znak.webp" width="345" height="190" alt="" loading="lazy">
          <span class="brand__text"><span class="brand__name">Elektro Beránek</span><span class="brand__sub">Solární elektrárny</span></span>
        </a>
        <p>Instalace, revize a servis solárních elektráren. Přes 20 let zkušeností v oboru elektro.</p>
        <a class="nzu-badge" href="${FIRM.nzu}" target="_blank" rel="noopener">
          <img src="assets/img/nzu-dodavatel.webp" width="400" height="200" alt="Nová zelená úsporám – registrovaný dodavatel" loading="lazy">
          <span>Ověřit v seznamu NZÚ${icon('external')}</span>
        </a>
      </div>
      <nav class="site-footer__col" aria-label="Stránky webu">
        <h2 class="site-footer__h mono">Stránky</h2>
        <ul role="list">
          <li><a href="index.html">Úvod</a></li>
          <li><a href="sluzby.html">Služby</a></li>
          <li><a href="fotovoltaika.html">Fotovoltaika</a></li>
          <li><a href="instalace.html">Instalace a revize</a></li>
          <li><a href="dotace.html">Dotace NZÚ</a></li>
          <li><a href="cenik.html">Ceník</a></li>
          <li><a href="onas.html">O nás</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="kontakt.html">Kontakt</a></li>
        </ul>
      </nav>
      <div class="site-footer__col">
        <h2 class="site-footer__h mono">Kontakt</h2>
        <ul role="list" class="site-footer__contact">
          <li><a href="${FIRM.phoneHref}">${icon('phone')}${FIRM.phone}</a></li>
          <li><a href="mailto:${FIRM.email}">${icon('mail')}${FIRM.email}</a></li>
          <li>${icon('pin')}<span>Provozovna<br>${p.street}, ${p.zip} ${p.city}</span></li>
          <li>${icon('clock')}<span>Po – Pá 8:00 – 15:00<br>So – Ne 10:00 – 13:00</span></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__h mono">Firemní údaje</h2>
        <ul role="list" class="site-footer__meta">
          <li>${FIRM.owner}</li>
          <li>Sídlo: ${s.street}, ${s.zip} ${s.city}</li>
          <li>IČO: ${FIRM.ico}</li>
          <li>DIČ: ${FIRM.dic}</li>
        </ul>
        <div class="social">
          <a href="${FIRM.facebook}" target="_blank" rel="noopener" aria-label="Facebook Elektro Beránek">${icon('facebook')}</a>
          <a href="${FIRM.instagram}" target="_blank" rel="noopener" aria-label="Instagram solarni.elektrarna">${icon('instagram')}</a>
          <a class="social__web" href="${FIRM.parent}" target="_blank" rel="noopener">elektroberanek.cz${icon('arrow-ne')}</a>
        </div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© 2026 Elektro Beránek | Solární elektrárny</p>
      <p class="mono site-footer__geo" aria-hidden="true">49.7346° N · 13.2789° E</p>
      <a href="ochrana-osobnich-udaju.html">Ochrana osobních údajů</a>
    </div>
  </div>
</footer>`;
}

export function page({ active, body, headerOnLight = false, ...meta }) {
  return `${head(meta)}
<body class="page-${active}">
${header(active, headerOnLight)}
<main id="obsah" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>
`;
}

/** Drobečková navigace + BreadcrumbList pro JSON-LD. */
export function crumbs(items) {
  const html = `<nav class="crumbs" aria-label="Drobečková navigace"><ol role="list">${items.map((it, i) =>
    i === items.length - 1
      ? `<li><span aria-current="page">${it[0]}</span></li>`
      : `<li><a href="${it[1]}">${it[0]}</a></li>`).join('')}</ol></nav>`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it[0], item: FIRM.domain + '/' + (it[1] === 'index.html' ? '' : it[1]) })),
  };
  return { html, ld };
}

export const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  '@id': FIRM.domain + '/#firma',
  name: 'Elektro Beránek | Solární elektrárny',
  url: FIRM.domain + '/',
  logo: FIRM.domain + '/assets/img/logo-elektro-beranek.png',
  image: FIRM.domain + '/assets/img/og-elektro-beranek.jpg',
  telephone: '+420724118006',
  email: FIRM.email,
  founder: { '@type': 'Person', name: FIRM.owner },
  taxID: FIRM.dic,
  address: {
    '@type': 'PostalAddress', streetAddress: FIRM.provozovna.street, postalCode: '33027',
    addressLocality: FIRM.provozovna.city, addressRegion: FIRM.provozovna.region, addressCountry: 'CZ',
  },
  geo: { '@type': 'GeoCoordinates', latitude: FIRM.geo.lat, longitude: FIRM.geo.lng },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '15:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '13:00' },
  ],
  sameAs: [FIRM.facebook, FIRM.instagram, FIRM.parent],
};

/** Hero s art direction: na šířce < 1100 px širší výřez, na desktopu na výšku. */
export function heroPicture(desk, mob, alt) {
  const set = (name, ext) => IMG[name].sizes.map(([sw]) => `assets/img/${name}-${sw}.${ext} ${sw}w`).join(', ');
  const [w, h] = IMG[desk].sizes[IMG[desk].sizes.length - 1];
  const mid = IMG[desk].sizes[1][0];
  return `<picture><source media="(min-width: 1100px)" type="image/avif" srcset="${set(desk, 'avif')}" sizes="36vw"><source media="(min-width: 1100px)" type="image/webp" srcset="${set(desk, 'webp')}" sizes="36vw"><source type="image/avif" srcset="${set(mob, 'avif')}" sizes="100vw"><source type="image/webp" srcset="${set(mob, 'webp')}" sizes="100vw"><img src="assets/img/${desk}-${mid}.webp" width="${w}" height="${h}" alt="${esc(alt)}" fetchpriority="high" decoding="async"></picture>`;
}
export function preloadHeroAD(desk, mob) {
  const set = (name) => IMG[name].sizes.map(([sw]) => `assets/img/${name}-${sw}.avif ${sw}w`).join(', ');
  return `<link rel="preload" as="image" type="image/avif" media="(min-width: 1100px)" href="assets/img/${desk}-${IMG[desk].sizes[0][0]}.avif" imagesrcset="${set(desk)}" imagesizes="36vw" fetchpriority="high">\n<link rel="preload" as="image" type="image/avif" media="(max-width: 1099px)" href="assets/img/${mob}-${IMG[mob].sizes[0][0]}.avif" imagesrcset="${set(mob)}" imagesizes="100vw" fetchpriority="high">`;
}
