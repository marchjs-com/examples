import { Progress, Button, Card } from "march/ui"

// dosya yükleme kuyruğu: her dosyanın kendi çubuğu MB metniyle; tamamlanan yeşile döner, üstteki ince çizgi toplamı gösterir
const FILES = [{ name: "rapor.pdf", size: 12 }, { name: "tatil.mp4", size: 480 }, { name: "logo.svg", size: 1 }]

export function UploadQueue() {
  let $done: number[] = FILES.map(() => 0)
  let $timer = 0
  const start = () => {
    clearInterval($timer)
    $done = FILES.map(() => 0)
    $timer = setInterval(() => {
      $done = $done.map((d, i) => Math.min(FILES[i]!.size, d + Math.max(1, FILES[i]!.size / 8)))
      if ($done.every((d, i) => d >= FILES[i]!.size)) clearInterval($timer)
    }, 300) as unknown as number
  }
  const total = () => FILES.reduce((a, f) => a + f.size, 0)
  const sent = () => $done.reduce((a, d) => a + d, 0)
  return <Card title="Yüklemeler">
    <Progress variant="line" value={sent} max={total()} ariaLabel="Toplam yükleme" smooth={false} />
    <div sx={{ flex: "col", gap: 2 }}>
      {FILES.map((f, i) => <Progress label={f.name} value={() => $done[i]} max={f.size} size="sm"
        tone={() => ($done[i]! >= f.size ? "success" : "primary")}
        showValue={(_p: number, mb: number) => `${Math.round(mb)} / ${f.size} MB`} />)}
    </div>
    <Button size="sm" variant="primary" on:click={start}>Yüklemeyi başlat</Button>
  </Card>
}
