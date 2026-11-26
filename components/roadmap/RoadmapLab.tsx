// RoadmapLab: the full-featured Roadmap example; it uses every prop at least once.
//
// Props shown here: items (time, title, body, status, icon), badges (on, your own, or off), scroll, rail, labels,
// reveal and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// RoadmapLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Roadmap } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"
import { flag, sparkles, star } from "march/icons"

// The three statuses of an entry.
type RoadmapStatus = "done" | "now" | "next"
// A mark for each status, used by our own badge.
const EMOJI: Record<RoadmapStatus, string> = { done: "✅", now: "⏳", next: "🗓️" }

export function RoadmapLab() {
  // The badge mode: "on" (built-in), "own" (our function) or "off".
  let $badges: string = "on"
  // Whether the line and its fill are drawn (off: dots only).
  let $rail = true
  // Whether the line fills while you scroll (off: the line is full).
  let $scroll = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Switches of the Lab: they change the props below live. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Rozetler" options={[{ value: "on", label: "rozet" }, { value: "own", label: "kendi rozetim" }, { value: "off", label: "rozetsiz" }]} bind:value={$badges} />
        <Toggle label="Çizgi" bind:value={$rail} />
        <Toggle label="Kaydırdıkça dolsun" bind:value={$scroll} />
      </div>
    </Card>
    {/* The roadmap is drawn inside a function so it is rebuilt when a switch changes. */}
    {() => {
      // The signals are read here: when one changes, the roadmap is drawn again.
      const badges = $badges, rail = $rail, scroll = $scroll
      // - rail and scroll: the line, and whether it fills with scrolling; reveal={false}: no entrance animation.
      // - badges: true (built-in), false (none) or a function (status, text) => node for your own mark.
      // - labels: the texts of the statuses; items: { time, title, body, status, icon }; class: on the root (the tests
      //   use it).
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
