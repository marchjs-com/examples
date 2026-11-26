// SelectLab: the full-featured Select example; it uses every prop at least once.
//
// Props shown here: bind:value and onChange, values that keep their type (numbers, objects), a disabled option, a live
// option list, comma-separated text options, the empty first option (placeholder) or none (false), required, invalid,
// disabled, readonly, id / name / class, aria-label, describedby and the focus events onFocus / onBlur.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SelectLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Select, Button, Card } from "march/ui"
import { plus } from "march/icons"

// A titled group: the title on top, the examples below it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>
// Object options: each value is an object, the label is the text shown. `disabled: true` shows the option but makes it
// unchoosable.
const plans = [
  { value: { id: "free", seats: 1 }, label: "Ücretsiz · 1 kişi" },
  { value: { id: "team", seats: 10 }, label: "Takım · 10 kişi" },
  { value: { id: "corp", seats: 500 }, label: "Kurumsal · 500 kişi (satışla görüşün)", disabled: true },
]

export function SelectLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. bind:value={$x} on a Select
  // writes the chosen value into the signal.
  let $n = 3
  let $edits = 0
  let $plan = plans[0]!.value
  let $sizes = ["S", "M", "L", "XL"]
  let $size = "M"
  let $drink = "Çay"
  let $team = ""
  let $focused = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Sayılar sayı kalır; onChange">
      {/* A number array: the chosen value is a number (the line below prints typeof to prove it). the placeholder prop
          adds an empty first option with that text. onChange is called when the user changes the choice. aria-label is
          the accessible name (a Field around the Select would provide a label instead). */}
      <Select bind:value={$n} options={[1, 2, 3, 5, 8, 13]} placeholder="Sayı seç" aria-label="Fibonacci" onChange={() => $edits++} />
      <span sx={{ text: "sm" }}>Seçili: {$n} ({typeof $n}) · değişiklik: {$edits}</span>
    </Row>
    <Row title="Nesne şıklar ve kapalı şık">
      {/* Object options: the value you get is the object itself. placeholder={false} removes the empty first option, so
          something is always chosen. The third plan is disabled. */}
      <Select bind:value={$plan} options={plans} placeholder={false} aria-label="Plan" />
      <span sx={{ text: "sm" }}>Plan: {$plan?.id} · {$plan?.seats} koltuk</span>
    </Row>
    <Row title="Canlı şık listesi">
      {/* A live option list: options is a function, so the Select follows $sizes. The button appends one more size and
          disables itself once it has been added. */}
      <Select bind:value={$size} options={() => $sizes} placeholder={false} aria-label="Beden" />
      <Button size="sm" variant="ghost" icon={plus} disabled={$sizes.includes("XXL")} on:click={() => $sizes = [...$sizes, "XXL"]}>Beden ekle</Button>
    </Row>
    <Row title="Virgüllü metin şıklar">
      {/* options as one comma-separated text: each part is both a value and its label. */}
      <Select bind:value={$drink} options="Çay, Kahve, Ayran, Limonata" placeholder={false} aria-label="İçecek" />
      <span sx={{ text: "sm" }}>İçecek: {$drink}</span>
    </Row>
    <Row title="Form: zorunlu, geçersiz, odak, kimlik">
      {/* The form props:
          - id, name and class: the element's id, the form field name and an extra class (the tests use the id).
          - required: the control is required. invalid: marks it invalid (aria-invalid); here it follows the signal, so
            the mark goes away once a team is chosen.
          - describedby: the id of the hint text below, so screen readers read it with the control.
          - onFocus / onBlur: focus events; the hint shows the state. */}
      <Select bind:value={$team} options={["Tasarım", "Mobil", "Altyapı"]} placeholder="Takım seç…" id="lab-team" name="team" class="lab-team"
        required invalid={!$team} describedby="lab-team-hint" onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-team-hint" sx={{ text: "sm", color: "muted" }}>{$team ? `Takım: ${$team}` : "Bir takım seçmelisin"} · {$focused ? "açık" : "odak dışında"}</span>
    </Row>
    <Row title="Devre dışı ve salt okunur">
      {/* disabled and readonly: both make the native select unusable (readonly disables the select). */}
      <Select value="Ankara" options={["İstanbul", "Ankara"]} disabled aria-label="Kilitli şehir" />
      <Select value="TRY" options={["TRY", "EUR", "USD"]} readonly aria-label="Para birimi" />
    </Row>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Select value="Gece" options="Gündüz, Gece, Sistem" placeholder={false} aria-label="Tema" />
      </Row>
    </Card>
  </div>
}
