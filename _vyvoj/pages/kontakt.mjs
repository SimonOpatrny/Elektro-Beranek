import { page, icon, crumbs, FIRM, LOCAL_BUSINESS } from '../lib/layout.mjs';

const c = crumbs([['Úvod', 'index.html'], ['Kontakt', 'kontakt.html']]);
const p = FIRM.provozovna, s = FIRM.sidlo;
// Původní mapa Google (z kontakt.php) — načítá se až po kliknutí návštěvníka
const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34542.544906020215!2d13.246008297418838!3d49.738345412837326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470aed6eafa1ca83%3A0x6fe4f8bada57f44d!2sZahradn%C3%AD%20555%2C%20330%2027%20Vejprnice!5e0!3m2!1scs!2scz!4v1642779585552!5m2!1scs!2scz';
const GMAPS = `https://www.google.com/maps/search/?api=1&query=${FIRM.geo.lat}%2C${FIRM.geo.lng}`;
const MAPYCZ = `https://mapy.cz/zakladni?source=coor&id=${FIRM.geo.lng}%2C${FIRM.geo.lat}&x=${FIRM.geo.lng}&y=${FIRM.geo.lat}&z=17`;

const opts = [
  ['', 'Vyberte možnost', ''],
  ['Fotovoltaická elektrárna na klíč', 'Fotovoltaická elektrárna na klíč', 'fve'],
  ['Sestava FVE 5', 'Sestava FVE 5 (5,4 kWp)', 'fve-5'],
  ['Sestava FVE 10-1', 'Sestava FVE 10-1 (10 kWp)', 'fve-10-1'],
  ['Sestava FVE Full', 'Sestava FVE Full (s nabíjecí stanicí)', 'fve-full'],
  ['Sestava FVE Solax', 'Sestava FVE Solax (s nabíjecí stanicí)', 'fve-solax'],
  ['Revize nebo servis elektrárny', 'Revize, servis nebo oprava elektrárny', 'servis'],
  ['Vyřízení dotace NZÚ', 'Vyřízení dotace NZÚ', 'dotace'],
  ['Montáž svépomocí s revizí', 'Montáž svépomocí s naší revizí a nastavením', 'svepomoci'],
  ['Elektroinstalace a elektromontáže', 'Elektroinstalace a elektromontáže', 'elektro'],
  ['Jiný dotaz', 'Jiný dotaz', 'jine'],
];

const err = (id) => `<p class="field__error" id="${id}-err">${icon('alert')}<span></span></p>`;

