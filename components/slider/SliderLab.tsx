// SliderLab: the full-featured Slider example; it uses every prop at least once.
//
// Props shown here: value (bind:value, onChange, onCommit), min, max, step, format, showValue, valueText, track (true, a
// class name or a node), m:color, the states disabled, readonly, invalid and required, and the form and accessibility props
// id, name, class, aria-label, describedby, onFocus and onBlur.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SliderLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Slider, Card, Progress } from "march/ui"

// A format function: turns the number into a word, used as the text shown next to the slider.
const level = (v: number) => (v < 34 ? "düşük" : v < 67 ? "orta" : "yüksek")

// A caption above its example.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function SliderLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it.
  let $volume = 60
  let $moves = 0
  let $commits = 0
  let $temp = 21.5
  let $focus = "yok"
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Değer (bind:value), format, id, name, onFocus / onBlur, onCommit">
      {/* - bind:value={$volume}: two-way binding. format: the text shown next to the slider (the value stays a number).
          - aria-label: the accessible name (a Field around the Slider would provide a label instead).
          - id and name: the input's id and its form field name.
          - onFocus / onBlur: focus events; here they update the "focus" text.
          - onCommit: called once when a change is finished (the pointer is released), after onChange; it is the place for
            saving, where onChange would fire on every step of a drag. */}
      <Slider bind:value={$volume} format={(v: number) => `%${v}`} aria-label="Ses" id="lab-volume" name="volume"
        onFocus={() => $focus = "ses"} onBlur={() => $focus = "yok"} onCommit={() => $commits++} />
      <span>Ses: {$volume} · {$commits} bırakış · odak: {$focus}</span>
    </Row>
    <Row title="min, max, step (ondalık), valueText (seslendirilen), onChange">
      {/* value + onChange is the one-way alternative to bind:value. min, max and step define the range (16 to 30 in halves).
          format is the text shown, valueText is the text a screen reader speaks (aria-valuetext). m:color is a common prop
          that sets the colour token. */}
      <Slider value={$temp} onChange={(v: number) => { $temp = v; $moves++ }} min={16} max={30} step={0.5}
        format={(v: number) => `${v} °C`} valueText={(v: number) => `${v} derece`} aria-label="Sıcaklık" m:color="brand-orange" />
      <span>Termostat: {$temp} °C · {$moves} hareket</span>
    </Row>
    <Row title="İz: renk rampası (track), sınıf adı, kendi düğümün">
      {/* track draws your own track under a drawn thumb, while the input stays a native range (keyboard, forms, screen
          readers all keep working):
          - track (true): a ramp in the control's colour.
          - track="m-slider-ramp": a class name, so your own CSS (such as a gradient) is the track.
          - track={<Progress …/>}: any node, here a segmented Progress bar. */}
      <Slider value={70} track m:color="brand-green" format={level} aria-label="Pil" />
      <Slider value={40} track="m-slider-ramp" m:color="brand-purple" aria-label="Doygunluk" />
      <Slider value={50} track={<Progress value={100} colors="brand" paint="segments" />} format={level} aria-label="Düzey" />
    </Row>
    <Row title="Değer gizli (showValue={false})">
      {/* showValue={false}: only the track is left, with no value text next to it. */}
      <Slider value={30} showValue={false} m:color="brand-blue" aria-label="Parlaklık" />
    </Row>
    <Row title="Durumlar">
      {/* States: disabled and readonly both disable the native input. invalid sets aria-invalid and required marks the field
          required; describedby points to the error text below, so screen readers read it with the control. class adds your
          own class to the control. */}
      <Slider value={80} disabled aria-label="Kilitli" />
      <Slider value={25} readonly aria-label="Salt okunur" />
      <Slider value={5} invalid required describedby="lab-budget-error" class="lab-budget" aria-label="Bütçe" format={(v: number) => `${v} bin ₺`} />
      <span id="lab-budget-error" sx={{ text: "sm", color: "danger" }}>Bütçe en az 10 bin ₺ olmalı</span>
    </Row>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Slider value={65} track m:color="brand-gold" format={(v: number) => `%${v}`} aria-label="Gece ışığı" />
      </Row>
    </Card>
  </div>
}
