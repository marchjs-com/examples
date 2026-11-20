import { Roadmap } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"
import { flag, sparkles, star } from "march/icons"

// Roadmap'in bütün özellikleri bir arada: girdiler (time, title, body, status, icon), rozetler (badges: açık, kendi
// rozetin ya da yok), kaydırdıkça dolma (scroll), çizgi (rail), durum metinleri (labels), giriş (reveal) ve sınıf (class)
type RoadmapStatus = "done" | "now" | "next"
const EMOJI: Record<RoadmapStatus, string> = { done: "✅", now: "⏳", next: "🗓️" }

export function RoadmapLab() {
  let $badges: string = "on"
  let $rail = true
  let $scroll = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Rozetler" options={[{ value: "on", label: "rozet" }, { value: "own", label: "kendi rozetim" }, { value: "off", label: "rozetsiz" }]} bind:value={$badges} />
        <Toggle label="Çizgi" bind:value={$rail} />
        <Toggle label="Kaydırdıkça dolsun" bind:value={$scroll} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince yol haritası yeniden çizilir
      const badges = $badges, rail = $rail, scroll = $scroll
      return <Roadmap class="lab-rm" rail={rail} scroll={scroll} reveal={false}
        badges={badges === "off" ? false : badges === "own" ? (s: RoadmapStatus, text: unknown) => <span class="lab-badge">{EMOJI[s]} {text}</span> : true}
        labels={{ done: "Yayında", now: "Yapılıyor", next: "Sırada" }}
        items={[
          { time: "Bahar", title: "Tanışma yemekleri", body: "Aynı masada yeni insanlar.", status: "done", icon: flag },
          { time: "Yaz", title: "Bilet satışı", body: "Kontenjan ve ödeme tek yerde.", status: "done" },
          { time: "Sonbahar", title: "Yeni şehirler", body: "Her ilde etkinlik.", status: "now", icon: sparkles },
          { time: "Kış", title: "Topluluk ödülleri", status: "next", icon: star },
        ]} />
    }}
  </div>
}
