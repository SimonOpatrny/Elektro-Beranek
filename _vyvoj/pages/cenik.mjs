import { page, picture, product, icon, ctaBand, crumbs, LOCAL_BUSINESS, FIRM } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Ceník', 'cenik.html']]);

// Sestavy a ceny převzaté z původní stránky cenik.php (ceny po odečtení dotace)
const PKGS = [
  { key: 'fve-5', code: 'FVE 5', power: 'Elektrárna 5,4 kWp', panels: '12 ks panelů 450 Wp', batt: 'Dyness Tower 10,65 kWh', inv: 'Hybridní asymetrický střídač GoodWe 10K-ET', ev: null, price: '101 000', imgs: [['goodwe-et', 'Střídač GoodWe ET'], ['dyness-tower', 'Baterie Dyness Tower', 'is-batt']] },
  { key: 'fve-10-1', code: 'FVE 10-1', power: 'Elektrárna 10 kWp', panels: '22 ks panelů 450 Wp', batt: 'Dyness Tower 10,65 kWh', inv: 'Hybridní asymetrický střídač GoodWe 10K-ET', ev: null, price: '121 000', imgs: [['goodwe-et', 'Střídač GoodWe ET'], ['dyness-tower', 'Baterie Dyness Tower', 'is-batt']] },
  { key: 'fve-full', code: 'FVE Full', power: 'Elektrárna 10 kWp', panels: '22 ks panelů 450 Wp', batt: 'Dyness Tower 10,65 kWh', inv: 'Hybridní asymetrický střídač GoodWe 10K-ET', ev: 'GoodWe 11 kW', price: '175 000', imgs: [['goodwe-et', 'Střídač GoodWe ET'], ['dyness-tower', 'Baterie Dyness Tower', 'is-batt']] },
  { key: 'fve-solax', code: 'FVE Solax', power: 'Elektrárna 10 kWp', panels: '22 ks panelů 450 Wp', batt: 'Solax Triple Power 11,6 kWh', inv: 'Hybridní asymetrický střídač Solax X3 G4 10.0-D', ev: 'Solax X3-EVC11K', price: '210 000', imgs: [['solax-x3', 'Střídač Solax X3']] },
];

const card = (p) => `
      <article class="pkg${p.featured ? ' pkg--featured' : ''}" id="${p.key}" aria-labelledby="${p.key}-t">
        ${p.featured ? `<span class="pkg__flag mono">${p.featured}</span>` : ''}
        <header class="pkg__head">
          <span class="pkg__code mono">Sestava</span>
          <h3 class="pkg__name" id="${p.key}-t">${p.code}</h3>
          <p class="pkg__power">${p.power}</p>
        </header>
        <div class="pkg__visual" aria-hidden="true">${p.imgs.map(([n, a, cls]) => product(n, '', cls || '')).join('')}</div>
        <dl class="pkg__specs">
          <div><dt>Panely</dt><dd>${p.panels}</dd></div>
          <div><dt>Baterie</dt><dd>${p.batt}</dd></div>
          <div><dt>Střídač</dt><dd>${p.inv}</dd></div>
          <div><dt>Nabíjecí stanice</dt><dd>${p.ev || '—'}</dd></div>
        </dl>
        <footer class="pkg__foot">
          <p class="pkg__price"><span class="mono">Cena po odečtení dotace</span><strong class="num"><span>od</span>${p.price} Kč</strong></p>
          <a class="btn ${p.featured ? 'btn--primary' : 'btn--ghost'} btn--block" href="kontakt.html?sestava=${p.key}#poptavka">Chci nabídku ${p.code}${icon('arrow')}</a>
        </footer>
      </article>`;

const offers = PKGS.map((p) => ({
  '@type': 'Offer', name: 'Fotovoltaická elektrárna ' + p.code, priceCurrency: 'CZK',
  priceSpecification: { '@type': 'PriceSpecification', minPrice: Number(p.price.replace(/\s/g, '')), priceCurrency: 'CZK' },
  description: [p.power, p.panels, 'baterie ' + p.batt, p.inv, p.ev ? 'nabíjecí stanice ' + p.ev : ''].filter(Boolean).join(', ') + '. Cena po odečtení dotace.',
  seller: { '@id': FIRM.domain + '/#firma' },
}));

