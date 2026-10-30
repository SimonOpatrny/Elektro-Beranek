import { page, picture, icon, crumbs, FIRM } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Ochrana osobních údajů', 'ochrana-osobnich-udaju.html']]);

const gdpr = `
<section class="phero theme-light" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__copy">
      <p class="eyebrow">Informace pro návštěvníky webu</p>
      <h1 id="page-title" class="phero__title">Ochrana osobních údajů</h1>
      <p class="lead phero__lead">Jak zacházíme s údaji, které nám pošlete přes poptávkový formulář, e-mail nebo telefon.</p>
    </div>
  </div>
</section>
<section class="section theme-light theme-white">
  <div class="container--narrow legal">
    <h2>Správce osobních údajů</h2>
    <p>${FIRM.owner}, IČO ${FIRM.ico}, se sídlem ${FIRM.sidlo.street}, ${FIRM.sidlo.zip} ${FIRM.sidlo.city}. Kontakt: <a class="link" href="mailto:${FIRM.email}">${FIRM.email}</a>, <a class="link" href="${FIRM.phoneHref}">${FIRM.phone}</a>.</p>

    <h2>Jaké údaje zpracováváme</h2>
    <p>Údaje, které sami vyplníte v poptávkovém formuláři: jméno a příjmení, telefon, e-mail, obec místa instalace, zvolenou službu a text zprávy. Server při odeslání formuláře dočasně eviduje IP adresu odesílatele kvůli ochraně proti zneužití formuláře.</p>

    <h2>Účel a právní základ</h2>
    <p>Údaje používáme jen k vyřízení vaší poptávky: abychom vás mohli kontaktovat, domluvit prohlídku a připravit nabídku. Právním základem je provedení opatření před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) obecného nařízení o ochraně osobních údajů).</p>

    <h2>Jak dlouho údaje uchováváme</h2>
    <p>Po dobu nezbytnou k vyřízení poptávky. Pokud uzavřeme smlouvu, uchováváme údaje po dobu, kterou stanoví právní předpisy.</p>

    <h2>Komu údaje předáváme</h2>
    <p>Údaje neprodáváme ani nepředáváme k marketingovým účelům. Technicky je zpracovává poskytovatel webhostingu a e-mailových služeb, přes kterého formulář zprávu doručuje.</p>

    <h2>Vaše práva</h2>
    <p>Máte právo požadovat přístup ke svým údajům, jejich opravu nebo výmaz, omezení zpracování, vznést námitku a právo na přenositelnost údajů. Stížnost můžete podat u Úřadu pro ochranu osobních údajů (<a class="link" href="https://uoou.gov.cz" target="_blank" rel="noopener">uoou.gov.cz</a>).</p>

    <h2>Cookies a měření návštěvnosti</h2>
    <p>Tento web nepoužívá analytické ani reklamní cookies a neměří návštěvnost. Mapa Google na stránce Kontakt se načte až po kliknutí na tlačítko „Načíst mapu“. Po jejím načtení může společnost Google ukládat cookies podle svých vlastních pravidel.</p>

    <p class="muted mt-9 small">Poslední aktualizace: 29. 10. 2026</p>
  </div>
</section>`;

const e404 = `
<section class="e404 theme-ink has-grid">
  <div class="container split">
    <div>
      <p class="eyebrow">Chyba 404</p>
      <p class="bignum num" aria-hidden="true">404</p>
      <h1 class="h2 mt-6">Tady proud neteče.</h1>
      <p class="lead mt-6">Stránka, kterou hledáte, neexistuje nebo byla přesunuta. Původní adresy starého webu přesměrováváme automaticky.</p>
      <div class="btn-row mt-8">
        <a class="btn btn--primary" href="index.html">Na úvodní stránku${icon('arrow')}</a>
        <a class="btn btn--ghost" href="kontakt.html">Kontakt</a>
      </div>
    </div>
    <nav aria-label="Hlavní stránky webu">
      <div class="ext-links">
        <a href="sluzby.html"><span>Služby<small>Instalace, revize, servis</small></span>${icon('arrow')}</a>
        <a href="fotovoltaika.html"><span>Fotovoltaika<small>Typy elektráren</small></span>${icon('arrow')}</a>
        <a href="cenik.html"><span>Ceník<small>Standardní sestavy</small></span>${icon('arrow')}</a>
        <a href="dotace.html"><span>Dotace NZÚ<small>Vyřídíme za vás</small></span>${icon('arrow')}</a>
        <a href="faq.html"><span>FAQ<small>Časté otázky</small></span>${icon('arrow')}</a>
      </div>
    </nav>
  </div>
</section>`;

export default [
  { file: 'ochrana-osobnich-udaju.html', html: page({ active: 'gdpr', path: 'ochrana-osobnich-udaju.html', headerOnLight: true, title: 'Ochrana osobních údajů | Elektro Beránek', description: 'Informace o zpracování osobních údajů z poptávkového formuláře webu Elektro Beránek – Solární elektrárny. Web nepoužívá analytické ani reklamní cookies.', jsonld: [c.ld], body: gdpr }) },
  { file: '404.html', html: page({ active: '404', path: '404.html', title: 'Stránka nenalezena | Elektro Beránek', description: 'Požadovaná stránka neexistuje. Pokračujte na úvodní stránku webu Elektro Beránek – Solární elektrárny.', robots: 'noindex, follow', base: '/', body: e404 }) },
];
