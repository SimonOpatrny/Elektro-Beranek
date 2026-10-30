import { page, picture, product, icon, ctaBand, heroPicture, preloadHeroAD, FIRM, LOCAL_BUSINESS } from '../lib/layout.mjs';
import { energyDiagram } from '../lib/energy.mjs';

const services = [
  { href: 'fotovoltaika.html', name: 'Fotovoltaické elektrárny na klíč', desc: 'Hybridní, síťové i ostrovní elektrárny podle vašeho objektu. Doprava, montáž, zapojení a zprovoznění.', img: 'montaz-strecha', alt: 'Montážník s jištěním upevňuje fotovoltaický panel na střeše', cap: 'Montáž panelů' },
  { href: 'instalace.html', name: 'Instalace, revize a připojení', desc: 'Revize a kontroly elektráren a první paralelní připojení k distribuční síti.', img: 'elektrikar-rozvadec', alt: 'Elektrikář pracuje v otevřeném rozvaděči', cap: 'Revize a připojení' },
  { href: 'dotace.html', name: 'Vyřízení dotace NZÚ', desc: 'Jako registrovaný dodavatel programu Nová zelená úsporám připravíme a podáme dokumentaci za vás.', img: 'dum-panely', alt: 'Rodinný dům s fotovoltaickými panely na šikmé střeše', cap: 'Dotace NZÚ' },
  { href: 'sluzby.html#servis', name: 'Servis a opravy elektráren', desc: 'Záruční i pozáruční servis. Opravy a revize i u elektráren, které jsme nemontovali.', img: 'prilba-panel', alt: 'Bílá ochranná přilba položená na solárním panelu', cap: 'Servis a opravy' },
  { href: 'sluzby.html#elektromontaze', name: 'Elektromontážní práce', desc: 'Komplexní elektromontáže včetně obvodů, které s fotovoltaikou nesouvisí.', img: 'jistice', alt: 'Řada jističů v domovním rozvaděči', cap: 'Elektromontáže' },
];

const svcList = services.map((s, i) => `
          <li class="svc__item" data-cap="${s.cap}">
            <a class="svc__link" href="${s.href}">
              <span class="svc__idx">0${i + 1}</span>
              <span class="svc__name">${s.name}</span>
              <span class="svc__arrow">${icon('arrow')}</span>
              <span class="svc__desc">${s.desc}</span>
              ${picture(s.img, { alt: '', sizes: '(max-width: 999px) 92vw, 1px', cls: 'svc__thumb' })}
            </a>
          </li>`).join('');

const svcPics = services.map((s) => picture(s.img, { alt: s.alt, sizes: '(min-width: 1000px) 40vw, 1px' })).join('');

const steps = [
  ['Prohlídka a nabídka', 'Navštívíme vás a celé místo projdete s technikem. Nabídku připravíme na míru objektu i vašim představám.'],
  ['Distributor a smlouva', 'Podáme žádost o připojení. Po kladném rozhodnutí předložíme smlouvu s rozsahem prací, termínem, cenou a zárukami.'],
  ['Instalace', 'Začneme do 30 dnů. Panely, baterie a střídač, napojení na rozvody domu a úprava elektroměrového rozvaděče.'],
  ['Revize a spuštění', 'Předáme odzkoušenou elektrárnu, připravíme dokumentaci k prvnímu paralelnímu připojení a po montáži 4Q elektroměru ji spustíme.'],
  ['Dotace', 'Vyřídíme veškerou dokumentaci k dotaci. Na vás zůstanou jen podpisy.'],
];