const body = `
<section class="phero" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__copy">
      <p class="eyebrow">Ceník</p>
      <h1 id="page-title" class="phero__title">Cenová nabídka fotovoltaických elektráren na klíč</h1>
      <p class="lead phero__lead">Prohlédněte si ceník standardních instalací. Uvedené ceny jsou po odečtení dotace. Nabídku přesně na míru vašemu objektu připravíme po prohlídce na místě.</p>
    </div>
    <div class="phero__strip">${picture('panely-nebe', { alt: 'Řady fotovoltaických panelů pod modrou oblohou', sizes: '100vw', eager: true })}</div>
  </div>
</section>

<section class="section section--tight-top" aria-labelledby="sestavy-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Standardní sestavy</p>
        <h2 id="sestavy-title">Čtyři sestavy, jedna kvalita montáže</h2>
      </div>
      <p class="lead">Všechny sestavy jsou hybridní elektrárny s baterií a hybridním asymetrickým střídačem. Sestavy FVE Full a FVE Solax obsahují i nabíjecí stanici pro elektromobil.</p>
    </div>
    <div class="packages reveal-stagger">${PKGS.map(card).join('')}
    </div>
    <div class="notice mt-8">
      ${icon('coins')}
      <p><strong>Dotace na vybrané sestavy jsou až 140 000 Kč, včetně chytrého řízení Infigy.</strong> Výše a podmínky dotace se řídí aktuálními pravidly programu Nová zelená úsporám. <a class="link" href="dotace.html">Jak dotaci vyřizujeme</a></p>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="srovnani-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Srovnání</p>
      <h2 id="srovnani-title">Sestavy vedle sebe</h2>
    </div>
    <div class="compare-wrap reveal">
      <table class="compare">
        <caption class="visually-hidden">Srovnání standardních sestav fotovoltaických elektráren</caption>
        <thead><tr><td></td>${PKGS.map((p) => `<th scope="col">${p.code}</th>`).join('')}</tr></thead>
        <tbody>
          <tr><th scope="row">Velikost</th>${PKGS.map((p) => `<td>${p.power.replace('Elektrárna ', '')}</td>`).join('')}</tr>
          <tr><th scope="row">Počet panelů</th>${PKGS.map((p) => `<td>${p.panels}</td>`).join('')}</tr>
          <tr><th scope="row">Baterie</th>${PKGS.map((p) => `<td>${p.batt}</td>`).join('')}</tr>
          <tr><th scope="row">Střídač</th>${PKGS.map((p) => `<td>${p.inv.replace('Hybridní asymetrický střídač ', '')}</td>`).join('')}</tr>
          <tr><th scope="row">Nabíjecí stanice</th>${PKGS.map((p) => `<td${p.ev ? '' : ' class="no"'}>${p.ev || '—'}</td>`).join('')}</tr>
          <tr><th scope="row">Cena po dotaci</th>${PKGS.map((p) => `<td><strong class="num">od ${p.price} Kč</strong></td>`).join('')}</tr>
        </tbody>
      </table>
    </div>
    <p class="compare-hint">Tabulku lze posouvat do stran.</p>
  </div>
</section>

<section class="section" aria-labelledby="vcene-title">
  <div class="container split split--top">
    <div>
      <p class="eyebrow">Na klíč</p>
      <h2 id="vcene-title">Co znamená elektrárna na klíč</h2>
      <p class="lead mt-6">Instalace na klíč je u nás opravdu na klíč, od podpisu smlouvy až po předání fungující sestavy připojené k distribuční síti.</p>
      <a class="link-arrow mt-7" href="sluzby.html#postup">Postup montáže${icon('arrow')}</a>
    </div>
    <ul class="checks checks--2col reveal-stagger" role="list">
      <li>${icon('check')}<span>Prohlídka místa s technikem a nabídka na míru</span></li>
      <li>${icon('check')}<span>Žádost o připojení u distributora sítě</span></li>
      <li>${icon('check')}<span>Doprava a montáž fotovoltaických panelů</span></li>
      <li>${icon('check')}<span>Instalace baterie a střídače</span></li>
      <li>${icon('check')}<span>Napojení na rozvody domu a úprava elektroměrového rozvaděče</span></li>
      <li>${icon('check')}<span>Dokumentace k prvnímu paralelnímu připojení</span></li>
      <li>${icon('check')}<span>První spuštění po montáži 4Q elektroměru</span></li>
      <li>${icon('check')}<span>Veškerá dokumentace k dotaci</span></li>
    </ul>
  </div>
</section>
${ctaBand({ title: 'Nevíte, která sestava je pro vás?', text: 'Řekněte nám, kolik elektřiny spotřebujete a jakou máte střechu. Po prohlídce doporučíme sestavu a připravíme nabídku na míru.' })}
`;

export default {
  file: 'cenik.html',
  html: page({
    active: 'cenik', path: 'cenik.html',
    title: 'Ceník fotovoltaických elektráren na klíč | Elektro Beránek',
    description: 'Ceník standardních hybridních sestav FVE 5, FVE 10-1, FVE Full a FVE Solax s baterií. Ceny od 101 000 Kč po odečtení dotace. Nabídka na míru po prohlídce.',
    jsonld: [LOCAL_BUSINESS, c.ld, { '@context': 'https://schema.org', '@type': 'OfferCatalog', name: 'Standardní sestavy fotovoltaických elektráren', itemListElement: offers }],
    body,
  }),
};
