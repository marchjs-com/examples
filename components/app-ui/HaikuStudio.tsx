import { AppUI, Field, Textarea, row, tabs } from "march/ui"
import { edit, eye } from "march/icons"

// haiku atölyesi: solda taslak, sağda önizleme; iki panel aynı sinyali okur, yerleşimi sürükleyerek değiştir
export function HaikuStudio() {
  let $text = "sessiz bir havuz\nkurbağa atlar içine\nsuyun sesi"
  const lines = () => $text.split("\n").filter(Boolean)
  const panels = [
    { id: "draft", title: "Taslak", icon: edit, content: () => <div sx={{ p: 2 }}><Field label="Haiku"><Textarea bind:value={$text} rows={4} /></Field></div> },
    { id: "view", title: "Önizleme", icon: eye, content: () => <div sx={{ p: 3, flex: "col", gap: 1 }}>
      {() => lines().map((l, i) => <span sx={{ text: i === 1 ? ["lg", "bold"] : "md" }}>{l}</span>)}
      <span sx={{ text: "xs", color: "muted" }}>{() => lines().length} dize</span>
    </div> },
  ]
  return <div style={{ height: "18rem" }}>
    <AppUI title="haiku-atölyesi" description="5 · 7 · 5" panels={panels} layout={row([0.5, tabs("draft")], [0.5, tabs("view")])} commands={false} />
  </div>
}
