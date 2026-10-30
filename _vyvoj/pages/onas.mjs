import { page, picture, icon, ctaBand, crumbs, FIRM, LOCAL_BUSINESS } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['O nás', 'onas.html']]);

const body = `
<section class="phero" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="eyebrow">O nás</p>
        <h1 id="page-title" class="phero__title">Elektrikáři, kteří staví fotovoltaiku</h1>
        <p class="lead phero__lead">Jsme firma působící v oboru elektro přes 20 let. Solární elektrárnu vám nejen nainstalujeme, ale dál na ni držíme záruční i pozáruční servis.</p>
        <div class="phero__meta">
          <div><span class="mono">Sídlíme</span><strong>Západočeský kraj</strong></div>
          <div><span class="mono">Provozovna</span><strong>Vejprnice u Plzně</strong></div>
          <div><span class="mono">Tým</span><strong>Ryze český, vlastní lidé</strong></div>
        </div>
      </div>
      <div class="about-figure">
        <p class="bignum num"><span aria-hidden="true">20<sup>+</sup></span><span class="visually-hidden">Přes 20 let</span></p>
        <p class="mono about-figure__cap">let v oboru elektro<br><span>z toho 7+ let fotovoltaika</span></p>
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="tym-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Náš tým</p>
        <h2 id="tym-title">Vlastní lidé na každou část zakázky</h2>
      </div>
      <p class="lead">Náš ryze český tým se skládá z vlastních profesionálních montérů a elektromontérů, projektových manažerů a revizního technika.</p>
    </div>
    <ul class="roles reveal-stagger" role="list">
      <li class="role">${icon('panel')}<span class="mono">01</span><h3>Montéři</h3><p>Montáž konstrukcí a fotovoltaických panelů na střechu.</p></li>
      <li class="role">${icon('bolt')}<span class="mono">02</span><h3>Elektromontéři</h3><p>Střídače, rozvaděče a obvody související s elektrárnou i mimo ni.</p></li>
      <li class="role">${icon('doc')}<span class="mono">03</span><h3>Projektoví manažeři</h3><p>Nabídka na míru, smlouvy, komunikace s distributorem a dotace.</p></li>
      <li class="role">${icon('shield')}<span class="mono">04</span><h3>Revizní technik</h3><p>Revize a kontroly elektráren před připojením i během provozu.</p></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="pristup-title">
  <div class="container split">
    <div class="media-frame media-frame--tall reveal">
      ${picture('montaz-panel', { alt: 'Montážník usazuje černý fotovoltaický panel na střechu', sizes: '(min-width: 960px) 45vw, 100vw' })}
      <p class="media-note mono">Ilustrační foto</p>
    </div>
    <div class="reveal">
      <p class="eyebrow">Jak pracujeme</p>
      <h2 id="pristup-title">Stavíme podle vás, ne podle šablony</h2>
      <div class="prose mt-6">
        <p>Solární elektrárny stavíme podle přání a požadavků našich zákazníků. Nejdřív vás navštívíme, celé místo projdete s technikem a teprve potom připravíme nabídku přesně na míru vašemu objektu.</p>
        <p>Instalujeme ze špičkových komponentů, převážně značek GoodWe, Solax, Dyness a Pylontech. Na elektrárny, které jsme postavili, držíme <strong>záruční i pozáruční opravy a servis</strong>. Pozáruční servis, opravy a revize děláme i na elektrárnách, které jsme nemontovali.</p>
        <p>A protože elektro je náš obor přes 20 let, nabízíme i instalace a montáže obvodů, které s fotovoltaikou nesouvisí, a komplexní elektromontážní práce.</p>
      </div>
      <a class="link-arrow mt-7" href="sluzby.html">Přehled služeb${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section theme-ink" aria-labelledby="ziskate-title">
  <div class="container split split--top">
    <div>
      <p class="eyebrow">Co získáte</p>
      <h2 id="ziskate-title">Elektrárna, která se vám vyplatí</h2>
      <p class="lead mt-6">Co si vyrobíte, to vám zůstane. Přebytky můžete uložit do baterie nebo do ohřevu teplé vody.</p>
    </div>
    <ul class="benefits reveal-stagger" role="list">
      <li><span>Snížení nákladů na elektrickou energii</span>${icon('trend')}</li>
      <li><span>Získání dotace NZÚ</span>${icon('coins')}</li>
      <li><span>Co si vyrobíte, to vám zůstane</span>${icon('home-bolt')}</li>
      <li><span>Šetříte životní prostředí</span>${icon('leaf')}</li>
      <li><span>Návratnost investice již do 7 let</span>${icon('calendar')}</li>
    </ul>
  </div>
</section>

<section class="section theme-light" aria-labelledby="firma-title">
  <div class="container split split--top">
    <div>
      <p class="eyebrow">Firemní údaje</p>
      <h2 id="firma-title">Elektro Beránek — Solární elektrárny</h2>
      <dl class="info-list">
        <div><dt>Podnikatel</dt><dd>${FIRM.owner}</dd></div>
        <div><dt>Provozovna</dt><dd>${FIRM.provozovna.street}, ${FIRM.provozovna.zip} ${FIRM.provozovna.city}</dd></div>
        <div><dt>Sídlo</dt><dd>${FIRM.sidlo.street}, ${FIRM.sidlo.zip} ${FIRM.sidlo.city}</dd></div>
        <div><dt>IČO / DIČ</dt><dd>${FIRM.ico} / ${FIRM.dic}</dd></div>
        <div><dt>NZÚ</dt><dd><a class="link" href="${FIRM.nzu}" target="_blank" rel="noopener">Registrovaný dodavatel</a></dd></div>
      </dl>
    </div>
    <div>
      <p class="eyebrow">Užitečné odkazy</p>
      <nav class="ext-links" aria-label="Užitečné odkazy">
        <a href="https://www.nzu.cz" target="_blank" rel="noopener"><span>Nová zelená úsporám<small>Dotační program na úspory energie</small></span>${icon('arrow-ne')}</a>
        <a href="https://www.solaxcloud.com" target="_blank" rel="noopener"><span>Solax Cloud<small>Monitoring elektráren Solax</small></span>${icon('arrow-ne')}</a>
        <a href="https://en.goodwe.com/" target="_blank" rel="noopener"><span>GoodWe<small>Výrobce střídačů</small></span>${icon('arrow-ne')}</a>
        <a href="https://www.solaxpower.com/" target="_blank" rel="noopener"><span>Solax Power<small>Výrobce střídačů a baterií</small></span>${icon('arrow-ne')}</a>
        <a href="https://en.pylontech.com.cn/" target="_blank" rel="noopener"><span>Pylontech<small>Výrobce bateriových úložišť</small></span>${icon('arrow-ne')}</a>
        <a href="${FIRM.parent}" target="_blank" rel="noopener"><span>Elektro Beránek<small>elektroberanek.cz</small></span>${icon('arrow-ne')}</a>
      </nav>
    </div>
  </div>
</section>
${ctaBand({ title: 'Chcete nás poznat osobně?', text: 'Každá zakázka u nás začíná návštěvou na místě. Zavolejte, domluvíme termín a projdeme s vámi, co je u vás možné.', img: 'vrtani-panel' })}
`;

export default {
  file: 'onas.html',
  html: page({
    active: 'onas', path: 'onas.html',
    title: 'O nás – přes 20 let v oboru elektro | Elektro Beránek',
    description: 'Elektro Beránek: ryze český tým vlastních montérů, elektromontérů, projektových manažerů a revizního technika. Přes 20 let v oboru elektro, záruční i pozáruční servis.',
    jsonld: [LOCAL_BUSINESS, c.ld],
    body,
  }),
};
