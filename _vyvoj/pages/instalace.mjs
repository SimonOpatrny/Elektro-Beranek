import { page, picture, icon, ctaBand, crumbs, LOCAL_BUSINESS } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Služby', 'sluzby.html'], ['Instalace a revize', 'instalace.html']]);

const phases = [
  ['Příprava', [
    ['Osobní kontakt na místě', 'Celý postup začíná setkáním na místě instalace. Projdeme objekt, střechu i rozvaděč.'],
    ['Řešení na míru', 'Vybereme řešení přímo pro vás, podle vašich požadavků a možností objektu.'],
    ['Žádost u distributora sítě', 'Podáme žádost o připojení k distributorovi sítě (DS).'],
    ['Smlouva o připojení', 'Podepíšete smlouvu o připojení k distribuční síti.'],
    ['Projekt a žádost o dotaci', 'Vypracujeme projektovou dokumentaci a podáme žádost o dotaci.'],
    ['Smlouva o dílo', 'Podepíšeme smlouvu o dílo s platebními podmínkami a termíny realizace.'],
  ]],
  ['Realizace', [
    ['Zahájení instalace', 'Podle podmínek ve smlouvě o dílo začneme s instalací elektrárny.'],
    ['Dokončení, revize a PPP', 'Dokončíme instalaci, provedeme revizi a první paralelní připojení (PPP) k distribuční síti.'],
  ]],
  ['Dokončení', [
    ['Doplatek a potvrzení o realizaci', 'Po doplatku ceny vystavíme potvrzení o realizaci, které je podkladem pro vyplacení dotace.'],
    ['Vyplacení dotace', 'Dotace je vyplacena a vaše elektrárna vyrábí.'],
  ]],
];

let n = 0;
const stepsHtml = phases.map(([ph, items], pi) => `
      <li class="steps__phase mono">Fáze ${pi + 1} — ${ph}</li>${items.map(([t, p]) => `
      <li class="steps__item"><span class="steps__no">${String(++n).padStart(2, '0')}</span><h3>${t}</h3><p>${p}</p></li>`).join('')}`).join('');

