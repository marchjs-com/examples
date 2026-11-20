import { Timeline, Card, Toggle } from "march/ui"
import { star, bell } from "march/icons"

// Timeline'ın bütün özellikleri bir arada: items (time, title, body, tone, color, icon, class), dot (var / yok / kendi),
// line, formatTime ve class; çizgiyi anahtarla aç / kapat
const items = [
  { time: Date.UTC(2026, 0, 1, 10, 0), title: "Yeni yıl sürümü", body: "Tarih biçimlenir (epoch)", tone: "success" as const, icon: star },
  { time: "dün", title: "Metin zaman olduğu gibi kalır", body: () => <i>gövde bir işlev de olabilir</i>, tone: "warn" as const },
  { time: "2026-11-18T08:30:00Z", title: "ISO zaman", color: "brand-purple" as const, icon: bell, class: "lab-last" },
]

// bir zaman akışı ve üstünde adı
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TimelineLab() {
  let $line = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Toggle label="Bağlantı çizgisi" bind:value={$line} />
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Box title="Varsayılan nokta, biçimlenen zaman">
        <Timeline items={items} line={$line} class="lab-tl" />
      </Box>
      <Box title="Sıra numarası, kendi zaman biçimim">
        <Timeline items={items} line={$line} dot={(_x: unknown, i: number) => <b>{i + 1}</b>}
          formatTime={(v: unknown) => typeof v === "string" && !/\d/.test(v) ? v : "biçimli zaman"} />
      </Box>
      <Card m:theme="night">
        <Box title="Noktasız, koyu zemin">
          <Timeline items={items} dot={false} line={$line} />
        </Box>
      </Card>
    </div>
  </div>
}
