// CodeViewLab: the full-featured CodeView example; it uses every prop at least once.
//
// Props shown here: code (a text or an accessor), lang, highlight, lineNumbers, wrap, copy, label, class, tools, toolbar,
// langLabel, wrapButton, wrapLabel, copyLabel, buttons, and the common props m:color and m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CodeViewLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CodeView, IconButton, Button, Card } from "march/ui"
import { play } from "march/icons"

const CSS = `.kart { display: flex; flex-direction: column; gap: var(--m-space-2); padding: var(--m-space-4); border-radius: var(--m-radius-3); }`
const JSON_TEXT = `{ "ad": "March", "surum": "0.2.0", "renkli": false }`

export function CodeViewLab() {
  // $start feeds the live code of the first block; $runs counts presses of the Run button in its toolbar.
  let $start = 0
  let $runs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The main block:
        - code as a function: the block re-reads it when $start changes, so the code is live (a plain string also works).
        - lang="tsx" picks the syntax colours; langLabel replaces the language name shown in the toolbar.
        - label is the accessible name of the scrollable code area; wrapLabel / copyLabel are the button texts.
        - tools: extra controls placed in the toolbar (here a Run icon button).
        - m:color (a common prop) sets the colour token of the block. */}
    <CodeView class="lab-main" m:color="brand-purple" lang="tsx" langLabel="Sayac.tsx" label="Sayaç kodu"
      wrapLabel="Satırları kaydır" copyLabel="Kodu kopyala"
      code={() => `let $n = ${$start}\nconst artir = () => $n++\n<button on:click={artir}>{$n}</button>`}
      tools={<IconButton icon={play} label="Çalıştır" size="sm" on:click={() => $runs++} />} />
    <div sx={{ flex: ["row", "between"], gap: 2 }}>
      <span sx={{ text: "sm", color: "muted" }}>{$runs} kez çalıştı</span>
      <Button size="sm" variant="ghost" on:click={() => $start++}>Başlangıcı artır</Button>
    </div>
    {/* wrap: the block starts with long lines wrapped (the Wrap button toggles it). buttons="icon": the toolbar
        buttons are icon buttons; their text becomes the tooltip and the accessible name. */}
    <CodeView class="lab-icons" code={CSS} lang="css" wrap buttons="icon" wrapLabel="Kaydır" copyLabel="Kopyala" />
    {/* Everything off: highlight={false} (no colours), lineNumbers={false}, copy={false} and wrapButton={false}
        (no buttons), langLabel={false} (no language name). The code area stays focusable for keyboard scrolling. */}
    <CodeView class="lab-plain" code={JSON_TEXT} lang="json" highlight={false} lineNumbers={false} copy={false} wrapButton={false} langLabel={false} label="Renksiz JSON" />
    {/* toolbar={false}: no bar at all, only the code. m:theme="night" draws this card in the dark theme. */}
    <Card m:theme="night">
      <CodeView class="lab-bare" code="npx march dev --port 5173" lang="sh" toolbar={false} label="Terminal komutu" />
    </Card>
  </div>
}
