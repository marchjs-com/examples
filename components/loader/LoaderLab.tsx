import { Loader, Card, Button } from "march/ui"
import { Icon, hourglass } from "march/icons"

// Loader'ın bütün özellikleri bir arada: text (metin ya da erişimci), label (yalnız okunan ad), spinner (hazır,
// kendi düğümün, yok), color, fade, overlay ve class
// bir başlık ve altında içerik
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function LoaderLab() {
  let $pct = 30
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    <Box title="Görünür metin"><Loader text="Panolar hazırlanıyor…" class="lab-text" /></Box>
    <Box title="Yalnız okunan ad"><Loader label="Kullanıcılar açılıyor" class="lab-label" fade={false} /></Box>
    <Box title="Metin erişimcisi, renk">
      <Loader text={() => `%${$pct} tamam`} color="success" class="lab-pct" />
      <Button size="sm" on:click={() => $pct = $pct >= 100 ? 0 : $pct + 10}>İlerlet</Button>
    </Box>
    <Box title="Kendi işaretim"><Loader spinner={<Icon of={hourglass} size="xl" /> as Node} text="Kum saati" /></Box>
    <Box title="Halkasız"><Loader spinner={false} text="Bir saniye…" class="lab-bare" /></Box>
    <Box title="Perde (overlay)">
      <div style={{ position: "relative", width: "12rem", height: "6rem" }}>
        <p>Altta kalan içerik</p>
        <Loader overlay text="Kaydediliyor" class="lab-overlay" />
      </div>
    </Box>
    <Card m:theme="night"><Loader text="Koyu zeminde" color="brand-purple" /></Card>
  </div>
}
