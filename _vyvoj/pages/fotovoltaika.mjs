import { page, picture, product, icon, ctaBand, crumbs, LOCAL_BUSINESS } from '../lib/layout.mjs';
import { energyDiagram } from '../lib/energy.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Služby', 'sluzby.html'], ['Fotovoltaika', 'fotovoltaika.html']]);

const body = `
<section class="phero" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="eyebrow">Fotovoltaika</p>
        <h1 id="page-title" class="phero__title">Hybridní, síťová, nebo ostrovní?</h1>
        <p class="lead phero__lead">Instalujeme všechny tři typy elektráren a realizujeme kompletní střešní fotovoltaické elektrárny. Hybridní elektrárna je dnes v České republice nejčastěji instalovaným typem. Kombinuje výhody obou zbývajících řešení a lze na ni získat dotaci.</p>
        <div class="btn-row mt-8">
          <a class="btn btn--primary" href="#typy">Porovnat typy${icon('arrow')}</a>
          <a class="btn btn--ghost" href="#jak-funguje">Jak funguje hybridní FVE</a>
        </div>
      </div>
      <div class="phero__media phero__media--tall">
        ${picture('dum-cerne-panely', { alt: 'Rodinný dům s celočernými fotovoltaickými panely na sedlové střeše', sizes: '(min-width: 960px) 40vw, 100vw', eager: true })}
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" id="typy" aria-labelledby="typy-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Tři základní typy</p>
        <h2 id="typy-title">Jaké solární elektrárny si mohou domácnosti instalovat</h2>
      </div>
      <p class="lead">Rozlišujeme tři základní typy. Liší se tím, zda jsou připojené k distribuční síti a kam ukládají přebytky energie.</p>
    </div>
    <div class="types reveal-stagger">
      <article class="type">
        <div class="type__head"><span class="mono">On-grid</span><h3>Síťová elektrárna</h3></div>
        <div class="type__body">
          <p>Vlastní elektřinu využijete přímo v domácnosti. Nespotřebovanou energii akumulujeme v přípravě teplé užitkové vody (TUV). Pokud je i tak dosažena požadovaná teplota vody, přebytek se dodává do distribuční sítě.</p>
          <p>Majitel si sníží účty za elektřinu: přebytky uloží jako teplou vodu a zbytek prodá distributorovi, nebo si ji v době potřeby vezme zpět. Rozšířený typ elektrárny s dotací NZÚ, pokud není k akumulaci použita baterie.</p>
        </div>
      </article>
      <article class="type type--featured">
        <div class="type__head"><span class="type__badge mono">Nejčastější v ČR</span><span class="mono">Hybridní</span><h3>Hybridní elektrárna</h3></div>
        <div class="type__body">
          <p>Kombinuje výhody síťové i ostrovní elektrárny. Disponuje akumulátory, do kterých ukládá přebytky energie, a odtud je také pro své potřeby čerpá.</p>
          <p>Maximum elektřiny vyrábí kolem poledne, kdy je spotřeba nízká. Večer, kdy je spotřeba vysoká, si bere uloženou elektřinu z akumulátorů. Když slunce nesvítí dostatečně, odebírá elektřinu z distribuční sítě, na kterou je napojená.</p>
        </div>
      </article>
      <article class="type">
        <div class="type__head"><span class="mono">Off-grid</span><h3>Ostrovní elektrárna</h3></div>
        <div class="type__body">
          <p>Do sítě není vůbec připojená a hospodaří pouze s vlastní elektřinou. Ke své funkci potřebuje bateriové úložiště pro dodávku energie, když slunce nesvítí, nebo v noci.</p>
          <p>Nevýhodou je, že musí mít bateriový systém s velkou kapacitou pro pokrytí celkové spotřeby, nebo záložní zdroj pro dny bez slunce, například dieselový agregát. Na rozdíl od síťové fotovoltaiky pro ni není nutné povolení od Energetického regulačního úřadu.</p>
        </div>
      </article>
    </div>

    <div class="compare-wrap mt-9 reveal">
      <table class="compare">
        <caption class="visually-hidden">Srovnání síťové, hybridní a ostrovní elektrárny</caption>
        <thead><tr><td></td><th scope="col">Síťová (on-grid)</th><th scope="col">Hybridní</th><th scope="col">Ostrovní (off-grid)</th></tr></thead>
        <tbody>
          <tr><th scope="row">Připojení k síti</th><td>Ano</td><td>Ano</td><td class="no">Ne</td></tr>
          <tr><th scope="row">Baterie</th><td class="no">Není nutná</td><td>Ano, akumulátory na přebytky</td><td>Nutná, s velkou kapacitou</td></tr>
          <tr><th scope="row">Kam jdou přebytky</th><td>Ohřev teplé vody, potom do sítě</td><td>Do baterie, potom do sítě</td><td>Jen do vlastní baterie</td></tr>
          <tr><th scope="row">Když nesvítí slunce</th><td>Odběr ze sítě</td><td>Z baterie, potom ze sítě</td><td>Z baterie nebo záložního zdroje</td></tr>
          <tr><th scope="row">Dotace NZÚ</th><td>Rozšířený typ s dotací (bez baterie)</td><td>Lze získat dotaci</td><td class="no">—</td></tr>
        </tbody>
      </table>
    </div>
    <p class="compare-hint">Tabulku lze posouvat do stran.</p>
  </div>
</section>

<section class="section theme-ink has-grid" id="jak-funguje" aria-labelledby="hfve-title">
  <div class="container energy-stage">
    <div>
      <p class="eyebrow">Jak funguje hybridní elektrárna</p>
      <h2 id="hfve-title">Vyrobí, spotřebuje, uloží. A když je potřeba, sáhne do sítě.</h2>
      <div class="prose mt-6">
        <p>Hybridní fotovoltaická elektrárna vyrábí elektřinu pomocí solárních panelů. Vyrobená elektřina se ihned spotřebuje na provoz spotřebičů v domácnosti, nebo se její přebytky uloží do připojených akumulátorů. Ty by měly mít dostatečnou kapacitu, aby se ze sítě odebíralo co nejméně energie. I s hybridní elektrárnou je možné přebytky prodat a dodávat do distribuční sítě.</p>
      </div>
      <p class="mono mt-7 muted">Vyzkoušejte situace ve schématu</p>
    </div>
    ${energyDiagram({ id: 'en-fve' })}
  </div>
</section>

<section class="section" aria-labelledby="menic-title">
  <div class="container split">
    <div class="reveal">
      <p class="eyebrow">Srdce systému</p>
      <h2 id="menic-title">Důležitou součástí je hybridní měnič napětí</h2>
      <div class="prose mt-6">
        <p>Klíčovou součástí hybridní fotovoltaické elektrárny je kromě solárních panelů a akumulátorů také <strong>hybridní měnič napětí</strong>. Převádí stejnosměrný proud na střídavý a umožňuje dodávat elektřinu z distribuční sítě a zároveň dobíjet bateriové úložiště.</p>
        <p>Když ráno vyjde slunce a panely dodávají dostatečný výkon, začnou pracovat řídicí systémy a vyrobená energie se spotřebuje ve spotřebičích domácnosti. Pokud se vyrobí víc, než se spotřebuje, energie se uloží do baterie pro pozdější využití bez slunečního záření (noc, mraky). Pokud je i tak přebytek, dodá se do distribuční sítě.</p>
      </div>
    </div>
    <div class="product-stage reveal">
      ${product('goodwe-et', 'Hybridní střídač GoodWe řady ET')}
      <p class="mono">GoodWe 10K-ET · hybridní asymetrický střídač</p>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="baterie-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Ukládání energie</p>
        <h2 id="baterie-title">Elektřinu uložíte do fyzické nebo virtuální baterie</h2>
      </div>
      <p class="lead">Hybridní fotovoltaika využívá akumulátory pro uložení přebytků. Vybírat můžete mezi olověnými, lithium-iontovými a v současnosti spíše LiFePO4 bateriemi.</p>
    </div>
    <div class="batt reveal-stagger">
      <article class="batt__item">
        <span class="mono">Dříve</span>
        <h3>Olověné akumulátory</h3>
        <p>Hlavní nevýhoda je krátká životnost, jen pár let. Pokud se olověné baterie příliš vybijí, sníží se jejich kapacita.</p>
      </article>
      <article class="batt__item">
        <span class="mono">Odolnější</span>
        <h3>Lithiové baterie</h3>
        <p>Zvládnou větší vybití a mají delší životnost. Většina výrobců dává záruku 5–10 let, reálná životnost některých typů by měla dosáhnout až 25 let. Počítejte s vyšší cenou.</p>
      </article>
      <article class="batt__item is-now">
        <span class="mono">V současnosti</span>
        <h3>LiFePO4</h3>
        <p>Lithium-železo-fosfátové baterie. V současnosti se k fotovoltaice instalují spíše tyto akumulátory.</p>
      </article>
      <article class="batt__item">
        <span class="mono">Hit posledních let</span>
        <h3>Virtuální baterie</h3>
        <p>K uskladnění energie využívá přímo distribuční síť. Přebytky pošlete do sítě a v době potřeby si stejné množství odeberete zpět. Poplatky za distribuční přenos se ale platí vždy.</p>
      </article>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="komp2-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Komponenty</p>
        <h2 id="komp2-title">Se kterými značkami pracujeme</h2>
      </div>
      <p class="lead">Instalaci provádíme ze špičkových komponentů, převážně značek GoodWe, Solax, Dyness, Pylontech a dalších.</p>
    </div>
    <div class="components reveal-stagger">
      <figure class="comp">
        <div class="comp__img">${product('dyness-tower', 'Bateriové úložiště Dyness Tower', 'is-wide')}</div>
        <figcaption class="comp__meta"><span class="mono">Baterie</span><h3 class="h4">Dyness Tower 10,65 kWh</h3><p>Bateriové úložiště ve standardních sestavách FVE 5, FVE 10-1 a FVE Full.</p></figcaption>
      </figure>
      <figure class="comp">
        <div class="comp__img">${product('goodwe-et', 'Hybridní střídač GoodWe ET')}</div>
        <figcaption class="comp__meta"><span class="mono">Střídač</span><h3 class="h4">GoodWe 10K-ET</h3><p>Hybridní asymetrický střídač pro sestavy s baterií.</p></figcaption>
      </figure>
      <figure class="comp">
        <div class="comp__img">${product('solax-x3', 'Hybridní střídač Solax X3')}</div>
        <figcaption class="comp__meta"><span class="mono">Střídač</span><h3 class="h4">Solax X3 G4 10.0-D</h3><p>Hybridní asymetrický střídač v sestavě FVE Solax s baterií Triple Power.</p></figcaption>
      </figure>
    </div>
    <div class="brands">
      <span class="mono">Značky</span><span>GoodWe</span><span>Solax</span><span>Dyness</span><span>Pylontech</span>
    </div>
    <p class="legal-note">Produktové fotografie: výrobci komponent. Názvy značek jsou ochranné známky svých vlastníků.</p>
  </div>
</section>

<section class="section section--tight theme-light theme-white" aria-label="Pokračujte">
  <div class="container">
    <div class="next-pages">
      <a class="next-page" href="cenik.html"><span class="mono">Další krok</span><strong>Ceník standardních sestav${icon('arrow')}</strong><p>Čtyři sestavy s cenou po odečtení dotace.</p></a>
      <a class="next-page" href="faq.html"><span class="mono">Časté otázky</span><strong>Životnost a ideální montáž${icon('arrow')}</strong><p>Jak dlouho vydrží panely, střídač a baterie a kam panely umístit.</p></a>
    </div>
  </div>
</section>
${ctaBand({ title: 'Která elektrárna se hodí k vašemu domu?', text: 'Řekneme vám to po prohlídce na místě. Projdeme střechu, rozvaděč i vaši spotřebu a navrhneme řešení na míru.' })}
`;

export default {
  file: 'fotovoltaika.html',
  html: page({
    active: 'fotovoltaika', path: 'fotovoltaika.html',
    title: 'Fotovoltaika – hybridní, síťové a ostrovní elektrárny | Elektro Beránek',
    description: 'Jak fungují hybridní, síťové (on-grid) a ostrovní (off-grid) fotovoltaické elektrárny, k čemu je hybridní měnič a jaké baterie vybrat. Instalace střešních FVE na klíč.',
    jsonld: [LOCAL_BUSINESS, c.ld],
    body,
  }),
};
