// TimelineLab: the full-featured Timeline example; it uses every prop at least once.
//
// Props shown here: items (time, title, body, tone, color, icon, class), dot (the default one, your own mark, or none),
// line, formatTime, class and the common prop m:theme. A Toggle switches the connecting line on and off.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TimelineLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Timeline, Card, Toggle } from "march/ui"
import { star, bell } from "march/icons"

// Three items that together show the kinds of `time`: a number (epoch milliseconds) is formatted as a date, a text
// with no digits stays as it is, an ISO string is formatted as a date too. `tone` colours the dot with a ready-made
// tone (`as const` keeps it typed); `color` takes any theme colour token and wins over `tone`. `body` may be a
// text or a function that returns a node. `class` on an item goes on its <li>.
const items = [
  { time: Date.UTC(2026, 0, 1, 10, 0), title: "Yeni yıl sürümü", body: "Tarih biçimlenir (epoch)", tone: "success" as const, icon: star },
  { time: "dün", title: "Metin zaman olduğu gibi kalır", body: () => <i>gövde bir işlev de olabilir</i>, tone: "warn" as const },
  { time: "2026-11-18T08:30:00Z", title: "ISO zaman", color: "brand-purple" as const, icon: bell, class: "lab-last" },
]

// A small layout helper for this page: a muted title above one example.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TimelineLab() {
  // A signal: true draws the connecting line between the dots.
  let $line = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Toggle label="Bağlantı çizgisi" bind:value={$line} />
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* Default dot, default time formatting. `line` follows the toggle; `class` goes on the list (an <ol>), so CSS
          or a test can find this instance. */}
      <Box title="Varsayılan nokta, biçimlenen zaman">
        <Timeline items={items} line={$line} class="lab-tl" />
      </Box>
      {/* dot as a function draws your own mark for every item: it gets the item and its index. formatTime(value)
          returns the text for a time: here text without digits stays, everything else becomes a fixed phrase. */}
      <Box title="Sıra numarası, kendi zaman biçimim">
        <Timeline items={items} line={$line} dot={(_x: unknown, i: number) => <b>{i + 1}</b>}
          formatTime={(v: unknown) => typeof v === "string" && !/\d/.test(v) ? v : "biçimli zaman"} />
      </Box>
      {/* m:theme="night" is a common prop (every component takes it): the card and everything inside use the dark
          theme. dot={false} draws no dots at all. */}
      <Card m:theme="night">
        <Box title="Noktasız, koyu zemin">
          <Timeline items={items} dot={false} line={$line} />
        </Box>
      </Card>
    </div>
  </div>
}
