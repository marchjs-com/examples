import { Calendar, Card } from "march/ui"

// Calendar'ın bütün özellikleri: bind:value ve onChange, onPick, onEscape, min / max, isDisabled, firstDay, locale,
// labels, autoFocus, class; aralık (rangeFrom / rangeTo) ile initial, kendi ay işaretlerin (prevIcon / nextIcon);
// gün adları satırı ve ay düğmeleri kapalı (weekdays / nav = false) ile kendi gün içeriğin (renderDay); koyu zemin
type Day = string | null

const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function CalendarLab() {
  let $day: Day = "2026-03-14"
  let $changes = 0
  let $picked = "—"
  let $escaped = false
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    <Section title="Değer, sınırlar, kapalı gün (20 Mart), Türkçe, pazartesi başı">
      <Calendar bind:value={$day} onChange={() => $changes++} onPick={(iso: string) => $picked = iso} onEscape={() => $escaped = true}
        min="2026-03-05" max="2026-03-25" isDisabled={(iso: string) => iso === "2026-03-20"} firstDay={1} locale="tr-TR"
        labels={{ prevMonth: "Önceki ay", nextMonth: "Sonraki ay" }} autoFocus class="lab-cal" />
      <span>Seçilen: {$day}</span>
      <span>Değişiklik: {$changes} · onPick: {$picked}</span>
      <span>{$escaped ? "Escape'e basıldı" : "Escape bekleniyor"}</span>
    </Section>
    <Section title="Aralık, initial, kendi ay işaretleri, en-US, pazar başı">
      <Calendar initial="2026-04-01" rangeFrom="2026-04-06" rangeTo="2026-04-12" locale="en-US" firstDay={0}
        prevIcon="«" nextIcon="»" labels={{ prevMonth: "Önceki (aralık)", nextMonth: "Sonraki (aralık)" }} class="lab-range" />
    </Section>
    <Section title="Gün adları ve ay düğmeleri yok, kendi gün içeriği">
      <Calendar initial="2026-05-01" weekdays={false} nav={false} m:color="brand-green" class="lab-busy"
        renderDay={(_iso: string, d: number) => (d % 4 === 0 ? <b>{`${d}•`}</b> : d)} />
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <Calendar bind:value={$day} m:color="brand-orange" locale="tr-TR" labels={{ prevMonth: "Gece önceki ay", nextMonth: "Gece sonraki ay" }} />
      </Section>
    </Card>
  </div>
}
