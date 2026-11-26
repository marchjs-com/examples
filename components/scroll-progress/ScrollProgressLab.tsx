// ScrollProgressLab: the full-featured ScrollProgress example; it uses every prop at least once.
//
// Props shown here: target, position (fixed / inline), paint (gradient / accent), size, color, label and class.
// The controls at the top change the bar live, so you can see what each option does.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ScrollProgressLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ScrollProgress } from "march/landing"
import { Segmented, Toggle, Card } from "march/ui"

// The choices of the two Segmented controls. `value` is what the Lab keeps, `label` is the text people see.
// "none" in COLORS means "do not pass a color", so the paint decides the colour.
const PAINTS = [{ value: "gradient", label: "gradyan" }, { value: "accent", label: "vurgu" }]
const COLORS = [{ value: "none", label: "boyaya göre" }, { value: "brand-orange", label: "turuncu" }, { value: "success", label: "yeşil" }]

export function ScrollProgressLab() {
  // Plain `let $name` variables are March signals: reading one inside a function (like the one below) subscribes that
  // function to it, and assigning a new value redraws it. bind:value={$x} on a control writes into the same signal.
  let $paint = "gradient"
  let $color = "none"
  let $fixed = false
  let $thick = false
  let $own = false
  // The box that the "measure only this box" switch measures; the ref below fills it in.
  let box: Element | null = null
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control panel. Segmented is a compact single choice, Toggle an on/off switch (role="switch", which the
        tests use to find the first and third switch). Each one is bound to a signal above. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Boya" options={PAINTS} bind:value={$paint} />
        <Segmented aria-label="Renk" options={COLORS} bind:value={$color} />
        <Toggle label="Sayfanın üstüne sabitle" bind:value={$fixed} />
        <Toggle label="Kalın" bind:value={$thick} />
        <Toggle label="Yalnız bu kutuyu ölç" bind:value={$own} />
      </div>
    </Card>
    <Card>
      <div ref={(el: Element) => { box = el }} sx={{ flex: "col", gap: 2 }}>
        {() => {
          // The signals are read here, inside the function, so any change redraws the bar with the new props.
          const fixed = $fixed, paint = $paint, thick = $thick, color = $color, own = $own
          // - class="lab-progress": lets the tests (or your CSS) find this bar.
          // - position: "fixed" pins the bar to the top of the screen, "inline" draws it in place.
          // - paint: "gradient" (brand gradient) or "accent" (the theme's accent colour).
          // - size: the bar's height in px (default 3).
          // - color: one colour token for the fill; when set, it wins over paint. undefined leaves paint in charge.
          // - target: a function returning the element to measure (0 at its top, 1 at its end); undefined measures
          //   the page.
          // - label: the accessible name of the role="progressbar"; it changes with the measured thing.
          // Motion: the fill is written by the motion engine's scroll scene, so global speed and reduced motion apply
          // and no animation prop exists.
          return <ScrollProgress class="lab-progress" position={fixed ? "fixed" : "inline"} paint={paint as "gradient"}
            size={thick ? 10 : 4} color={color === "none" ? undefined : color as "success"}
            target={own ? () => box : undefined} label={own ? "Kutunun okunan kısmı" : "Sayfanın okunan kısmı"} />
        }}
        <p>Çubuk, sayfa (ya da bu kutu) kaydıkça dolar.</p>
        <p sx={{ color: "muted" }}>Yardımcı teknolojiler yüzdeyi değer olarak okur.</p>
      </div>
    </Card>
  </div>
}
