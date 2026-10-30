// Česká typografie: nezlomitelné mezery po jednopísmenných předložkách/spojkách a mezi číslem a jednotkou.
export function czTypo(html) {
  return html.replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)|([^<]+)/g, (m, tag, text) => {
    if (tag) return tag;
    return text
      .replace(/(^|[\s(„>])([ksvzouaiKSVZOUAI])\s+(?=\S)/g, '$1$2 ')
      .replace(/(\d)\s(?=\d{3}(?!\d))/g, '$1 ')
      .replace(/(\d)\s(?=(Kč|kWp|kWh|kW|Wp|let|roky|dnů|dní|měsíců|%|ks|cyklů|procent)\b)/g, '$1 ')
      .replace(/(\d)\s(?=[–-]\s?\d)/g, '$1 ')
      .replace(/\b(č\.|tel\.|max\.|cca|např\.|Po|So|Ne)\s/g, '$1 ');
  });
}
