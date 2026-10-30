// Sestaví statické HTML stránky do kořene webu (o složku výš). Spuštění: node build.mjs
import { writeFileSync, readdirSync } from 'node:fs';
import { czTypo } from './lib/typo.mjs';
const dir = new URL('./pages/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.mjs'));
for (const f of files) {
  const mod = (await import(new URL(f, dir) + '?v=' + Date.now())).default;
  const list = Array.isArray(mod) ? mod : [mod];
  for (const p of list) {
    writeFileSync(new URL('../' + p.file, import.meta.url), czTypo(p.html));
    console.log('✓', p.file, (p.html.length / 1024).toFixed(1) + ' kB');
  }
}