const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">Fotovoltaika · Elektroinstalace · Vejprnice u Plzně</p>
      <h1 id="hero-title" class="display hero__title"><span class="line">Solární elektrárna na&nbsp;klíč.</span> <span class="line"><span class="hl">Opravdu</span> na&nbsp;klíč.</span></h1>
      <p class="lead hero__lead">Navrhneme, nainstalujeme a připojíme fotovoltaiku pro váš dům. Včetně úprav elektroinstalace, revize, žádosti u distributora a vyřízení dotace NZÚ.</p>
      <div class="btn-row">
        <a class="btn btn--primary btn--lg" href="kontakt.html#poptavka">Nezávazně poptat${icon('arrow')}</a>
        <a class="btn btn--ghost btn--lg" href="#jak-to-probiha">Jak to probíhá</a>
      </div>
      <p class="hero__phone">Raději telefonicky? <a href="${FIRM.phoneHref}">${FIRM.phone}</a></p>
    </div>
    <div class="hero__visual">
      <div class="hero__photo">
        ${heroPicture('hero-strecha', 'hero-strecha-l', 'Detail černých fotovoltaických panelů na střeše rodinného domu')}
      </div>
      ${energyDiagram({ id: 'en-hero', compact: true })}
    </div>
  </div>
  <div class="spec-strip">
    <div class="container">
      <ul class="spec-strip__list" role="list">
        <li class="spec-strip__item"><span class="spec-strip__val num">20<small>+ let</small></span><span class="spec-strip__lbl">zkušeností v oboru elektro</span></li>
        <li class="spec-strip__item"><span class="spec-strip__val num">7<small>+ let</small></span><span class="spec-strip__lbl">montáží a revizí fotovoltaických elektráren</span></li>
        <li class="spec-strip__item"><span class="spec-strip__val num">30<small>dní</small></span><span class="spec-strip__lbl">nejdéle od podpisu smlouvy do zahájení instalace</span></li>
        <li class="spec-strip__item"><a href="${FIRM.nzu}" target="_blank" rel="noopener"><span class="spec-strip__val">NZÚ</span><span class="spec-strip__lbl">registrovaný dodavatel programu Nová zelená úsporám ${icon('arrow-ne')}</span></a></li>
      </ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="svc-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Co pro vás uděláme</p>
        <h2 id="svc-title">Od střechy po rozvaděč. Jedna firma, celé dílo.</h2>
      </div>
      <p class="lead">Instalujeme solární elektrárny a staráme se o ně i po spuštění. A protože jsme elektrikáři, zvládneme i elektroinstalaci, která s fotovoltaikou souvisí.</p>
    </div>
    <div class="svc" data-svc>
      <ol class="svc__list" role="list">${svcList}
      </ol>
      <div class="svc__preview" aria-hidden="true">
        <div class="svc__frame">${svcPics}</div>
        <p class="svc__cap mono"><span data-svc-cap>Montáž panelů</span><span>Ilustrační foto</span></p>
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="klic-title">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Na klíč znamená celé</p>
      <h2 id="klic-title" class="statement">Nedodáme jen elektrárnu. <em>Předáme hotové dílo</em> připojené k síti.</h2>
      <div class="prose mt-7">
        <p>V poslední době nás kontaktují majitelé elektráren od jiných firem, kteří potřebují upravit elektroměrový pilíř nebo domovní rozvody. Dodavatel jim instaloval jen samotnou elektrárnu a nezbytné obvody, zbytek nechal na investorovi.</p>
        <p>U nás je instalace na klíč <strong>od podpisu smlouvy až po předání fungující sestavy připojené k distribuční síti</strong>. Proto doporučujeme ověřit si, zda má firma zkušenosti nejen s fotovoltaikou, ale s elektroinstalací celkově.</p>
      </div>
      <a class="link-arrow mt-7" href="sluzby.html#postup">Podrobný postup montáže${icon('arrow')}</a>
    </div>
    <div class="media-frame reveal">
      ${picture('rozvadec-ruce', { alt: 'Ruce elektrikáře v ochranných rukavicích měří v rozvaděči', sizes: '(min-width: 960px) 45vw, 100vw' })}
      <div class="plate plate--accent">
        <div class="plate__head"><span class="mono">Co za vás zařídíme</span><span class="screw" aria-hidden="true"></span></div>
        <ul class="checks checks--plate" role="list">
          <li>${icon('check')}<span>Žádost o připojení u distributora</span></li>
          <li>${icon('check')}<span>Úpravu elektroměrového rozvaděče</span></li>
          <li>${icon('check')}<span>Napojení na rozvody domu</span></li>
          <li>${icon('check')}<span>Revizi a dokumentaci k připojení</span></li>
          <li>${icon('check')}<span>Kompletní podklady k dotaci</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section theme-ink has-grid" id="jak-to-probiha" aria-labelledby="proces-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Jak to probíhá</p>
        <h2 id="proces-title">Od první prohlídky ke spuštěné elektrárně</h2>
      </div>
      <p class="lead">Zálohy na komponenty většinou nepožadujeme. Celé dílo se platí po předání a vy dostanete elektrárnu, na které už nic dalšího upravovat nemusíte.</p>
    </div>
    <ol class="process process--h" role="list">
      ${steps.map((s, i) => `
      <li class="process__step">
        <span class="process__dot">0${i + 1}</span>
        <div class="process__body"><h3 class="h4">${s[0]}</h3><p>${s[1]}</p></div>
      </li>`).join('')}
    </ol>
    <div class="process-note">
      ${icon('clock')}
      <p><strong>V průměru je instalace hotová do 1–2 měsíců od podpisu smlouvy.</strong> Většinou nás brzdí jen papírování s distributorem sítě, jehož rychlost bohužel ovlivnit nedokážeme.</p>
    </div>
    <div class="btn-row mt-8">
      <a class="btn btn--ghost" href="instalace.html">Celý postup instalace${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section theme-light theme-white" aria-labelledby="cenik-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Ceník</p>
        <h2 id="cenik-title">Standardní sestavy s cenou po odečtení dotace</h2>
      </div>
      <p class="lead">Orientační ceny nejčastějších sestav. Přesnou nabídku připravíme po prohlídce vašeho objektu.</p>
    </div>
    <table class="price-teaser reveal">
      <caption class="visually-hidden">Přehled standardních sestav fotovoltaických elektráren</caption>
      <thead><tr><th scope="col">Sestava</th><th scope="col">Výkon a panely</th><th scope="col">Baterie</th><th scope="col">Střídač / nabíjení</th><th scope="col" class="ta-r">Po dotaci</th></tr></thead>
      <tbody>
        <tr><th scope="row">FVE 5</th><td>5,4 kWp · 12 × 450 Wp</td><td>Dyness Tower 10,65 kWh</td><td>GoodWe 10K-ET</td><td class="price num"><small>od</small>101 000 Kč</td></tr>
        <tr><th scope="row">FVE 10-1</th><td>10 kWp · 22 × 450 Wp</td><td>Dyness Tower 10,65 kWh</td><td>GoodWe 10K-ET</td><td class="price num"><small>od</small>121 000 Kč</td></tr>
        <tr><th scope="row">FVE Full</th><td>10 kWp · 22 × 450 Wp</td><td>Dyness Tower 10,65 kWh</td><td>GoodWe 10K-ET + nabíjecí stanice GoodWe 11 kW</td><td class="price num"><small>od</small>175 000 Kč</td></tr>
        <tr><th scope="row">FVE Solax</th><td>10 kWp · 22 × 450 Wp</td><td>Solax Triple Power 11,6 kWh</td><td>Solax X3 G4 10.0-D + nabíjecí stanice Solax X3-EVC11K</td><td class="price num"><small>od</small>210 000 Kč</td></tr>
      </tbody>
    </table>
    <div class="btn-row btn-row--between mt-8">
      <a class="btn btn--dark" href="cenik.html">Podrobný ceník${icon('arrow')}</a>
      <p class="muted small">Dotace na vybrané sestavy až 140 000 Kč, včetně chytrého řízení Infigy.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="komp-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Komponenty</p>
        <h2 id="komp-title">Stavíme ze špičkových komponentů</h2>
      </div>
      <p class="lead">Převážně značek GoodWe, Solax, Dyness a Pylontech. Na elektrárny, které nainstalujeme, držíme záruční i pozáruční servis.</p>
    </div>
    <div class="components reveal-stagger">
      <figure class="comp">
        <div class="comp__img">${product('goodwe-et', 'Hybridní střídač GoodWe řady ET')}</div>
        <figcaption class="comp__meta"><span class="mono">Hybridní střídač</span><h3 class="h4">GoodWe 10K-ET</h3><p>Asymetrický hybridní střídač. Převádí stejnosměrný proud z panelů na střídavý a řídí nabíjení baterie.</p></figcaption>
      </figure>
      <figure class="comp">
        <div class="comp__img">${product('dyness-tower', 'Bateriové úložiště Dyness Tower v několika kapacitách', 'is-wide')}</div>
        <figcaption class="comp__meta"><span class="mono">Bateriové úložiště</span><h3 class="h4">Dyness Tower</h3><p>Ukládá přebytky z poledne na večer a na dny, kdy slunce nesvítí.</p></figcaption>
      </figure>
      <figure class="comp">
        <div class="comp__img">${product('solax-x3', 'Hybridní střídač Solax X3')}</div>
        <figcaption class="comp__meta"><span class="mono">Hybridní střídač</span><h3 class="h4">Solax X3 G4</h3><p>Součást sestavy FVE Solax s baterií Triple Power a nabíjecí stanicí.</p></figcaption>
      </figure>
    </div>
    <p class="legal-note">Produktové fotografie: výrobci komponent. Názvy značek jsou ochranné známky svých vlastníků.</p>
  </div>
</section>

<section class="section theme-light" aria-labelledby="dotace-title">
  <div class="container split split--wide-text">
    <div class="reveal">
      <p class="eyebrow">Dotace NZÚ</p>
      <h2 id="dotace-title">Dotaci vyřídíme za vás</h2>
      <p class="lead mt-6">Veškerou dokumentaci k žádosti o dotaci zpracujeme a podáme. Vy nám poskytnete potřebné informace a podepíšete několik dokumentů.</p>
      <div class="btn-row mt-8">
        <a class="btn btn--dark" href="dotace.html">Jak vyřízení dotace probíhá${icon('arrow')}</a>
      </div>
    </div>
    <a class="nzu-card nzu-card--link reveal" href="${FIRM.nzu}" target="_blank" rel="noopener">
      <img src="assets/img/nzu-dodavatel.webp" width="400" height="200" alt="Nová zelená úsporám – registrovaný dodavatel" loading="lazy">
      <span class="mono">Registrovaný dodavatel NZÚ</span>
      <ul role="list">
        <li>${icon('check')}Solární systémy, fotovoltaika</li>
        <li>${icon('check')}Projektová dokumentace</li>
        <li>${icon('check')}Fotovoltaické elektrárny na klíč</li>
      </ul>
      <span class="link-arrow">Ověřit v seznamu dodavatelů${icon('arrow-ne')}</span>
    </a>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container split split--wide-text split--top">
    <div>
      <p class="eyebrow">Časté otázky</p>
      <h2 id="faq-title">Na co se nás ptáte nejčastěji</h2>
      <p class="lead mt-6">Odpovědi na další otázky o životnosti, montáži a dotacích najdete v sekci FAQ.</p>
      <a class="link-arrow mt-7" href="faq.html">Všechny otázky a odpovědi${icon('arrow')}</a>
    </div>
    <div class="faq">
      <details class="faq__item">
        <summary class="faq__q"><span>Co je to hybridní elektrárna?</span><span class="faq__icon">${icon('plus')}</span></summary>
        <div class="faq__a"><p>Systém se solárními panely, střídačem, který mění stejnosměrnou energii z panelů na střídavou pro domácí spotřebiče, a baterií. Do baterie se během dne ukládají přebytky pro pozdější spotřebu nebo pro dobu nepříznivého počasí.</p></div>
      </details>
      <details class="faq__item">
        <summary class="faq__q"><span>Jak rychle zvládnete instalaci?</span><span class="faq__icon">${icon('plus')}</span></summary>
        <div class="faq__a"><p>Instalaci zahájíme nejpozději do 30 dnů od podpisu smlouvy, ve většině případů mnohem dříve. V průměru je instalace hotová do 1–2 měsíců od podpisu smlouvy. Rychlost vyřízení u distributora sítě ovlivnit nedokážeme.</p></div>
      </details>
      <details class="faq__item">
        <summary class="faq__q"><span>Jakou životnost mají solární panely?</span><span class="faq__icon">${icon('plus')}</span></summary>
        <div class="faq__a"><p>Výrobci solárních panelů garantují 80procentní výkon po 25 letech provozu.</p></div>
      </details>
    </div>
  </div>
</section>
${ctaBand()}
`;

export default {
  file: 'index.html',
  html: page({
    active: 'home',
    path: 'index.html',
    title: 'Solární elektrárny na klíč, Plzeňsko | Elektro Beránek',
    description: 'Instalace, revize a servis solárních elektráren na klíč. Vyřízení dotace NZÚ, žádosti u distributora i úprav elektroinstalace. Elektro Beránek, Vejprnice u Plzně.',
    preload: preloadHeroAD('hero-strecha', 'hero-strecha-l'),
    jsonld: [LOCAL_BUSINESS, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Elektro Beránek | Solární elektrárny', url: FIRM.domain + '/', inLanguage: 'cs' }],
    body,
  }),
};
