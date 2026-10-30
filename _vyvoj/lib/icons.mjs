// Ikonová sada — vlastní liniové ikony 24×24, tah 1.6 px, barva přes currentColor.
const s = (id, body, vb = '0 0 24 24') => `<symbol id="i-${id}" viewBox="${vb}">${body}</symbol>`;

export const SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" class="sprite" aria-hidden="true" focusable="false"><defs>
${s('arrow', '<path d="M4 12h15M13 6l6 6-6 6"/>')}
${s('arrow-ne', '<path d="M7 17 17 7M9 7h8v8"/>')}
${s('phone', '<path d="M5.5 3.5h3l1.6 4.4-2.2 1.5a11.5 11.5 0 0 0 6.7 6.7l1.5-2.2 4.4 1.6v3a2 2 0 0 1-2.1 2A16.6 16.6 0 0 1 3.5 5.6a2 2 0 0 1 2-2.1Z"/>')}
${s('mail', '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>')}
${s('pin', '<path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.8" r="2.4"/>')}
${s('clock', '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>')}
${s('check', '<path d="m4.5 12.5 4.6 4.6L19.5 6.7"/>')}
${s('plus', '<path d="M12 5v14M5 12h14"/>')}
${s('menu', '<path d="M3.5 7h17M3.5 12h17M3.5 17h11"/>')}
${s('close', '<path d="M6 6l12 12M18 6 6 18"/>')}
${s('chevron', '<path d="m6 9 6 6 6-6"/>')}
${s('sun', '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>')}
${s('panel', '<path d="M5.5 4h13l2.5 11H3L5.5 4Z"/><path d="M4.2 9.5h15.6M9.6 4 8.7 15M14.4 4l.9 11M12 15v5M8 20h8"/>')}
${s('inverter', '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M7.5 9c1.1-2 2.2-2 3.3 0s2.2 2 3.3 0 2.2-2 2.4 0"/><path d="M8 15h8M8 18h4"/>')}
${s('battery', '<rect x="6" y="4" width="12" height="17" rx="1.5"/><path d="M10 2.5h4M12.8 8.5 10.5 12.6h3l-2.3 4"/>')}
${s('house', '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>')}
${s('grid', '<path d="M12 2.5 8 21.5M12 2.5l4 19M6 7h12M7 11.5h10M5 7l-1.5 3M19 7l1.5 3M9.3 15.5l5.4 3.5M14.7 15.5 9.3 19"/>')}
${s('bolt', '<path d="M13.5 2.5 5 13.5h6L10.5 21.5 19 10.5h-6l.5-8Z"/>')}
${s('doc', '<path d="M6 2.5h8l4.5 4.5v14.5H6z"/><path d="M14 2.5V7h4.5M9 12h6M9 15.5h6M9 9h2"/>')}
${s('wrench', '<path d="M14.6 6.3a4 4 0 0 0 5.1 5.1L21 12.7a6 6 0 0 1-7.9 1.6L6.4 21a2 2 0 0 1-2.9-2.9l6.7-6.7A6 6 0 0 1 11.8 3.5l1.3 1.3a4 4 0 0 0 1.5 1.5Z"/>')}
${s('shield', '<path d="M12 2.8 19.5 5.5v6c0 4.6-3.2 8.2-7.5 9.7-4.3-1.5-7.5-5.1-7.5-9.7v-6L12 2.8Z"/><path d="m8.6 12 2.4 2.4 4.6-4.6"/>')}
${s('pen', '<path d="M4 20h4.5L19.3 9.2a2.2 2.2 0 0 0-3.1-3.1L5.4 16.9 4 20Z"/><path d="m14.5 7.8 3.1 3.1"/>')}
${s('calendar', '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>')}
${s('id', '<rect x="3" y="5" width="18" height="14" rx="1.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.8 16c.5-1.5 1.5-2.2 2.7-2.2s2.2.7 2.7 2.2M14 10h4M14 13.5h3"/>')}
${s('map', '<path d="m3.5 6 5.5-2.5 6 2.5 5.5-2.5v14.5L15 20.5 9 18l-5.5 2.5z"/><path d="M9 3.5V18M15 6v14.5"/>')}
${s('user', '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1-3.7 4-5.5 7.5-5.5s6.5 1.8 7.5 5.5"/>')}
${s('team', '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 19.5c.8-3.1 3.2-4.6 6-4.6s5.2 1.5 6 4.6"/><path d="M15.5 5.6a3.2 3.2 0 0 1 0 6M17.5 15.2c1.8.6 3 1.9 3.5 4.3"/>')}
${s('drop', '<path d="M12 3c3.5 4.4 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.6 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>')}
${s('leaf', '<path d="M5 19C5 10 10.5 4.5 20 4.5 20 14 14.5 19.5 5.5 19.5"/><path d="M5 19.5 13 11.5"/>')}
${s('coins', '<ellipse cx="9" cy="7" rx="5.5" ry="2.5"/><path d="M3.5 7v4.5C3.5 12.9 6 14 9 14M3.5 11.5V16c0 1.4 2.5 2.5 5.5 2.5"/><ellipse cx="15" cy="13" rx="5.5" ry="2.5"/><path d="M9.5 13v4.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V13"/>')}
${s('trend', '<path d="M3.5 17.5 9.5 11.5l4 4 7-7.5"/><path d="M15 8h5.5v5.5"/>')}
${s('home-bolt', '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="m12.8 11-2.3 3.6h3L11.2 18"/>')}
${s('tool-hand', '<path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10M10 9.5v-5a1.5 1.5 0 0 1 3 0V10M13 9.5V6a1.5 1.5 0 0 1 3 0v5.5M16 10a1.5 1.5 0 0 1 3 0v3.5c0 4-2.6 7-6.5 7-2.7 0-4.3-1.3-5.7-3.4L4 13.2a1.5 1.5 0 0 1 2.4-1.7L7 12.3"/>')}
${s('facebook', '<path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.6 1.6-1.6H17V4.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.9v2.4H8.5v3H11V21"/>')}
${s('instagram', '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.9"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>')}
${s('external', '<path d="M14 4h6v6M20 4l-8.5 8.5M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5"/>')}
${s('spinner', '<path d="M12 3a9 9 0 1 0 9 9"/>')}
${s('alert', '<path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path d="M12 10v4.5M12 17.2v.3"/>')}
</defs></svg>`;

export const icon = (name, cls = '') =>
  `<svg class="ico${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
