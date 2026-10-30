// Interaktivní schéma toku energie v hybridní fotovoltaické elektrárně.
// Popisy scénářů vycházejí z textu původní stránky fotovoltaika.php.
import { icon } from './icons.mjs';

const node = (id, x, y, ico, label, { lx = 0, ly = 52, anchor = 'middle' } = {}) => `
    <g class="en-node en-node--${id}" transform="translate(${x} ${y})">
      <path class="en-node__box" d="M-30 -30H22L30 -22V30H-30Z"/>
      <use href="#i-${ico}" x="-14" y="-14" width="28" height="28" class="en-node__ico"/>
      <text class="en-node__label" x="${lx}" y="${ly}" text-anchor="${anchor}">${label}</text>
    </g>`;

export const SCENARIOS = {
  den: {
    label: 'Poledne',
    text: 'Panely vyrábějí nejvíc. Elektřina se nejdřív spotřebuje v domácnosti, přebytky se uloží do baterie a co zbyde, odchází do distribuční sítě.',
  },
  vecer: {
    label: 'Večer',
    text: 'Slunce nesvítí a spotřeba je vysoká. Dům si bere elektřinu uloženou během dne v baterii.',
  },
  mraky: {
    label: 'Málo slunce',
    text: 'Vlastní výroba nestačí. Hybridní elektrárna je napojená na distribuční síť a chybějící elektřinu odebere z ní.',
  },
};

export function energyDiagram({ id = 'en', compact = false, scenario = 'den', title = 'Schéma hybridní fotovoltaické elektrárny' } = {}) {
  const btns = Object.entries(SCENARIOS).map(([k, v]) =>
    `<button type="button" class="en-btn" data-en-set="${k}" aria-pressed="${k === scenario}">${v.label}</button>`).join('');
  return `
<figure class="energy${compact ? ' energy--compact' : ''}" data-energy data-scenario="${scenario}" id="${id}">
  <div class="energy__bar">
    <p class="mono energy__title">${compact ? 'Hybridní FVE — jak to funguje' : 'Tok energie'}</p>
    <button type="button" class="energy__pause" data-en-pause aria-pressed="false"><span class="visually-hidden">Pozastavit animaci</span><span class="energy__pause-ico" aria-hidden="true"></span></button>
  </div>
  <svg class="energy__svg" viewBox="0 0 420 330" role="img" aria-labelledby="${id}-t ${id}-d">
    <title id="${id}-t">${title}</title>
    <desc id="${id}-d">Slunce dopadá na fotovoltaické panely, energie vede do hybridního střídače a z něj do domu, do baterie nebo do distribuční sítě.</desc>
    <g class="en-tracks">
      <path d="M104 62H176"/>
      <path d="M210 94V135"/>
      <path d="M180 167H70V233"/>
      <path d="M210 199V233"/>
      <path d="M240 167H350V233"/>
    </g>
    <g class="en-flows">
      <path class="flow flow--sun" d="M104 62H176"/>
      <path class="flow flow--pv" d="M210 94V135"/>
      <path class="flow flow--bat" d="M180 167H70V233"/>
      <path class="flow flow--house" d="M210 199V233"/>
      <path class="flow flow--grid" d="M240 167H350V233"/>
    </g>
    <g class="en-sun" transform="translate(70 62)">
      <circle class="en-sun__glow" r="34"/>
      <circle class="en-sun__core" r="15"/>
      <g class="en-sun__rays"><path d="M0-25v-7M0 25v7M-25 0h-7M25 0h7M-18-18l-5-5M18 18l5 5M-18 18l-5 5M18-18l5-5"/></g>
      <text class="en-node__label" x="0" y="52" text-anchor="middle">Slunce</text>
    </g>
    ${node('pv', 210, 62, 'panel', 'FV panely', { lx: 42, ly: 4, anchor: 'start' })}
    ${node('inv', 210, 167, 'inverter', 'Hybridní střídač', { lx: 42, ly: -12, anchor: 'start' })}
    ${node('bat', 70, 265, 'battery', 'Baterie')}
    ${node('house', 210, 265, 'house', 'Dům')}
    ${node('grid', 350, 265, 'grid', 'Distribuční síť')}
  </svg>
  <div class="energy__ui">
    <div class="en-switch" role="group" aria-label="Vyberte situaci">${btns}</div>
    <p class="energy__caption" aria-live="polite" data-en-caption>${SCENARIOS[scenario].text}</p>
  </div>
</figure>`;
}

export { icon };