const body = `
<section class="phero phero--photo" aria-labelledby="page-title">
  ${picture('montaz-panel', { alt: '', sizes: '100vw', cls: 'phero__bg', eager: true })}
  <div class="container">
    ${c.html}
    <div class="phero__copy">
      <p class="eyebrow">Instalace a revize</p>
      <h1 id="page-title" class="phero__title">Instalace, revize a&nbsp;připojení k&nbsp;síti</h1>
      <p class="lead phero__lead">Od osobní prohlídky přes papíry s distributorem až po spuštění a vyplacení dotace. Tady je přesný postup, jak u nás instalace probíhá.</p>
      <div class="phero__meta">
        <div><span class="mono">Zahájení</span><strong>do 30 dnů od podpisu smlouvy</strong></div>
        <div><span class="mono">Hotovo</span><strong>v průměru za 1–2 měsíce</strong></div>
        <div><span class="mono">Kroků</span><strong>10, většinu zařídíme my</strong></div>
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" id="postup" aria-labelledby="jak-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Jak to funguje</p>
        <h2 id="jak-title">Celkový postup instalace krok za krokem</h2>
      </div>
      <p class="lead">Celkový postup začne osobním kontaktem na místě instalace. Řešení vybereme na míru, podle vašich požadavků a podle možností objektu.</p>
    </div>
    <ol class="steps" role="list">${stepsHtml}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="rychlost-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Rychlost instalace</p>
        <h2 id="rychlost-title">Většinou máme hotovo dřív, než dorazí papíry</h2>
      </div>
      <p class="lead">Po podání žádosti u distributora sítě čekáme jen na kladné rozhodnutí o možnosti připojení. Mezitím už domlouváme termín instalace.</p>
    </div>
    <div class="timeline-bar reveal">
      <div class="tbar" role="img" aria-label="Zahájení instalace do 30 dnů od podpisu smlouvy, čekání na distributora sítě, dokončení v průměru do 1 až 2 měsíců od podpisu smlouvy">
        <div class="is-ours">Zahájení do 30 dnů</div>
        <div>Vyřízení u distributora sítě</div>
        <div class="is-ours">Hotovo do 1–2 měsíců</div>
      </div>
      <div class="tbar-legend"><span><i class="is-ours"></i>Naše práce</span><span><i></i>Lhůty distributora sítě</span></div>
    </div>
    <div class="process-note">
      ${icon('clock')}
      <p><strong>Instalaci zahájíme nejpozději do 30 dnů od podpisu smlouvy</strong>, v drtivé většině případů mnohem dříve. Zpravidla máme kompletní instalaci hotovou a brzdí nás jen papírování s distributorem sítě. Rychlost vyřízení požadavků u distributora bohužel ovlivnit nedokážeme.</p>
    </div>
  </div>
</section>

<section class="section theme-ink" id="revize" aria-labelledby="revize-title">
  <div class="container split">
    <div class="media-frame media-frame--wide reveal">
      ${picture('multimetr', { alt: 'Klešťový multimetr, kabely a nářadí elektrikáře', sizes: '(min-width: 960px) 45vw, 100vw' })}
    </div>
    <div class="reveal">
      <p class="eyebrow">Revize a kontroly</p>
      <h2 id="revize-title">Revize i pro elektrárny, které jsme nestavěli</h2>
      <div class="prose mt-6">
        <p>Zabýváme se revizemi a kontrolami solárních elektráren. Revize je součástí dokončení každé naší instalace, ještě před prvním paralelním připojením k síti.</p>
        <p>Pozáruční servis, opravy a revize provádíme i na solárních elektrárnách, které jsme sami nemontovali. Máme 7+ let zkušeností s revizemi a montážemi fotovoltaických elektráren.</p>
      </div>
      <a class="btn btn--primary mt-8" href="kontakt.html?sluzba=servis#poptavka">Objednat revizi nebo servis${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section theme-light theme-white" aria-labelledby="pojmy-title">
  <div class="container split split--top">
    <div>
      <p class="eyebrow">Slovníček</p>
      <h2 id="pojmy-title">Pojmy, se kterými se při instalaci setkáte</h2>
      <p class="lead mt-6">Papírování kolem připojení elektrárny vyřizujeme za vás. Pro přehled ale přikládáme, co jednotlivé zkratky znamenají.</p>
    </div>
    <dl class="glossary">
      <div><dt>DS<span class="mono">Distributor sítě</span></dt><dd>Provozovatel distribuční soustavy ve vašem regionu. U něj podáváme žádost o připojení elektrárny a dokumentaci k prvnímu paralelnímu připojení.</dd></div>
      <div><dt>PPP<span class="mono">První paralelní připojení</span></dt><dd>Okamžik, kdy se elektrárna poprvé připojí k distribuční síti a začne pracovat souběžně s ní. Předchází mu dokončení instalace a revize.</dd></div>
      <div><dt>4Q elektroměr<span class="mono">Čtyřkvadrantový</span></dt><dd>Elektroměr, který měří elektřinu odebranou ze sítě i dodanou do sítě. Po jeho namontování elektrárnu poprvé spustíme.</dd></div>
      <div><dt>Revize<span class="mono">Revizní zpráva</span></dt><dd>Odborná kontrola elektrické instalace elektrárny revizním technikem, která je podkladem pro připojení k síti.</dd></div>
      <div><dt>Hybridní měnič<span class="mono">Střídač</span></dt><dd>Převádí stejnosměrný proud z panelů na střídavý a řídí nabíjení baterie. <a class="link" href="fotovoltaika.html#jak-funguje">Jak funguje hybridní elektrárna</a></dd></div>
    </dl>
  </div>
</section>

<section class="section" aria-labelledby="svepomoci-title">
  <div class="container">
    <div class="feature-box reveal">
      <div>
        <p class="eyebrow">Něco navíc</p>
        <h2 id="svepomoci-title">Jste zruční? Postavte si elektrárnu sami.</h2>
        <p class="lead mt-6">Myslíte si, že elektrárnu zvládnete nainstalovat sami? Nebráníme se ani této variantě. Cena instalace se sníží o vaši práci, a vy tak ušetříte.</p>
        <a class="btn btn--dark mt-8" href="kontakt.html?sluzba=svepomoci#poptavka">Probrat montáž svépomocí${icon('arrow')}</a>
      </div>
      <ol>
        <li>Připravíme veškeré náležitosti: projekt a žádost o dotaci</li>
        <li>Elektrárnu si sami nainstalujete</li>
        <li>My provedeme kontrolu, revizi a nastavení</li>
        <li>Cena instalace se sníží o vaši práci</li>
      </ol>
    </div>
  </div>
</section>

<section class="section section--tight theme-light" aria-label="Pokračujte">
  <div class="container">
    <div class="next-pages">
      <a class="next-page" href="dotace.html"><span class="mono">Dotace</span><strong>Jak vyřídíme dotaci NZÚ${icon('arrow')}</strong><p>Co zařídíme za vás a co bude potřeba od vás.</p></a>
      <a class="next-page" href="cenik.html"><span class="mono">Ceník</span><strong>Standardní sestavy a ceny${icon('arrow')}</strong><p>Orientační ceny po odečtení dotace.</p></a>
    </div>
  </div>
</section>
${ctaBand()}
`;

export default {
  file: 'instalace.html',
  html: page({
    active: 'instalace', path: 'instalace.html',
    title: 'Instalace, revize a PPP připojení FVE | Elektro Beránek',
    description: 'Postup instalace fotovoltaické elektrárny krok za krokem: prohlídka, žádost u distributora, smlouvy, montáž, revize, první paralelní připojení a vyplacení dotace. Možnost montáže svépomocí.',
    jsonld: [LOCAL_BUSINESS, c.ld],
    body,
  }),
};
