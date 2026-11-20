import { Progress, Button, Card } from "march/ui"

// Progress'in bütün özellikleri bir arada: value + max, tone, color, colors (brand / liste / single) + paint,
// label, ariaLabel, showValue (yüzde ya da kendi metnin), valueText, size (ad ya da piksel), variant (bar / line),
// orientation, track, inverse, smooth, decorative, fillRef, segments + duration + paused + run + onDone, class
const tones = ["primary", "success", "warn", "danger", "info"] as const

// bir başlık ve altında içerik
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ProgressLab() {
  let $v = 40
  let $story = 0
  let $paused = false
  let $done = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $v = Math.min(100, $v + 20)}>+20</Button>
      <Button size="sm" variant="ghost" on:click={() => $v = 0}>Sıfırla</Button>
    </div>
    <Box title="Tonlar">{tones.map((t) => <Progress value={() => $v} tone={t} label={`Ton ${t}`} showValue size="sm" />)}</Box>
    <Box title="Renkler ve dizilim">
      <Progress value={70} color="brand-purple" label="Tek renk (color)" />
      <Progress value={70} colors="brand" paint="segments" label="Marka renkleri, parçalı" />
      <Progress value={70} colors={["brand-blue", "brand-green"]} paint="cycle" label="İki renk, akan" />
      <Progress value={70} colors="single" label="Tek renk (single)" />
    </Box>
    <Box title="Değer metni">
      <Progress value={() => $v * 4.8} max={480} label="Video" showValue={(p: number, mb: number) => `${Math.round(mb)} / 480 MB (%${p})`}
        valueText={(v: number, m: number) => `${Math.round(v)} MB / ${m} MB`} class="lab-video" />
      <Progress label="Hazırlanıyor (belirsiz)" />
      <Progress value={50} ariaLabel="Görünmez ad" size={14} track={false} smooth={false} />
    </Box>
    <Box title="İnce çizgi, dikey, süs">
      <div sx={{ flex: ["row", "center"], gap: 3 }}>
        <Progress variant="line" value={() => $v} decorative class="lab-line" />
        <Progress orientation="vertical" value={() => $v} size="lg" ariaLabel="Dikey" class="lab-vertical" />
        <Progress fillRef={(el: HTMLElement) => { el.dataset.driven = "yes" }} value={30} ariaLabel="Sürülen dolgu" />
      </div>
    </Box>
    <Box title="Parçalar (hikâye)">
      <Progress segments={4} value={() => $story} duration={1500} paused={() => $paused} run={() => $story}
        onDone={() => { $done++; $story = ($story + 1) % 4 }} ariaLabel="Hikâye" valueText={(i: number, m: number) => `${i + 1} / ${m}`} class="lab-story" />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <Button size="sm" on:click={() => $paused = !$paused}>{() => ($paused ? "Sürdür" : "Duraklat")}</Button>
        <span sx={{ color: "muted" }}>{() => `Biten parça: ${$done}`}</span>
      </div>
      <Progress segments={5} value={2.5} label="Adımlar (2,5 / 5)" />
    </Box>
    <Card m:theme="night">
      <Progress value={() => $v} inverse label="Medya üzerinde (inverse)" showValue />
    </Card>
  </div>
}
