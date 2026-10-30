/* Elektro Beránek — interakce webu. Bez závislostí, progresivní vylepšení. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('no-js');
  doc.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Hlavička: pevné pozadí po odscrollování ---------- */
  var header = $('[data-header]');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Rozbalovací menu (desktop) ---------- */
  $$('[data-dd]').forEach(function (item) {
    var btn = $('button', item);
    var panel = $('.dd', item);
    var timer;
    function open() { clearTimeout(timer); item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    function closeLater() { clearTimeout(timer); timer = setTimeout(close, 180); }
    btn.addEventListener('click', function () { item.classList.contains('is-open') ? close() : open(); });
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    item.addEventListener('mouseenter', function () { if (hoverable.matches) open(); });
    item.addEventListener('mouseleave', function () { if (hoverable.matches) closeLater(); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && item.classList.contains('is-open')) { close(); btn.focus(); }
      if (e.key === 'ArrowDown' && document.activeElement === btn) {
        e.preventDefault(); open(); var first = $('a', panel); if (first) first.focus();
      }
    });
    item.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) close(); });
    document.addEventListener('click', function (e) { if (!item.contains(e.target)) close(); });
  });

  /* ---------- Mobilní menu ---------- */
  var toggle = $('[data-menu-toggle]');
  var mnav = $('[data-mnav]');
  if (toggle && mnav) {
    var label = $('[data-menu-label]', toggle);
    var lastFocus = null;
    var setOpen = function (state) {
      toggle.setAttribute('aria-expanded', String(state));
      label.textContent = state ? 'Zavřít menu' : 'Otevřít menu';
      header.classList.toggle('is-open', state);
      document.body.classList.toggle('menu-open', state);
      if (state) {
        lastFocus = document.activeElement;
        mnav.hidden = false;
        requestAnimationFrame(function () { mnav.classList.add('is-visible'); });
        var first = $('a', mnav); if (first) first.focus({ preventScroll: true });
      } else {
        mnav.classList.remove('is-visible');
        mnav.hidden = true;
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'Tab') { // zachycení fokusu v menu (včetně tlačítka zavřít)
        var items = [toggle].concat($$('a, button', mnav));
        var i = items.indexOf(document.activeElement);
        if (e.shiftKey && (i <= 0)) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
  }

  /* ---------- Odhalování obsahu při scrollování ---------- */
  var revealEls = $$('.reveal, .reveal-stagger, .process__step');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Index služeb: náhled fotky podle aktivní položky ---------- */
  $$('[data-svc]').forEach(function (wrap) {
    var items = $$('.svc__item', wrap);
    var pics = $$('.svc__frame picture', wrap);
    var cap = $('[data-svc-cap]', wrap);
    function activate(i) {
      items.forEach(function (it, j) { it.classList.toggle('is-active', i === j); });
      pics.forEach(function (p, j) { p.classList.toggle('is-active', i === j); });
      if (cap && items[i]) cap.textContent = items[i].getAttribute('data-cap') || '';
    }
    items.forEach(function (it, i) {
      it.addEventListener('mouseenter', function () { activate(i); });
      it.addEventListener('focusin', function () { activate(i); });
    });
    activate(0);
  });

  /* ---------- Schéma toku energie ---------- */
  var SCN = {
    den: 'Panely vyrábějí nejvíc. Elektřina se nejdřív spotřebuje v domácnosti, přebytky se uloží do baterie a co zbyde, odchází do distribuční sítě.',
    vecer: 'Slunce nesvítí a spotřeba je vysoká. Dům si bere elektřinu uloženou během dne v baterii.',
    mraky: 'Vlastní výroba nestačí. Hybridní elektrárna je napojená na distribuční síť a chybějící elektřinu odebere z ní.'
  };
  var ON = { den: ['pv', 'inv', 'bat', 'house', 'grid'], vecer: ['inv', 'bat', 'house'], mraky: ['pv', 'inv', 'house', 'grid'] };
  $$('[data-energy]').forEach(function (fig) {
    var cap = $('[data-en-caption]', fig);
    var btns = $$('[data-en-set]', fig);
    function set(k) {
      fig.setAttribute('data-scenario', k);
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-en-set') === k)); });
      $$('.en-node', fig).forEach(function (n) {
        var id = (n.getAttribute('class').match(/en-node--(\w+)/) || [])[1];
        n.classList.toggle('is-on', ON[k].indexOf(id) > -1);
      });
      if (cap) cap.textContent = SCN[k];
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-en-set')); }); });
    var pause = $('[data-en-pause]', fig);
    if (pause) pause.addEventListener('click', function () {
      var p = !fig.classList.contains('is-paused');
      fig.classList.toggle('is-paused', p);
      pause.setAttribute('aria-pressed', String(p));
      $('.visually-hidden', pause).textContent = p ? 'Spustit animaci' : 'Pozastavit animaci';
    });
    set(fig.getAttribute('data-scenario') || 'den');
  });

  /* ---------- FAQ: plynulé rozbalení ---------- */
  $$('.faq__item').forEach(function (d) {
    var sum = $('summary', d);
    var body = $('.faq__a', d);
    if (!sum || !body || !d.animate) return;
    sum.addEventListener('click', function (e) {
      if (reduceMotion.matches) return;
      e.preventDefault();
      if (d.open) {
        var h = body.offsetHeight;
        body.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' })
          .onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        var h2 = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: h2 + 'px', opacity: 1 }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    });
  });
  var faqAll = $('[data-faq-all]');
  if (faqAll) faqAll.addEventListener('click', function () {
    var items = $$('.faq__item');
    var openAll = items.some(function (d) { return !d.open; });
    items.forEach(function (d) { d.open = openAll; });
    faqAll.textContent = openAll ? 'Sbalit všechny odpovědi' : 'Rozbalit všechny odpovědi';
    faqAll.setAttribute('aria-pressed', String(openAll));
  });

  /* ---------- Mapa: načtení až po souhlasu (bez cookies třetích stran předem) ---------- */
  $$('[data-map-load]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('[data-map]');
      var iframe = document.createElement('iframe');
      iframe.src = box.getAttribute('data-map-src');
      iframe.title = 'Mapa – provozovna Elektro Beránek, Zahradní 555, Vejprnice';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      box.innerHTML = '';
      box.appendChild(iframe);
      iframe.focus();
    });
  });

  /* ---------- Poptávkový formulář ---------- */
  var form = $('[data-form]');
  if (form) initForm(form);

  function initForm(form) {
    var status = $('[data-form-status]');
    var submit = $('[type="submit"]', form);
    var ts = $('input[name="ts"]', form);
    if (ts) ts.value = String(Date.now());

    // předvyplnění zájmu podle odkazu (např. z ceníku: kontakt.html?sestava=fve-5#poptavka)
    var params = new URLSearchParams(location.search);
    var pre = params.get('sestava') || params.get('sluzba');
    var sel = $('select[name="sluzba"]', form);
    if (pre && sel) {
      var opt = $$('option', sel).filter(function (o) { return o.getAttribute('data-key') === pre; })[0];
      if (opt) sel.value = opt.value;
    }
    // stav po odeslání bez JavaScriptu (návrat z odeslat.php)
    var st = params.get('stav');
    if (st === 'odeslano') showStatus('ok');
    else if (st === 'chyba') showStatus('err');

    var rules = {
      jmeno: function (v) { return v.trim().length >= 2 ? '' : 'Vyplňte prosím jméno a příjmení.'; },
      email: function (v) { return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Zadejte e-mail ve tvaru jmeno@domena.cz.'; },
      telefon: function (v) { var d = v.replace(/[\s()-]/g, ''); return !d || /^(\+|00)?\d{9,14}$/.test(d) ? '' : 'Zadejte telefon, např. 724 118 006.'; },
      sluzba: function (v) { return v ? '' : 'Vyberte, s čím vám můžeme pomoci.'; },
      zprava: function (v) { return v.length <= 3000 ? '' : 'Zpráva může mít nejvýše 3000 znaků.'; }
    };

    function setError(name, msg) {
      var input = form.elements[name];
      if (!input) return;
      var field = input.closest('.field');
      var err = field && $('.field__error span', field);
      if (field) field.classList.toggle('is-invalid', !!msg);
      if (err) err.textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    function validateField(name) {
      var input = form.elements[name];
      if (!input || !rules[name]) return true;
      var msg = rules[name](input.value);
      setError(name, msg);
      return !msg;
    }
    function contactGroup() {
      var ok = form.elements.email.value.trim() || form.elements.telefon.value.trim();
      var g = $('[data-contact-error]', form);
      if (g) g.classList.toggle('is-visible', !ok);
      ['email', 'telefon'].forEach(function (n) {
        var f = form.elements[n].closest('.field');
        if (!ok) { f.classList.add('is-invalid'); form.elements[n].setAttribute('aria-invalid', 'true'); }
      });
      return !!ok;
    }
    Object.keys(rules).forEach(function (n) {
      var el = form.elements[n];
      if (!el) return;
      el.addEventListener('blur', function () { if (el.value) validateField(n); });
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('is-invalid')) {
          validateField(n);
          if ((n === 'email' || n === 'telefon') && (form.elements.email.value.trim() || form.elements.telefon.value.trim())) {
            var g = $('[data-contact-error]', form); if (g) g.classList.remove('is-visible');
            validateField('email'); validateField('telefon');
          }
        }
      });
    });

    function showStatus(type, detail) {
      if (!status) return;
      var ok = $('[data-status-ok]', status.parentNode);
      var err = $('[data-status-err]', status.parentNode);
      ok.classList.toggle('is-visible', type === 'ok');
      err.classList.toggle('is-visible', type === 'err');
      if (type === 'err' && detail) { var d = $('[data-err-detail]', err); if (d) d.textContent = detail; }
      var target = type === 'ok' ? ok : err;
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: false });
    }

    var sending = false;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return; // ochrana proti dvojímu odeslání
      var valid = true;
      Object.keys(rules).forEach(function (n) { if (!validateField(n)) valid = false; });
      if (!contactGroup()) valid = false;
      if (!valid) {
        var firstBad = $('[aria-invalid="true"]', form);
        if (firstBad) firstBad.focus();
        return;
      }
      if (location.protocol === 'file:') {
        showStatus('err', 'Web je otevřený jako soubor z disku, takže formulář nemá kam zprávu odeslat. Na hostingu s PHP bude fungovat.');
        return;
      }
      sending = true;
      submit.classList.add('is-loading');
      submit.setAttribute('aria-disabled', 'true');
      submit.querySelector('[data-label]').textContent = 'Odesílám…';

      var ctrl = 'AbortController' in window ? new AbortController() : null;
      var to = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'fetch' },
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (r) {
        return r.json().catch(function () { return { ok: false, error: 'Server odpověděl neočekávaně (HTTP ' + r.status + ').' }; });
      }).then(function (data) {
        if (data && data.ok === true) {
          form.reset();
          form.hidden = true;
          showStatus('ok');
        } else {
          showStatus('err', (data && data.error) || '');
        }
      }).catch(function () {
        showStatus('err', 'Spojení se serverem se nepodařilo navázat.');
      }).then(function () {
        clearTimeout(to);
        sending = false;
        submit.classList.remove('is-loading');
        submit.removeAttribute('aria-disabled');
        submit.querySelector('[data-label]').textContent = 'Odeslat poptávku';
        if (ts) ts.value = String(Date.now() - 10000);
      });
    });
  }
})();
