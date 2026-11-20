import { TimeInput, Field, Card } from "march/ui"
import { bell } from "march/icons"

// TimeInput'un bütün özellikleri bir arada: bind:value, value + onChange, saniye (step=1) ve 15 dakikalık adım,
// min / max, zorunlu, geçersiz, devre dışı, yalnız okunur, name ve id, aria-label / ariaLabel, describedby,
// odak olayları (onFocus / onBlur), sınıf ve koyu zemin; saat kadranı (picker="clock"): 24 ve 12 saat (hour12, locale),
// kendi ikonu (icon) ve adları (labels), dakika adımı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function TimeInputLab() {
  let $meet = "14:30"
  let $alarm = "06:45:30"
  let $slot = "10:00"
  let $focus = "yok"
  let $dial = "07:15"
  let $us = "19:40"
  const $outside = $slot < "09:00" || $slot > "17:00"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="İki yönlü bağ (bind:value), name ve id">
      <Field label="Toplantı"><TimeInput bind:value={$meet} name="meeting" class="lab-time" /></Field>
      <span>Toplantı: {$meet}</span>
    </Row>
    <Row title="value + onChange, saniyeli (step=1)">
      <TimeInput value={$alarm} onChange={(v: string) => { $alarm = v }} step={1} aria-label="Alarm" />
      <span>Alarm: {$alarm}</span>
    </Row>
    <Row title="Mesai içinde (09:00–17:00), 15 dakikalık adımlar, zorunlu">
      <TimeInput bind:value={$slot} min="09:00" max="17:00" step={900} ariaLabel="Randevu" required invalid={$outside} />
      <span sx={{ color: $outside ? "danger" : "success" }}>Randevu: {$slot} {$outside ? "(mesai dışı)" : "(uygun)"}</span>
    </Row>
    <Row title="Saat kadranı: 24 saat (iki halka), 12 saat ÖÖ / ÖS, kendi ikonu ve adları">
      <TimeInput class="lab-dial" bind:value={$dial} picker="clock" hour12={false} labels={{ choose: "Kadranı aç", hours: "Saat", minutes: "Dakika" }} />
      <TimeInput class="lab-us" bind:value={$us} picker="clock" hour12 locale="en-US" icon={bell} step={300} labels={{ choose: "Alarm kur" }} />
      <span>Kadran: {$dial} · ABD: {$us}</span>
    </Row>
    <Row title="Durumlar">
      <TimeInput value="08:00" disabled aria-label="Kapalı saat" />
      <TimeInput value="12:30" readonly aria-label="Öğle arası" />
    </Row>
    <Row title="Açıklama ve odak">
      <TimeInput value="23:59" aria-label="Son teslim" describedby="lab-deadline-hint"
        onFocus={() => { $focus = "Son teslim" }} onBlur={() => { $focus = "yok" }} />
      <small id="lab-deadline-hint" sx={{ color: "muted" }}>Gece yarısından önce yüklenmeli</small>
      <span>Odak: {$focus}</span>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <TimeInput bind:value={$meet} id="lab-night-meeting" aria-label="Koyuda toplantı" />
      </Row>
    </Card>
  </div>
}
