import { ButtonGroup, Button, Card } from "march/ui"
import { bold, italic, strikethrough, undo, redo, save } from "march/icons"

// ButtonGroup'un bütün özellikleri: label (metin ve canlı değer), attached (bitişik / aralıklı), class, children
// (düğmeler) ve her bileşenin ortak özellikleri m:color, m:theme
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ButtonGroupLab() {
  let $marks = new Set<string>(["Kalın"])
  let $saved = 0
  const toggle = (m: string) => { const n = new Set($marks); n.has(m) ? n.delete(m) : n.add(m); $marks = n }
  const marks = [["Kalın", bold], ["Eğik", italic], ["Üstü çizili", strikethrough]] as const
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Aralıklı (varsayılan)">
      <ButtonGroup label="Geçmiş">
        <Button icon={undo} variant="secondary">Geri al</Button>
        <Button icon={redo} variant="secondary">Yinele</Button>
      </ButtonGroup>
    </Row>
    <Row title="Bitişik, adı canlı (seçili biçimler)">
      <ButtonGroup attached label={() => `Biçim: ${[...$marks].join(", ") || "yok"}`} class="lab-marks">
        {marks.map(([name, icon]) => <Button icon={icon} variant="secondary" pressed={$marks.has(name)} on:click={() => toggle(name)}>{name}</Button>)}
      </ButtonGroup>
    </Row>
    <Row title="Renk (m:color)">
      <ButtonGroup attached label="Kaydet" m:color="brand-purple">
        <Button icon={save} on:click={() => $saved++}>{`Kaydet (${$saved})`}</Button>
        <Button variant="primary" on:click={() => $saved = 0}>Sıfırla</Button>
      </ButtonGroup>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <ButtonGroup attached label="Hizalama">
          {["Başa", "Ortaya", "Sona"].map((x) => <Button variant="secondary">{x}</Button>)}
        </ButtonGroup>
      </Row>
    </Card>
  </div>
}
