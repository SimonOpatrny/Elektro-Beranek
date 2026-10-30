// Komplexní test webu: odkazy, kotvy, konzole, přetečení, interakce, formulář, přístupnost (axe)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = 'http://127.0.0.1:8080/';
const SITE = path.resolve(__dirname, '..') + '/';
const PAGES = fs.readdirSync(SITE).filter((f) => f.endsWith('.html'));
const MAILFILE = process.env.MAILFILE || '';
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const out = { links: [], overflow: [], console: [], axe: [], checks: [] };
const ok = (name, cond, info = '') => out.checks.push((cond ? 'PASS ' : 'FAIL ') + name + (info ? ' — ' + info : ''));

(async () => {
  const browser = await chromium.launch();
  // 1) odkazy, kotvy, chyby konzole, axe
  const ids = {};
  for (const pg of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) out.console.push(pg + ': ' + m.text()); });
    page.on('pageerror', (e) => out.console.push(pg + ' pageerror: ' + e.message));
    page.on('response', (r) => { if (r.status() >= 400 && !r.url().includes('favicon')) out.console.push(pg + ' HTTP ' + r.status() + ' ' + r.url()); });
    await page.goto(BASE + pg, { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => ({
      ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      imgsBroken: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map((i) => i.src),
      noAlt: [...document.querySelectorAll('img:not([alt])')].length,
      h1: document.querySelectorAll('h1').length,
      title: document.title, desc: document.querySelector('meta[name=description]')?.content,
      canonical: document.querySelector('link[rel=canonical]')?.href,
      lang: document.documentElement.lang,
      headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => +h.tagName[1]),
      dupIds: (() => { const c = {}; document.querySelectorAll('[id]').forEach((e) => c[e.id] = (c[e.id] || 0) + 1); return Object.keys(c).filter((k) => c[k] > 1); })(),
    }));
    ids[pg] = new Set(data.ids);
    out.links.push({ pg, links: data.links });
    ok(pg + ' má právě jeden H1', data.h1 === 1, String(data.h1));
    ok(pg + ' má lang=cs', data.lang === 'cs');
    ok(pg + ' bez duplicitních id', data.dupIds.length === 0, data.dupIds.join(','));
    ok(pg + ' obrázky mají alt', data.noAlt === 0, String(data.noAlt));
    ok(pg + ' žádné rozbité obrázky', data.imgsBroken.length === 0, data.imgsBroken.join(','));
    let skip = false; for (let i = 1; i < data.headings.length; i++) if (data.headings[i] - data.headings[i - 1] > 1) skip = data.headings.slice(i - 1, i + 1).join('>');
    ok(pg + ' hierarchie nadpisů bez přeskoků', !skip, skip || '');
    out[pg] = { title: data.title, desc: data.desc, canonical: data.canonical };
    // axe
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () => {
      document.querySelectorAll('.reveal,.reveal-stagger,.process__step').forEach((e) => e.classList.add('is-in'));
      await new Promise((r) => setTimeout(r, 1200));
      const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] });
      return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n')[1]) }));
    });
    res.forEach((v) => out.axe.push(pg + ' [' + v.impact + '] ' + v.id + ' ×' + v.n + '\n     ' + v.sample.join('\n     ')));
    await page.close();
  }
  // kontrola interních odkazů a kotev
  for (const { pg, links } of out.links) {
    for (const h of links) {
      if (/^(https?:|mailto:|tel:)/.test(h)) continue;
      const [file, hash] = h.split('#');
      const target = (file.split('?')[0]) || pg;
      if (!fs.existsSync(SITE + target)) { ok(`${pg} odkaz ${h}`, false, 'soubor neexistuje'); continue; }
      if (hash && ids[target] && !ids[target].has(hash)) ok(`${pg} kotva ${h}`, false, 'id neexistuje');
    }
  }
  ok('všechny interní odkazy a kotvy existují', !out.checks.some((c) => c.startsWith('FAIL') && / (odkaz|kotva) /.test(c)));

  // 2) horizontální přetečení na všech šířkách
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    for (const pg of PAGES) {
      await page.goto(BASE + pg, { waitUntil: 'load' });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > w) out.overflow.push(`${pg} @${w}: scrollWidth ${sw}`);
    }
    await page.close();
  }
  ok('žádné horizontální přetečení (9 šířek × ' + PAGES.length + ' stránek)', out.overflow.length === 0, out.overflow.join('; '));

  // 3) interakce
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await page.goto(BASE + 'index.html', { waitUntil: 'networkidle' });
  await page.click('[data-menu-toggle]');
  await page.waitForTimeout(400);
  ok('mobilní menu se otevře', await page.isVisible('#mnav'));
  ok('mobilní menu: aria-expanded=true', (await page.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'true');
  ok('mobilní menu: zámek scrollu', await page.evaluate(() => document.body.classList.contains('menu-open')));
  ok('mobilní menu: fokus uvnitř', await page.evaluate(() => document.getElementById('mnav').contains(document.activeElement)));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  ok('mobilní menu: Esc zavře', !(await page.isVisible('#mnav')));
  await page.click('[data-menu-toggle]'); await page.waitForTimeout(300);
  await Promise.all([page.waitForNavigation(), page.click('#mnav a[href="cenik.html"]')]);
  ok('mobilní menu: odkaz vede na ceník', page.url().endsWith('cenik.html'));
  await page.close();

  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(BASE + 'index.html', { waitUntil: 'networkidle' });
  await d.hover('.nav__btn'); await d.waitForTimeout(350);
  ok('podmenu Služby se otevře najetím', await d.evaluate(() => getComputedStyle(document.querySelector('.dd')).visibility === 'visible'));
  await d.mouse.move(700, 600); await d.waitForTimeout(600);
  ok('podmenu se po odjetí zavře', await d.evaluate(() => getComputedStyle(document.querySelector('.dd')).visibility === 'hidden'));
  await d.focus('.nav__btn'); await d.keyboard.press('Enter'); await d.waitForTimeout(350);
  ok('podmenu: klávesnice Enter otevře', (await d.getAttribute('.nav__btn', 'aria-expanded')) === 'true');
  await d.keyboard.press('Escape'); await d.waitForTimeout(100);
  ok('podmenu: Esc zavře a vrátí fokus', (await d.getAttribute('.nav__btn', 'aria-expanded')) === 'false' && await d.evaluate(() => document.activeElement.classList.contains('nav__btn')));
  await d.evaluate(() => window.scrollTo(0, 400)); await d.waitForTimeout(200);
  ok('hlavička po scrollu dostane pozadí', await d.evaluate(() => document.querySelector('[data-header]').classList.contains('is-solid')));
  // energie
  await d.click('#en-hero [data-en-set="vecer"]');
  ok('schéma: přepnutí na Večer', (await d.getAttribute('#en-hero', 'data-scenario')) === 'vecer' && (await d.textContent('#en-hero [data-en-caption]')).includes('baterii'));
  await d.click('#en-hero [data-en-pause]');
  ok('schéma: pauza animace', await d.evaluate(() => document.querySelector('#en-hero').classList.contains('is-paused')));
  // služby náhled
  await d.hover('.svc__item:nth-child(3)'); await d.waitForTimeout(100);
  ok('index služeb: náhled fotky se mění', await d.evaluate(() => document.querySelectorAll('.svc__frame picture')[2].classList.contains('is-active')));
  // FAQ
  await d.goto(BASE + 'faq.html', { waitUntil: 'networkidle' });
  await d.click('#otazka-2 summary'); await d.waitForTimeout(500);
  ok('FAQ: otázka se rozbalí', await d.evaluate(() => document.getElementById('otazka-2').open));
  await d.click('#otazka-2 summary'); await d.waitForTimeout(500);
  ok('FAQ: otázka se sbalí', await d.evaluate(() => !document.getElementById('otazka-2').open));
  await d.click('[data-faq-all]');
  ok('FAQ: rozbalit vše', await d.evaluate(() => [...document.querySelectorAll('.faq__item')].every((x) => x.open)));
  // mapa
  await d.goto(BASE + 'kontakt.html', { waitUntil: 'networkidle' });
  ok('mapa: před souhlasem žádný iframe', (await d.$$('[data-map] iframe')).length === 0);
  await d.click('[data-map-load]');
  ok('mapa: po kliknutí se vloží iframe', (await d.$$('[data-map] iframe')).length === 1);

  // 4) formulář
  const f = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const posts = []; f.on('request', (r) => { if (r.url().includes('odeslat.php')) posts.push(r.method()); });
  await f.goto(BASE + 'kontakt.html?sestava=fve-full#poptavka', { waitUntil: 'networkidle' });
  ok('formulář: předvyplnění sestavy z ceníku', (await f.inputValue('#f-sluzba')) === 'Sestava FVE Full');
  await f.selectOption('#f-sluzba', '');
  await f.click('button[type=submit]');
  ok('formulář: prázdné odeslání neodešle požadavek', posts.length === 0);
  ok('formulář: chyba u jména', await f.isVisible('#f-jmeno-err'));
  ok('formulář: chyba telefon/e-mail', await f.isVisible('[data-contact-error]'));
  ok('formulář: chyba u služby', await f.isVisible('#f-sluzba-err'));
  ok('formulář: fokus na první chybě', await f.evaluate(() => document.activeElement.id === 'f-jmeno'));
  await f.fill('#f-jmeno', 'Jan Testovací');
  await f.fill('#f-email', 'spatny-email');
  await f.click('button[type=submit]');
  ok('formulář: neplatný e-mail zachycen', (await f.textContent('#f-email-err')).includes('e-mail'));
  await f.fill('#f-email', 'jan@example.cz');
  await f.fill('#f-telefon', '724 000 000');
  await f.selectOption('#f-sluzba', 'Sestava FVE 5');
  await f.fill('#f-obec', 'Vejprnice');
  await f.fill('#f-zprava', 'Testovací zpráva z automatického testu. Střecha na jih.');
  await f.waitForTimeout(3200); // ochrana proti robotům (min. 3 s)
  await f.click('button[type=submit]');
  await f.click('button[type=submit]').catch(() => {}); // dvojklik
  await f.waitForSelector('[data-status-ok].is-visible, [data-status-err].is-visible', { timeout: 8000 });
  ok('formulář: úspěšné odeslání zobrazí potvrzení', await f.isVisible('[data-status-ok]'));
  ok('formulář: odeslán právě jeden požadavek (ochrana proti dvojímu odeslání)', posts.length === 1, String(posts.length));
  const mail = MAILFILE && fs.existsSync(MAILFILE) ? fs.readFileSync(MAILFILE, 'utf8') : '';
  if (MAILFILE) ok('formulář: e-mail obsahuje data', mail.includes('Jan Testovací') && mail.includes('Sestava FVE 5') && mail.includes('Reply-To: jan@example.cz'));
  // chyba serveru (příliš rychlé odeslání → server odmítne) — ověření poctivé chybové hlášky
  await f.goto(BASE + 'kontakt.html', { waitUntil: 'networkidle' });
  await f.fill('#f-jmeno', 'Robot Rychlý'); await f.fill('#f-telefon', '724000000'); await f.selectOption('#f-sluzba', 'Jiný dotaz');
  await f.evaluate(() => { document.querySelector('input[name=ts]').value = String(Date.now()); });
  await f.click('button[type=submit]');
  await f.waitForSelector('[data-status-err].is-visible', { timeout: 8000 });
  ok('formulář: chyba serveru se poctivě zobrazí (žádné falešné „odesláno“)', await f.isVisible('[data-status-err]') && !(await f.isVisible('[data-status-ok]')));
  // bez JavaScriptu
  const nj = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const np = await nj.newPage();
  await np.goto(BASE + 'kontakt.html', { waitUntil: 'load' });
  await np.fill('#f-jmeno', 'Bez JS'); await np.fill('#f-telefon', '724111222'); await np.selectOption('#f-sluzba', 'Jiný dotaz');
  await Promise.all([np.waitForNavigation(), np.click('button[type=submit]')]);
  ok('formulář bez JS: návrat na kontakt se stavem', /kontakt\.html\?stav=(odeslano|chyba)/.test(np.url()), np.url());
  await nj.close();

  // 5) přesměrování starých URL
  for (const [from, to] of [['onas.php', '/onas.html'], ['sluzby.php', '/sluzby.html'], ['cenik.php', '/cenik.html'], ['faq.php', '/faq.html'], ['kontakt.php', '/kontakt.html'], ['dotace.php', '/dotace.html'], ['fotovoltaika.php', '/fotovoltaika.html'], ['instalace.php', '/instalace.html'], ['index.php', '/']]) {
    const r = await f.request.get(BASE + from, { maxRedirects: 0 });
    ok(`přesměrování ${from} → ${to}`, r.status() === 301 && (r.headers()['location'] || '').endsWith(to), r.status() + ' ' + r.headers()['location']);
  }
  await browser.close();

  // SEO unikátnost
  const titles = PAGES.map((p) => out[p].title), descs = PAGES.map((p) => out[p].desc);
  ok('unikátní titulky', new Set(titles).size === titles.length);
  ok('unikátní meta description', new Set(descs).size === descs.length);
  console.log(out.checks.join('\n'));
  console.log('\n--- KONZOLE/HTTP ---\n' + (out.console.join('\n') || 'bez chyb'));
  console.log('\n--- AXE ---\n' + (out.axe.join('\n') || 'bez porušení'));
  console.log('\n--- TITULKY ---\n' + PAGES.map((p) => p + ' | ' + out[p].title + ' (' + out[p].title.length + ') | desc ' + (out[p].desc || '').length).join('\n'));
})();
