import { EasingCurveEditor, Button, Card, toast } from "march/ui"

// bir tasarımcının menü açılış eğrisi ayarı: ekibin üç hazır eğrisi, ölçekle önizleme; bitince CSS satırını kopyalar
const teamCurves = [
  { name: "yumusak", label: "Yumuşak", value: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  { name: "yayli", label: "Yaylı", value: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  { name: "keskin", label: "Keskin", value: [0.7, 0, 0.3, 1] as [number, number, number, number] },
]

export function MenuMotionTuner() {
  let $curve = "cubic-bezier(.25, .1, .25, 1)"
  let $ms = 240
  const line = () => `transition: transform ${$ms}ms ${$curve};`
  return <Card title="Menü açılış hareketi" subtitle="Tasarım sistemi › Hareket">
    <div sx={{ flex: "col", gap: 3 }}>
      <EasingCurveEditor bind:value={$curve} presets={teamCurves} preview="scale" duration={$ms} name="menu-ac" nameNote={false} />
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {[160, 240, 320].map((ms) => <Button size="sm" variant={$ms === ms ? "primary" : "secondary"} on:click={() => $ms = ms}>{`${ms} ms`}</Button>)}
        <Button size="sm" variant="ghost" on:click={() => toast(`Kopyalandı: ${line()}`)}>CSS satırını kopyala</Button>
      </div>
      <code sx={{ text: "xs" }}>{line}</code>
    </div>
  </Card>
}
