// ButtonGroupLab: the full-featured ButtonGroup example; it uses every prop at least once.
//
// Props shown here: label (text and a live function), attached (one strip or spaced), class, the children (the
// buttons) and the common props of every component, m:color and m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ButtonGroupLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ButtonGroup, Button, Card } from "march/ui"
import { bold, italic, strikethrough, undo, redo, save } from "march/icons"

// A titled row, so each group below has a small caption.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ButtonGroupLab() {
  // The set of pressed text marks and a save counter (reactive state). toggle() builds a new Set each time, which is
  // what makes the view update.
  let $marks = new Set<string>(["Kalın"])
  let $saved = 0
  const toggle = (m: string) => { const n = new Set($marks); n.has(m) ? n.delete(m) : n.add(m); $marks = n }
  const marks = [["Kalın", bold], ["Eğik", italic], ["Üstü çizili", strikethrough]] as const
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The default group is spaced: the buttons keep a gap. role="group" and `label` tell screen readers what the
        buttons belong to. */}
    <Row title="Aralıklı (varsayılan)">
      <ButtonGroup label="Geçmiş">
        <Button icon={undo} variant="secondary">Geri al</Button>
        <Button icon={redo} variant="secondary">Yinele</Button>
      </ButtonGroup>
    </Row>
    {/* attached joins the buttons into one strip with rounded outer ends. `label` as a function stays live: it lists
        the pressed marks, so the group's accessible name follows the state. `pressed` on a Button makes it a toggle
        (aria-pressed). class goes on the group so CSS or a test can find it. For a single choice among options use
        Segmented instead: these buttons are independent. */}
    <Row title="Bitişik, adı canlı (seçili biçimler)">
      <ButtonGroup attached label={() => `Biçim: ${[...$marks].join(", ") || "yok"}`} class="lab-marks">
        {marks.map(([name, icon]) => <Button icon={icon} variant="secondary" pressed={$marks.has(name)} on:click={() => toggle(name)}>{name}</Button>)}
      </ButtonGroup>
    </Row>
    {/* m:color (a common prop) sets the colour token of the group and everything inside it. */}
    <Row title="Renk (m:color)">
      <ButtonGroup attached label="Kaydet" m:color="brand-purple">
        <Button icon={save} on:click={() => $saved++}>{`Kaydet (${$saved})`}</Button>
        <Button variant="primary" on:click={() => $saved = 0}>Sıfırla</Button>
      </ButtonGroup>
    </Row>
    {/* m:theme="night" on the Card shows the group on a dark surface. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <ButtonGroup attached label="Hizalama">
          {["Başa", "Ortaya", "Sona"].map((x) => <Button variant="secondary">{x}</Button>)}
        </ButtonGroup>
      </Row>
    </Card>
  </div>
}
