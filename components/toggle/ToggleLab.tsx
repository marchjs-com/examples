// ToggleLab: the full-featured Toggle example; it uses every prop at least once.
//
// Props shown here: value (bind:value, onChange), label or children (rich content), tristate (on / off / not set),
// m:color, disabled, readonly, invalid, required, id, name, class, aria-label, describedby, onFocus / onBlur, and the
// common prop m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ToggleLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Toggle, Card, Badge } from "march/ui"

// Theme colour tokens the switches below use for their on state.
const colors = ["brand-orange", "brand-blue", "brand-green", "brand-purple", "brand-pink"] as const
// The text for a three-state value: null means "not set".
const word = (v: boolean | null): string => (v == null ? "ayarlanmamış" : v ? "açık" : "kapalı")

// A small layout helper for this page: a muted title above a wrapping row of examples.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>{props.children}</div>
</div>

export function ToggleLab() {
  // `$` variables are signals; the text beside the switches reads them, so every change is visible at once.
  let $dark = false
  let $sound = true
  let $changes = 0
  let $pressed: boolean | null = null
  let $focus = "yok"
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* bind:value is the two-way binding. `id` and `name` go to the switch (name is the form field name). onFocus /
        onBlur are plain callbacks, here they write the focus state into a signal. The switch is a <button
        role="switch"> with aria-checked: Space and Enter toggle it and screen readers say "on" / "off". */}
    <Section title="Değer (bind:value), id, name, onFocus / onBlur">
      <Toggle bind:value={$dark} label="Karanlık mod" id="lab-dark" name="dark"
        onFocus={() => $focus = "karanlık"} onBlur={() => $focus = "yok"} />
      <span>Karanlık: {$dark ? "açık" : "kapalı"} · odak: {$focus}</span>
    </Section>
    {/* The one-way form: `value` shows the signal and onChange(v) gives you the new value, so you can count changes or
        validate. The children replace `label`: any content works, here text and a Badge that follows the state. */}
    <Section title="onChange ve children (zengin etiket)">
      <Toggle value={$sound} onChange={(v: boolean) => { $sound = v; $changes++ }}>
        Bildirim sesi <Badge tone={$sound ? "success" : "neutral"}>{$sound ? "Açık" : "Sessiz"}</Badge>
      </Toggle>
      <span>{$changes} değişiklik</span>
    </Section>
    {/* tristate adds a third state, "not set" (null, the thumb in the middle). A click goes not set, on, off, not set.
        Use it for a value where "not set" differs from false. A switch has no third state, so it becomes a
        role="checkbox" with aria-checked="mixed" while not set. */}
    <Section title="Üç durum (tristate)">
      <Toggle tristate value={$pressed} onChange={(v: boolean) => $pressed = v} label="Basılı (pressed)" />
      <span>Basılı: {word($pressed)}</span>
    </Section>
    {/* m:color is a common prop (every component takes it): the colour token of the track when the switch is on. */}
    <Section title="Renk (m:color)">{colors.map((c) => <Toggle m:color={c} value={true} label={c} />)}</Section>
    {/* disabled and readonly lock the switch (in both cases it cannot be changed). `invalid` marks it as wrong
        (aria-invalid), `required` marks it as needed, and describedby points at the id of the message below, so a
        screen reader reads the message with the switch. */}
    <Section title="Durumlar">
      <Toggle disabled value={true} label="Devre dışı (açık)" />
      <Toggle disabled label="Devre dışı (kapalı)" />
      <Toggle readonly value={true} label="Salt okunur" />
      <Toggle invalid required describedby="lab-terms-error" class="lab-terms" label="Koşulları kabul ediyorum" />
      <span id="lab-terms-error" sx={{ text: "sm", color: "danger" }}>Devam etmek için kabul et</span>
    </Section>
    {/* Without a visible label, give the switch an aria-label so that screen readers can name it. */}
    <Section title="Görünür etiket yok (aria-label)">
      <Toggle aria-label="Konum paylaşımı" value={true} m:color="brand-blue" />
    </Section>
    {/* m:theme="night" is a common prop (it works on every component): the card and everything inside use the dark
        theme. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <Toggle value={true} m:color="brand-gold" label="Gece vardiyası" />
        <Toggle tristate label="Gece belirsiz" />
      </Section>
    </Card>
  </div>
}
