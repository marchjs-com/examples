// JsonViewLab: the full-featured JsonView example; it uses every prop at least once.
//
// Props shown here: value (every kind: numbers, strings, null, arrays, dates, a circular reference, a function), open, labels,
// arrow (default, none, or your own), label, describe and class.
// Use it as a reference when you need one option: find the prop below and copy the line.
// JsonViewLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { JsonView, Card } from "march/ui"

// One object with every kind of value: a string, a number, a boolean, null, an array, a Date (printed as an ISO string), a
// nested object and a function (not JSON, so `describe` gives it a text).
const data: Record<string, unknown> = {
  name: "March", version: 2, stable: true, author: null, tags: ["tsx", "signals"],
  since: new Date(Date.UTC(2026, 0, 1)), nested: { deep: { deeper: { deepest: "dip" } } },
  onClick: () => 1,
}
// A circular reference: the object contains itself. JsonView marks it instead of looping forever.
data.self = data

// A caption above a tree. It only organises the lab.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function JsonViewLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. Everything open to two levels. label: the accessible name of the root list. open={2}: depth expanded at the start.
        labels: our words for the counts of closed branches and for the circular mark. describe(value): a text for a value that is
        not JSON (here the function); returning null leaves the value to JsonView. class: a hook for tests and CSS. */}
    <Box title="Her tür değer, iki kat açık, kendi metinler, işlevin adı">
      <JsonView class="lab-json" label="Paket" value={data} open={2}
        labels={{ items: "öğe", keys: "alan", circular: "(kendisi)" }}
        describe={(v: unknown) => typeof v === "function" ? "ƒ işlev" : null} />
    </Box>
    {/* 2. Closed at the start (open={0}), with our own arrow: arrow is a function that receives an accessor (open()), so the
        mark follows the state. arrow={false} (next example) draws no arrow. */}
    <Box title="Kapalı, kendi işaretim">
      <JsonView label="Kapalı" value={{ a: 1, b: [1, 2, 3] }} open={0} arrow={(open: () => boolean) => <b>{() => (open() ? "−" : "+")}</b>} />
    </Box>
    {/* On a dark surface (m:theme="night"), with no arrow. */}
    <Card m:theme="night">
      <Box title="Oksuz, koyu zemin">
        <JsonView label="Koyu" value={[1, "iki", { üç: 3 }]} arrow={false} />
      </Box>
    </Card>
  </div>
}
