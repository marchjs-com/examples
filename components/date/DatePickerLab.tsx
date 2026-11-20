import { DatePicker, Field, Card } from "march/ui"
import { clock } from "march/icons"

// DatePicker'ın bütün özellikleri: bind:value ve onChange, min / max, firstDay, locale, placeholder, labels, calendar
// (takvime ek özellikler: pazarlar kapalı), name / class / required, odak olayları; kendi ikonun ya da ikonsuz
// (icon={false}), en-US sırası, id / aria-label / describedby / invalid; salt okunur, devre dışı, koyu zemin
type Day = string | null
const sunday = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay() === 0

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function DatePickerLab() {
  let $date: Day = "2026-03-14"
  let $changes = 0
  let $focused = false
  let $us: Day = null
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Değer (bind:value + onChange), sınırlar, Türkçe">
      <Field label="Teslim tarihi">
        <DatePicker bind:value={$date} onChange={() => $changes++} min="2026-03-01" max="2026-06-30" firstDay={1} locale="tr-TR"
          placeholder="GG.AA.YYYY" name="due" class="lab-date" required calendar={{ isDisabled: sunday }}
          labels={{ choose: "Takvimi aç", prevMonth: "Önceki ay", nextMonth: "Sonraki ay" }}
          onFocus={() => $focused = true} onBlur={() => $focused = false} />
      </Field>
      <span>Değer: {$date ?? "—"}</span>
      <span>Değişiklik: {$changes}</span>
      <span>{$focused ? "Odakta" : "Odak dışında"}</span>
    </Row>
    <Row title="İkon, en-US, erişilebilirlik">
      <DatePicker bind:value={$us} locale="en-US" icon={clock} aria-label="ABD tarihi" labels={{ choose: "Saatli takvim" }} />
      <DatePicker bind:value={$us} locale="en-US" icon={false} class="lab-noicon" id="lab-plain" aria-label="İkonsuz tarih"
        describedby="lab-hint" invalid={!$us} />
      <span id="lab-hint" sx={{ text: "xs", color: "muted" }}>Ay/gün/yıl: {$us ?? "boş"}</span>
    </Row>
    <Row title="Durum">
      <DatePicker value="2026-01-05" readonly aria-label="Salt okunur tarih" class="lab-readonly" />
      <DatePicker value="2026-02-10" disabled aria-label="Kapalı tarih" class="lab-disabled" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <DatePicker bind:value={$date} locale="tr-TR" aria-label="Gece tarihi" labels={{ choose: "Gece takvimi" }} />
      </Row>
    </Card>
  </div>
}
