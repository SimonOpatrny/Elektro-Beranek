import { page, picture, icon, ctaBand, crumbs, FIRM, LOCAL_BUSINESS } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Služby', 'sluzby.html'], ['Dotace NZÚ', 'dotace.html']]);

const body = `
<section class="phero theme-light" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="eyebrow">Dotace NZÚ</p>
        <h1 id="page-title" class="phero__title">Dotaci vyřídíme za vás</h1>
        <p class="lead phero__lead">V rámci celé instalace poskytujeme našim zákazníkům vyřízení dotace z programu Nová zelená úsporám. Veškerou dokumentaci zpracujeme a podáme. Od vás potřebujeme jen pár informací a podpisů.</p>
        <div class="btn-row mt-8">
          <a class="btn btn--dark" href="kontakt.html?sluzba=dotace#poptavka">Chci elektrárnu s dotací${icon('arrow')}</a>
          <a class="btn btn--ghost" href="https://www.nzu.cz" target="_blank" rel="noopener">Web programu NZÚ${icon('arrow-ne')}</a>
        </div>
      </div>
      <a class="nzu-card nzu-card--link" href="${FIRM.nzu}" target="_blank" rel="noopener">
        <img src="assets/img/nzu-dodavatel.webp" width="400" height="200" alt="Nová zelená úsporám – registrovaný dodavatel">
        <span class="mono">Jsme registrovaným dodavatelem NZÚ pro</span>
        <ul role="list">
          <li>${icon('check')}Solární systémy, fotovoltaika</li>
          <li>${icon('check')}Projektová dokumentace</li>
          <li>${icon('check')}Fotovoltaické elektrárny na klíč</li>
        </ul>
        <span class="link-arrow">Ověřit v seznamu dodavatelů${icon('arrow-ne')}</span>
      </a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="vyse-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Výše dotace</p>
        <h2 id="vyse-title">Kolik dotace pokryje</h2>
      </div>
      <p class="lead">Výše i forma podpory se řídí aktuálními pravidly programu Nová zelená úsporám, která se v posledních letech několikrát změnila. Platné znění najdete na <a class="link" href="https://www.nzu.cz" target="_blank" rel="noopener">nzu.cz</a>.</p>
    </div>
    <div class="subsidy reveal-stagger">
      <div class="subsidy__fig">
        <p class="mono">Fotovoltaické elektrárny</p>
        <p class="subsidy__amount">Nárok na dotaci až ve výši <strong>50 % z prodejní ceny</strong>, maximálně <strong>205 000 Kč</strong></p>
      </div>
      <div class="subsidy__fig">
        <p class="mono">Vybrané sestavy z ceníku</p>
        <p class="subsidy__amount">Dotace až <strong>140 000 Kč</strong>, včetně chytrého řízení Infigy</p>
      </div>
      <div class="notice subsidy__note">
        ${icon('alert')}
        <p>Konkrétní částka vždy závisí na pravidlech platných v době podání žádosti a na zvolené sestavě. Na to, na jakou podporu dosáhnete právě vy, se nás zeptejte při přípravě nabídky.</p>
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="kdo-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Rozdělení práce</p>
        <h2 id="kdo-title">Papíry řešíme my. Vy podepisujete.</h2>
      </div>
      <p class="lead">Veškerou dokumentaci spojenou se žádostí o dotaci zpracujeme a podáme za vás. Vaší prací je pouze poskytnutí důležitých informací a několik podpisů.</p>
    </div>
    <div class="duo reveal-stagger">
      <div class="duo__col duo__col--us">
        <h3><span class="mono">Zařídíme my</span>Elektro Beránek</h3>
        <ul class="checks" role="list">
          <li>${icon('check')}<span>Vypracování projektové dokumentace</span></li>
          <li>${icon('check')}<span>Podání žádosti o dotaci</span></li>
          <li>${icon('check')}<span>Veškerou dokumentaci k dotaci po instalaci a zprovoznění</span></li>
          <li>${icon('check')}<span>Potvrzení o realizaci pro vyplacení dotace</span></li>
          <li>${icon('check')}<span>Dokumenty k připojení elektrárny k síti</span></li>
        </ul>
      </div>
      <div class="duo__col">
        <h3><span class="mono">Potřebujeme od vás</span>Zákazník</h3>
        <ul class="checks" role="list">
          <li>${icon('user')}<span>Poskytnutí důležitých informací</span></li>
          <li>${icon('pen')}<span>Podpisy dokumentů souvisejících s dotací a připojením elektrárny, které vám předložíme</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section theme-ink has-grid" aria-labelledby="cesta-title">
  <div class="container split split--top">
    <div>
      <p class="eyebrow">Cesta k dotaci</p>
      <h2 id="cesta-title">Kde je dotace v průběhu zakázky</h2>
      <p class="lead mt-6">Dotace je pevnou součástí postupu instalace. Takhle na sebe jednotlivé kroky navazují.</p>
      <a class="link-arrow mt-7" href="instalace.html#postup">Celý postup instalace${icon('arrow')}</a>
    </div>
    <ol class="process" role="list">
      <li class="process__step"><span class="process__dot">01</span><div class="process__body"><h3 class="h4">Projekt a žádost o dotaci</h3><p>Po podpisu smlouvy o připojení vypracujeme projektovou dokumentaci a podáme žádost o dotaci.</p></div></li>
      <li class="process__step"><span class="process__dot">02</span><div class="process__body"><h3 class="h4">Instalace a připojení</h3><p>Dokončíme instalaci, revizi a první paralelní připojení k distribuční síti.</p></div></li>
      <li class="process__step"><span class="process__dot">03</span><div class="process__body"><h3 class="h4">Potvrzení o realizaci</h3><p>Po doplatku ceny vystavíme potvrzení o realizaci pro vyplacení dotace.</p></div></li>
      <li class="process__step"><span class="process__dot">04</span><div class="process__body"><h3 class="h4">Vyplacení dotace</h3><p>Dotace je vám vyplacena.</p></div></li>
    </ol>
  </div>
</section>

<section class="section section--tight theme-light theme-white" aria-label="Pokračujte">
  <div class="container">
    <div class="next-pages">
      <a class="next-page" href="cenik.html"><span class="mono">Ceník</span><strong>Ceny sestav po odečtení dotace${icon('arrow')}</strong><p>FVE 5, FVE 10-1, FVE Full a FVE Solax.</p></a>
      <a class="next-page" href="faq.html#dotace"><span class="mono">FAQ</span><strong>Otázky k dotaci a instalaci${icon('arrow')}</strong><p>Jak dlouho to trvá a co znamená instalace na klíč.</p></a>
    </div>
  </div>
</section>
${ctaBand({ title: 'Dotaci zahrneme do celé zakázky.', text: 'Zavolejte nebo napište. Po prohlídce připravíme nabídku na míru a vyřízení dotace bude její součástí.', img: 'dum-panely' })}
`;

export default {
  file: 'dotace.html',
  html: page({
    active: 'dotace', path: 'dotace.html', headerOnLight: true,
    title: 'Dotace NZÚ na fotovoltaiku – vyřídíme za vás | Elektro Beránek',
    description: 'Jsme registrovaný dodavatel programu Nová zelená úsporám. Projektovou dokumentaci i žádost o dotaci na fotovoltaickou elektrárnu zpracujeme a podáme za vás.',
    jsonld: [LOCAL_BUSINESS, c.ld],
    body,
  }),
};
