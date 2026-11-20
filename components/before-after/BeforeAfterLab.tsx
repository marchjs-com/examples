import { BeforeAfter } from "march/landing"
import { Segmented, Toggle, Button, Card } from "march/ui"
import { Icon, sparkles } from "march/icons"

// BeforeAfter'ın bütün özellikleri bir arada: iki katman, köşe etiketleri, konum (value) ve onChange, yön, imleci
// izleme, ilk salınım, en-boy oranı, tutamacın adı, tutamak (oklar / yalnız çizgi / kendi düğümün), klavye adımı,
// ekran okuyucu metni (valueText) ve sınıf
const Panel = (p: { text: string; tone: string }) =>
  <div sx={{ flex: ["col", "center"], p: 4 }} style={{ height: "100%", background: p.tone }}><strong sx={{ text: "xl" }}>{p.text}</strong></div>

export function BeforeAfterLab() {
  let $pos = 30
  let $orientation: "horizontal" | "vertical" = "horizontal"
  let $follow = false
  let $grip: "oklar" | "çizgi" | "simge" = "oklar"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Yön" options={[{ value: "horizontal", label: "yatay" }, { value: "vertical", label: "dikey" }]} bind:value={$orientation} />
        <Segmented aria-label="Tutamak" options={["oklar", "çizgi", "simge"]} bind:value={$grip} />
        <Toggle label="İmleci izle" bind:value={$follow} />
        <Button variant="secondary" on:click={() => $pos = 50}>Ortala</Button>
      </div>
    </Card>
    {() => { const orientation = $orientation, follow = $follow, grip: string = $grip; return <BeforeAfter class="lab-ba" orientation={orientation} follow={follow} hint={false} ratio="16 / 9"
      grip={grip === "çizgi" ? false : grip === "simge" ? <Icon of={sparkles} /> as Node : true}
      value={() => $pos} onChange={(v: number) => $pos = v} step={5}
      label="Gece ve gündüz" valueText={(v: number) => `%${v} gece`}
      beforeLabel="Gece" afterLabel="Gündüz"
      before={<Panel text="🌙 Gece" tone="#1f2440" />} after={<Panel text="☀️ Gündüz" tone="#ffe08a" />} /> }}
    <p sx={{ color: "muted" }} class="lab-pos">Konum: {$pos}</p>
  </div>
}
