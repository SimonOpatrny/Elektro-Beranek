import { page, picture, icon, ctaBand, crumbs, FIRM, LOCAL_BUSINESS } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Služby', 'sluzby.html']]);

const svc = [
  { id: 'fotovoltaika', ico: 'panel', t: 'Fotovoltaické elektrárny na klíč', p: 'Instalace hybridních, síťových (on-grid) i ostrovních (off-grid) elektráren. Kompletní realizace střešních fotovoltaických elektráren včetně dopravy, montáže a elektromontáže střídačů, rozvaděčů a souvisejících obvodů.', href: 'fotovoltaika.html', l: 'Typy elektráren' },
  { id: 'revize', ico: 'shield', t: 'Revize a kontroly', p: 'Revize a kontroly solárních elektráren. Provádíme je i na elektrárnách, které jsme sami nemontovali.', href: 'instalace.html#revize', l: 'Revize a připojení' },
  { id: 'servis', ico: 'wrench', t: 'Servis a opravy', p: 'Záruční i pozáruční opravy a servis na elektrárny, které jsme nainstalovali. Pozáruční servis a opravy zajistíme i u elektráren od jiných firem.', href: 'kontakt.html?sluzba=servis#poptavka', l: 'Objednat servis' },
  { id: 'pripojeni', ico: 'grid', t: 'Připojení k distribuční síti', p: 'Podáme žádost o připojení u distributora sítě, připravíme dokumentaci k prvnímu paralelnímu připojení (PPP) a po montáži 4Q elektroměru elektrárnu spustíme.', href: 'instalace.html', l: 'Jak to funguje' },
  { id: 'dotace', ico: 'coins', t: 'Vyřízení dotace NZÚ', p: 'Jako registrovaný dodavatel programu Nová zelená úsporám zpracujeme a podáme veškerou dokumentaci k dotaci. Vaší prací budou jen podpisy.', href: 'dotace.html', l: 'Více o dotaci' },
  { id: 'elektromontaze', ico: 'bolt', t: 'Elektromontážní práce', p: 'Instalace a montáže obvodů, které s fotovoltaickou elektrárnou nesouvisejí, a komplexní služby elektromontážních prací.', href: 'kontakt.html?sluzba=elektro#poptavka', l: 'Poptat elektromontáž' },
];

