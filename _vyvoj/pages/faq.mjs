import { page, icon, ctaBand, crumbs, FIRM, LOCAL_BUSINESS } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['FAQ', 'faq.html']]);

// Otázky a odpovědi převzaté z původní stránky faq.php (jazykově upraveno, význam zachován)
const CATS = [
  { id: 'technologie', name: 'Technologie a životnost', items: [
    ['Co je to hybridní elektrárna?', ['Je to systém obsahující solární panely a střídač, který přemění stejnosměrnou energii z panelů na střídavou energii vhodnou pro domácí spotřebiče. Systém je vybaven baterií, do které se během dne ukládají přebytky energie pro pozdější spotřebu nebo pro pokrytí spotřeby v době nepříznivého počasí.'], ['fotovoltaika.html#jak-funguje', 'Jak funguje hybridní elektrárna']],
    ['Jakou životnost mají solární panely?', ['Výrobci solárních panelů garantují 80procentní výkon po 25 letech provozu.']],
    ['Jaká je životnost střídače a baterie?', ['Životnost baterie je přibližně 4 000 – 6 000 nabíjecích cyklů. Baterie postupně ztrácí kapacitu, ale bude fungovat i po uplynutí těchto cyklů, jen s menší kapacitou. Střídače mají podobnou životnost.', 'Velká obava veřejnosti je především o životnost baterií. Slabším článkem sestavy ale většinou bývá solární střídač. Dá se říct, že za dobu provozu elektrárny jednou vyměníte solární střídač.']],
    ['Jaká je ideální montáž elektrárny?', ['Ideální instalace není. Vždy je potřeba instalaci navrhnout a provést co nejefektivněji. Vhodná je instalace na jižní stranu střechy. Pokud takovou střechu nemáte, lze solární panely instalovat i na západní a východní stranu, v praxi se to tak dělá. Celková roční energie je pak přibližně o 10–20 procent nižší.', 'Instalaci je možné provést i při částečném zastínění panelů vegetací nebo budovami. Tam je většinou podmínkou použití optimizérů, které celou sestavu optimalizují. Je to bohužel investice navíc. Bez optimizérů zastínění značně degraduje celý systém, řádově až o 70 procent výkonu za celý rok.']],
  ] },
  { id: 'instalace', name: 'Průběh instalace', items: [
    ['Jak rychlá je instalace?', ['Instalaci zahájíme nejpozději do 30 dnů od podpisu smlouvy, v drtivé většině případů ale mnohem dříve. Po podání žádosti u distributora sítě čekáme jen na kladné rozhodnutí o možnosti připojení elektrárny do sítě. V tomto čase už domlouváme možný termín instalace.', 'Zpravidla máme hotovou kompletní instalaci a brzdí nás jen papírování s distributorem sítě. V průměru je instalace hotová do 1–2 měsíců od podpisu smlouvy. Rychlost vyřízení požadavků u distributora sítě bohužel ovlivnit nedokážeme.'], ['instalace.html#postup', 'Celý postup instalace']],
    ['Co u vás znamená instalace na klíč?', ['Chceme zdůraznit, že instalace od nás na klíč je opravdu na klíč: od podpisu smlouvy až po předání fungující sestavy připojené k distribuční síti.', 'V poslední době nás kontaktují zákazníci s elektrárnou od konkurence, kteří nás žádají většinou o úpravu elektroměrového pilíře a bytových rozvodů. Konkurenční firma jim sice dodala instalaci na klíč, ale na klíč jen samotnou elektrárnu a nezbytné obvody. Zbývající úpravy instalace nechala na investorovi. Proto radíme prověřit si, zda má firma kromě jiného zkušenosti nejen s instalací solárních elektráren, ale celkově s elektroinstalací.']],
  ] },
  { id: 'dotace', name: 'Dotace', items: [
    ['Jak je to s dotací?', ['Veškerou dokumentaci spojenou se žádostí o dotaci zpracujeme a podáme za vás. Vaší prací je pouze poskytnout nám důležité informace a podepsat několik dokumentů souvisejících s dotací.'], ['dotace.html', 'Vyřízení dotace NZÚ']],
  ] },
];

const faqLd = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: CATS.flatMap((cat) => cat.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.join(' ') } }))),
};

let qn = 0;
const list = CATS.map((cat, ci) => `
      <h2 class="faq__cat h3" id="${cat.id}"><span class="mono">0${ci + 1}</span>${cat.name}</h2>
      <div class="faq">${cat.items.map(([q, a, link]) => { qn++; return `
        <details class="faq__item" id="otazka-${qn}">
          <summary class="faq__q"><span>${q}</span><span class="faq__icon">${icon('plus')}</span></summary>
          <div class="faq__a">${a.map((p) => `<p>${p}</p>`).join('')}${link ? `<a class="link-arrow" href="${link[0]}">${link[1]}${icon('arrow')}</a>` : ''}</div>
        </details>`; }).join('')}
      </div>`).join('');

const body = `
<section class="phero theme-light" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__copy">
      <p class="eyebrow">FAQ</p>
      <h1 id="page-title" class="phero__title">Časté otázky</h1>
      <p class="lead phero__lead">Odpovědi na to, na co se nás zákazníci ptají nejčastěji: životnost panelů a baterií, ideální montáž, rychlost instalace a dotace.</p>
    </div>
  </div>
</section>

<section class="section theme-light theme-white" aria-label="Otázky a odpovědi">
  <div class="container faq-layout">
    <aside class="faq-nav">
      <nav aria-label="Kategorie otázek">
        <p class="mono muted">Kategorie</p>
        <ul role="list">${CATS.map((cat) => `<li><a href="#${cat.id}">${cat.name}<span class="mono">${cat.items.length}</span></a></li>`).join('')}</ul>
      </nav>
      <button class="btn btn--ghost btn--sm" type="button" data-faq-all aria-pressed="false">Rozbalit všechny odpovědi</button>
    </aside>
    <div class="faq-main">${list}
      <div class="faq-ask">
        <div>
          <h2 class="h3">Nenašli jste odpověď?</h2>
          <p class="muted">Zeptejte se nás přímo. Rádi poradíme i s elektrárnou, kterou jsme nestavěli.</p>
        </div>
        <div class="btn-row">
          <a class="btn btn--dark" href="${FIRM.phoneHref}">${icon('phone')}${FIRM.phone}</a>
          <a class="btn btn--ghost" href="kontakt.html#poptavka">Napsat dotaz</a>
        </div>
      </div>
    </div>
  </div>
</section>
${ctaBand({ img: 'panely-detail' })}
`;

export default {
  file: 'faq.html',
  html: page({
    active: 'faq', path: 'faq.html', headerOnLight: true,
    title: 'FAQ – časté otázky o fotovoltaice | Elektro Beránek',
    description: 'Životnost solárních panelů, střídače a baterie, ideální montáž elektrárny, rychlost instalace, instalace na klíč a vyřízení dotace. Odpovědi na časté otázky.',
    jsonld: [LOCAL_BUSINESS, c.ld, faqLd],
    body,
  }),
};
