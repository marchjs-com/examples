import { CodeView, IconButton, Button, Card } from "march/ui"
import { play } from "march/icons"

// CodeView'in bütün özellikleri: code (erişimci), lang, highlight, lineNumbers, wrap, copy, label, class, tools,
// toolbar, langLabel, wrapButton, wrapLabel, copyLabel, buttons; ortak özelliklerden m:color ve m:theme
const CSS = `.kart { display: flex; flex-direction: column; gap: var(--m-space-2); padding: var(--m-space-4); border-radius: var(--m-radius-3); }`
const JSON_TEXT = `{ "ad": "March", "surum": "0.2.0", "renkli": false }`

export function CodeViewLab() {
  let $start = 0
  let $runs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <CodeView class="lab-main" m:color="brand-purple" lang="tsx" langLabel="Sayac.tsx" label="Sayaç kodu"
      wrapLabel="Satırları kaydır" copyLabel="Kodu kopyala"
      code={() => `let $n = ${$start}\nconst artir = () => $n++\n<button on:click={artir}>{$n}</button>`}
      tools={<IconButton icon={play} label="Çalıştır" size="sm" on:click={() => $runs++} />} />
    <div sx={{ flex: ["row", "between"], gap: 2 }}>
      <span sx={{ text: "sm", color: "muted" }}>{$runs} kez çalıştı</span>
      <Button size="sm" variant="ghost" on:click={() => $start++}>Başlangıcı artır</Button>
    </div>
    <CodeView class="lab-icons" code={CSS} lang="css" wrap buttons="icon" wrapLabel="Kaydır" copyLabel="Kopyala" />
    <CodeView class="lab-plain" code={JSON_TEXT} lang="json" highlight={false} lineNumbers={false} copy={false} wrapButton={false} langLabel={false} label="Renksiz JSON" />
    <Card m:theme="night">
      <CodeView class="lab-bare" code="npx march dev --port 5173" lang="sh" toolbar={false} label="Terminal komutu" />
    </Card>
  </div>
}
