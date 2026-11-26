// HaikuStudio: the creative-minimal AppUI example.
//
// A haiku workshop: a draft on the left and a live preview on the right. Both panels read the same reactive text, so
// typing in one updates the other at once, and the user can drag the dock's dividers or tabs to rearrange the layout.
// It shows the smallest useful AppUI: two panels, a start layout and a title. Use the pattern for a small tool that
// needs an editor plus a view of the result.
import { AppUI, Field, Textarea, row, tabs } from "march/ui"
import { edit, eye } from "march/icons"

export function HaikuStudio() {
  // The haiku text, one line per verse; `lines()` is a function so every place that calls it re-reads the text.
  let $text = "sessiz bir havuz\nkurbağa atlar içine\nsuyun sesi"
  const lines = () => $text.split("\n").filter(Boolean)
  // Two panels. `id` is what the layout refers to. The draft binds the textarea to $text with bind:value (two-way);
  // the preview is a function child, so the list of verses redraws when the text changes. The middle verse is
  // drawn larger and bold with sx text tokens.
  const panels = [
    { id: "draft", title: "Taslak", icon: edit, content: () => <div sx={{ p: 2 }}><Field label="Haiku"><Textarea bind:value={$text} rows={4} /></Field></div> },
    { id: "view", title: "Önizleme", icon: eye, content: () => <div sx={{ p: 3, flex: "col", gap: 1 }}>
      {() => lines().map((l, i) => <span sx={{ text: i === 1 ? ["lg", "bold"] : "md" }}>{l}</span>)}
      <span sx={{ text: "xs", color: "muted" }}>{() => lines().length} dize</span>
    </div> },
  ]
  // The workspace fills its parent, so the parent gets a fixed height. layout={row([0.5, …], [0.5, …])} splits the
  // dock into two equal columns, one tab group each; commands={false} leaves out the dock's command-palette entries.
  return <div style={{ height: "18rem" }}>
    <AppUI title="haiku-atölyesi" description="5 · 7 · 5" panels={panels} layout={row([0.5, tabs("draft")], [0.5, tabs("view")])} commands={false} />
  </div>
}