const body = `
<section class="phero" aria-labelledby="page-title">
  <div class="container">
    ${c.html}
    <div class="phero__grid">
      <div class="phero__copy">
        <p class="eyebrow">Kontakt</p>
        <h1 id="page-title" class="phero__title">Ozvěte se nám</h1>
        <p class="lead phero__lead">Zavolejte, napište, nebo vyplňte krátkou poptávku. Domluvíme se na prohlídce a připravíme nabídku na míru vašemu objektu.</p>
      </div>
      <div class="contact-quick">
        <a class="contact-big" href="${FIRM.phoneHref}"><span class="mono">${icon('phone')}Telefon</span><strong class="num">${FIRM.phone}</strong></a>
        <a class="contact-big" href="mailto:${FIRM.email}"><span class="mono">${icon('mail')}E-mail</span><strong>${FIRM.email}</strong></a>
      </div>
    </div>
  </div>
</section>

<section class="section theme-light" aria-labelledby="form-title">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow">Kontaktní informace</p>
      <h2 id="info-title" class="h3">${FIRM.owner} — Elektro Beránek</h2>
      <dl class="info-list" aria-labelledby="info-title">
        <div><dt>Provozovna</dt><dd>${p.street}<br>${p.zip} ${p.city}<br>${p.region}, ČR</dd></div>
        <div><dt>Adresa sídla</dt><dd>${s.street}<br>${s.zip} ${s.city}<br>${s.region}</dd></div>
        <div><dt>Pracujeme</dt><dd class="hours">${FIRM.hours.map(([d, h]) => `<div><span>${d}</span><span class="num">${h}</span></div>`).join('')}</dd></div>
        <div><dt>Telefon</dt><dd><a class="link" href="${FIRM.phoneHref}">${FIRM.phone}</a></dd></div>
        <div><dt>E-mail</dt><dd><a class="link" href="mailto:${FIRM.email}">${FIRM.email}</a></dd></div>
        <div><dt>IČO / DIČ</dt><dd>${FIRM.ico} / ${FIRM.dic}</dd></div>
        <div><dt>NZÚ</dt><dd><a class="link" href="${FIRM.nzu}" target="_blank" rel="noopener">Registrovaný dodavatel</a></dd></div>
        <div><dt>Sledujte nás</dt><dd class="inline-links"><a class="link" href="${FIRM.facebook}" target="_blank" rel="noopener">Facebook</a><a class="link" href="${FIRM.instagram}" target="_blank" rel="noopener">Instagram</a></dd></div>
      </dl>
    </div>

    <div class="form-card" id="poptavka">
      <div class="form-card__head">
        <p class="eyebrow">Nezávazná poptávka</p>
        <h2 id="form-title" class="h2">Napište nám, co plánujete</h2>
        <p class="muted">Pole označená hvězdičkou jsou povinná. Stačí pár řádků, podrobnosti probereme po telefonu nebo na místě.</p>
      </div>

      <div class="form-status form-status--ok" data-status-ok role="status">
        ${icon('check')}
        <div><h3>Děkujeme, poptávka je odeslaná.</h3><p>Zprávu jsme přijali a ozveme se vám. Pokud spěcháte, zavolejte na <a href="${FIRM.phoneHref}">${FIRM.phone}</a>.</p></div>
      </div>
      <div class="form-status form-status--err" data-status-err role="alert">
        ${icon('alert')}
        <div><h3>Poptávku se nepodařilo odeslat.</h3><p><span data-err-detail></span> Zkuste to prosím znovu, nebo nám zavolejte na <a href="${FIRM.phoneHref}">${FIRM.phone}</a> či napište na <a href="mailto:${FIRM.email}">${FIRM.email}</a>.</p></div>
      </div>

      <form class="form" action="odeslat.php" method="post" novalidate data-form data-form-status>
        <div class="field">
          <label class="field__label" for="f-jmeno">Jméno a příjmení *</label>
          <input class="input" id="f-jmeno" name="jmeno" type="text" autocomplete="name" required minlength="2" maxlength="120" aria-describedby="f-jmeno-err">
          ${err('f-jmeno')}
        </div>
        <div class="form__row form__row--2">
          <div class="field">
            <label class="field__label" for="f-telefon">Telefon</label>
            <input class="input" id="f-telefon" name="telefon" type="tel" autocomplete="tel" inputmode="tel" maxlength="30" placeholder="724 118 006" aria-describedby="f-kontakt-hint f-telefon-err">
            ${err('f-telefon')}
          </div>
          <div class="field">
            <label class="field__label" for="f-email">E-mail</label>
            <input class="input" id="f-email" name="email" type="email" autocomplete="email" maxlength="160" placeholder="jmeno@email.cz" aria-describedby="f-kontakt-hint f-email-err">
            ${err('f-email')}
          </div>
        </div>
        <p class="field__hint" id="f-kontakt-hint">Vyplňte prosím telefon, e-mail, nebo obojí. *</p>
        <p class="field__error form__group-error" data-contact-error role="alert">${icon('alert')}<span>Vyplňte prosím telefon nebo e-mail, abychom vás mohli kontaktovat.</span></p>
        <div class="form__row form__row--2">
          <div class="field">
            <label class="field__label" for="f-sluzba">S čím můžeme pomoci? *</label>
            <select class="select" id="f-sluzba" name="sluzba" required aria-describedby="f-sluzba-err">
              ${opts.map(([v, t, k]) => `<option value="${v}"${k ? ` data-key="${k}"` : ''}>${t}</option>`).join('')}
            </select>
            ${err('f-sluzba')}
          </div>
          <div class="field">
            <label class="field__label" for="f-obec">Obec, kde se má instalovat <span class="opt">nepovinné</span></label>
            <input class="input" id="f-obec" name="obec" type="text" autocomplete="address-level2" maxlength="120">
          </div>
        </div>
        <div class="field">
          <label class="field__label" for="f-zprava">Zpráva <span class="opt">nepovinné</span></label>
          <textarea class="textarea" id="f-zprava" name="zprava" rows="5" maxlength="3000" placeholder="Např. typ a orientace střechy, přibližná roční spotřeba, kdy se vám hodí prohlídka…" aria-describedby="f-zprava-err"></textarea>
          ${err('f-zprava')}
        </div>
        <div class="hp" aria-hidden="true">
          <label for="f-web">Tuto položku nevyplňujte</label>
          <input id="f-web" name="web" type="text" tabindex="-1" autocomplete="off">
        </div>
        <input type="hidden" name="ts" value="">
        <p class="form__legal">Odesláním poptávky nám předáte uvedené údaje, abychom vás mohli kontaktovat a připravit nabídku. Podrobnosti najdete v <a class="link" href="ochrana-osobnich-udaju.html">informacích o zpracování osobních údajů</a>.</p>
        <div class="form__submit">
          <button class="btn btn--primary btn--lg" type="submit"><span data-label>Odeslat poptávku</span>${icon('arrow')}${icon('spinner', 'spin')}</button>
          <p class="muted small">Nebo volejte <a class="link" href="${FIRM.phoneHref}">${FIRM.phone}</a></p>
        </div>
      </form>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="mapa-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Kde nás najdete</p>
        <h2 id="mapa-title">Provozovna ve Vejprnicích</h2>
      </div>
      <div class="btn-row">
        <a class="btn btn--ghost" href="${MAPYCZ}" target="_blank" rel="noopener">${icon('map')}Otevřít v Mapy.cz</a>
        <a class="btn btn--ghost" href="${GMAPS}" target="_blank" rel="noopener">${icon('pin')}Navigovat (Google)</a>
      </div>
    </div>
    <div class="map" data-map data-map-src="${MAP_SRC}">
      <div class="map__placeholder">
        <p class="map__coords mono">49.734636, 13.278857</p>
        <svg class="ico map__pin" aria-hidden="true"><use href="#i-pin"/></svg>
        <p class="map__addr">${p.street}, ${p.zip} ${p.city}</p>
        <p class="map__note">Interaktivní mapu od Googlu načteme až na vaše přání. Po načtení může Google ukládat soubory cookies podle svých podmínek.</p>
        <div class="btn-row"><button class="btn btn--primary" type="button" data-map-load>Načíst mapu${icon('arrow')}</button></div>
      </div>
    </div>
  </div>
</section>
`;

export default {
  file: 'kontakt.html',
  html: page({
    active: 'kontakt', path: 'kontakt.html',
    title: 'Kontakt – Elektro Beránek, Vejprnice | Solární elektrárny',
    description: 'Kontakt na Elektro Beránek: tel. +420 724 118 006, info@elektroberanek.cz. Provozovna Zahradní 555, Vejprnice. Nezávazná poptávka fotovoltaické elektrárny.',
    jsonld: [LOCAL_BUSINESS, c.ld],
    body,
  }),
};