const body = `
<section class="phero" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="eyebrow">Služby</p>
        <h1 id="page-title" class="phero__title">Od první prohlídky po spuštěnou elektrárnu</h1>
        <p class="lead phero__lead">Zabýváme se instalacemi solárních elektráren, jejich revizemi a kontrolami. A protože jsme elektrikáři, postaráme se i o elektroinstalaci kolem.</p>
        <nav class="jump" aria-label="Rychlé odkazy na služby">
          ${svc.map((s) => `<a href="#${s.id}">${s.t}</a>`).join('')}
        </nav>
      </div>
      <div class="phero__media phero__media--tall">
        ${picture('vrtani-panel', { alt: 'Montážník v rukavicích šroubuje uchycení fotovoltaického panelu', sizes: '(min-width: 960px) 40vw, 100vw', eager: true })}
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="katalog-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Co děláme</p>
      <h2 id="katalog-title">Šest služeb, jeden dodavatel</h2>
    </div>
    <div class="tiles tiles--3 reveal-stagger">
      ${svc.map((s, i) => `
      <article class="tile" id="${s.id}">
        <span class="tile__no">0${i + 1}</span>
        <span class="tile__ico">${icon(s.ico)}</span>
        <h3>${s.t}</h3>
        <p>${s.p}</p>
        <a class="link-arrow" href="${s.href}">${s.l}${icon('arrow')}</a>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="postup" aria-labelledby="postup-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Postup montáže</p>
        <h2 id="postup-title">Postup činností při montáži fotovoltaické elektrárny</h2>
      </div>
      <p class="lead">Podle poptávky vás nejdříve navštívíme a celé místo projdete s technikem, se kterým se domluvíte na možnostech instalace. Nabídku vytvoříme přesně na míru vašemu objektu a podle vašich představ a připomínek.</p>
    </div>
    <ol class="steps" role="list">
      <li class="steps__phase mono">Fáze 1 — Příprava</li>
      <li class="steps__item">
        <span class="steps__no">01</span>
        <h3>Žádost o připojení a smlouva</h3>
        <p>Pokud nabídku odsouhlasíte, podáme žádost o připojení u distributora sítě. Po kladném rozhodnutí vám předložíme smlouvu, ve které bude stanoven přesný rozsah prací, předpokládaný termín dokončení instalace, cena a rozsah záruk.</p>
      </li>
      <li class="steps__phase mono">Fáze 2 — Instalace</li>
      <li class="steps__item">
        <span class="steps__no">02</span>
        <h3>Montáž panelů, baterie a střídače</h3>
        <p>Jakmile je žádost u distributora vyřízena, podle dohody co nejdříve, nejpozději do 30 dnů, začneme s instalací solárních panelů. Zakládáme si na rychlosti a kvalitě instalačních prací. Následuje instalace baterie a střídače.</p>
      </li>
      <li class="steps__item">
        <span class="steps__no">03</span>
        <h3>Napojení na rozvody domu</h3>
        <p>Celou elektrárnu napojíme na rozvody domu a upravíme elektroměrový rozvaděč. Zákazníkovi předáme funkční a odzkoušenou elektrárnu.</p>
      </li>
      <li class="steps__item">
        <span class="steps__no">04</span>
        <h3>První paralelní připojení a spuštění</h3>
        <p>Připravíme dokumentaci pro první paralelní připojení u distributora sítě. Po namontování nového 4Q elektroměru provedeme první spuštění elektrárny.</p>
      </li>
      <li class="steps__phase mono">Fáze 3 — Dotace</li>
      <li class="steps__item">
        <span class="steps__no">05</span>
        <h3>Dokumentace k dotaci</h3>
        <p>Po instalaci a zprovoznění elektrárny vyřídíme veškerou dokumentaci pro získání dotace. Vaší prací budou pouze podpisy dokumentů souvisejících s dotací a připojením elektrárny, které vám předložíme.</p>
      </li>
    </ol>
    <div class="pay-note mt-9">
      <div class="plate">
        <div class="plate__head"><span class="mono">Platba a předání</span><span class="screw" aria-hidden="true"></span></div>
        <dl class="plate__rows">
          <div class="plate__row"><dt>Zálohy na komponenty</dt><dd>většinou nepožadujeme</dd></div>
          <div class="plate__row"><dt>Platba</dt><dd>za celé dílo po předání</dd></div>
          <div class="plate__row"><dt>Výsledek</dt><dd>elektrárna na klíč</dd></div>
        </dl>
      </div>
      <p class="lead">Zákazník od nás dostane elektrárnu na klíč. Žádné další úpravy instalace nejsou potřeba.</p>
    </div>
  </div>
</section>

<section class="section theme-light theme-white" aria-labelledby="typy-title">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Fotovoltaika</p>
      <h2 id="typy-title">Hybridní, síťové i ostrovní elektrárny</h2>
      <p class="lead mt-6">Hybridní elektrárna je v Česku nejčastěji instalovaný typ fotovoltaiky. Vysvětlíme, jak jednotlivé typy fungují a který se hodí právě vám.</p>
      <div class="btn-row mt-8">
        <a class="btn btn--dark" href="fotovoltaika.html">Porovnat typy elektráren${icon('arrow')}</a>
        <a class="btn btn--ghost" href="cenik.html">Ceník sestav</a>
      </div>
    </div>
    <div class="media-frame media-frame--wide reveal">
      ${picture('dum-cerne-panely', { alt: 'Moderní cihlový dům s celočernými fotovoltaickými panely na střeše', sizes: '(min-width: 960px) 45vw, 100vw' })}
    </div>
  </div>
</section>
${ctaBand()}
`;

export default {
  file: 'sluzby.html',
  html: page({
    active: 'sluzby', path: 'sluzby.html',
    title: 'Služby – instalace, revize a servis FVE | Elektro Beránek',
    description: 'Instalace fotovoltaických elektráren na klíč, revize a kontroly, záruční i pozáruční servis, připojení k distribuční síti, vyřízení dotace NZÚ a elektromontážní práce.',
    jsonld: [LOCAL_BUSINESS, c.ld],
    body,
  }),
};
