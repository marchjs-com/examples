import { LiveStatus, Button, Card, Kbd } from "march/ui"

// LiveStatus'un bütün özellikleri bir arada: text (metin ya da erişimci), children, visible (görünür / yalnız
// okunur), politeness, as (span / div / p), help (metin ya da düğüm) + helpId + helpClass, class ve diğer öznitelikler
export function LiveStatusLab() {
  let $n = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $n++}>Bir tane ekle</Button>
      <Button size="sm" variant="ghost" on:click={() => $n = 0}>Sıfırla</Button>
    </div>
    <LiveStatus text={() => `${$n} öğe eklendi`} class="lab-count" id="lab-count" data-kind="sayaç" />
    <LiveStatus as="div" politeness="assertive">Children ile söylenen, araya giren durum</LiveStatus>
    <LiveStatus as="p" visible={false} text={() => `Gizli: ${$n}`} class="lab-hidden" />
    <LiveStatus help={<span>Taşımak için <Kbd keys="space" /> tuşuna basın</span>} helpId="lab-help" helpClass="lab-help"
      text="Yardım satırı önce gelir" />
    <Card m:theme="night">
      <LiveStatus help="Koyu zeminde yardım" text={() => ($n > 2 ? "Çok eklendi!" : "Az eklendi")} />
    </Card>
  </div>
}
