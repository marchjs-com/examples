import { DateTimeInput, Field, Button, Card } from "march/ui"
import { x } from "march/icons"

// DateTimeInput'un bütün özellikleri bir arada: bind:value (UTC ISO), value + onChange, min / max (tarih kısmı),
// firstDay, defaultTime, timeLabel, picker (dil, yer tutucu, ikonsuz), id, sınıf, onBlur, devre dışı, yalnız okunur, koyu zemin
// birleşim türleri JSX'in dışında: derleyici JSX içindeki `|` işaretini boru (pipe) sayar
type Maybe<T> = T | null | undefined
const FLIGHT: Maybe<string> = "2026-03-14T09:30:00.000Z"
const NONE: Maybe<string> = null

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function DateTimeInputLab() {
  let $flight = FLIGHT
  let $call = NONE
  let $blurs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="bind:value, 2026 içinde (min / max), hafta pazartesi başlar, tr-TR, onBlur, sınıf">
      <Field label="Uçuş">
        <DateTimeInput bind:value={$flight} min="2026-01-01" max="2026-12-31" firstDay={1} timeLabel="Uçuş saati"
          picker={{ locale: "tr-TR", placeholder: "gg.aa.yyyy" }} class="lab-flight" onBlur={() => { $blurs++ }} />
      </Field>
      <Button size="sm" variant="ghost" icon={x} on:click={() => { $flight = null }}>Temizle</Button>
    </Row>
    <span>Uçuş (UTC): {$flight ?? "—"} · odaktan çıkış: {$blurs}</span>
    <Row title="value + onChange, boş başlar; yalnız gün seçilince saat 09:00, ikonsuz, id">
      <DateTimeInput value={$call} onChange={(v: Maybe<string>) => { $call = v }} defaultTime="09:00" id="lab-call"
        timeLabel="Görüşme saati" picker={{ icon: false, placeholder: "Görüşme günü" }} />
    </Row>
    <span>Görüşme (UTC): {$call ?? "—"}</span>
    <Row title="Durumlar">
      <DateTimeInput value={FLIGHT} disabled timeLabel="Kapalı saat" />
      <DateTimeInput value={FLIGHT} readonly timeLabel="Kilitli saat" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <DateTimeInput bind:value={$flight} timeLabel="Koyuda uçuş saati" picker={{ locale: "tr-TR" }} />
      </Row>
    </Card>
  </div>
}
