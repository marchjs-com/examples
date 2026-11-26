// DeployScript: the real-life CodeEditor example.
//
// What it shows: a deploy script. Line numbers, a click on a line number toggles a breakpoint, Ctrl+S or the Save button
// saves, and the foot line says whether the script has unsaved changes.
// When to use this pattern: a small code field with a save step and gutter marks. CodeEditor does not run the script:
// the owner decides what the text and the marks mean.
// Keyboard: Ctrl+S saves (onSave), F9 toggles a breakpoint at the caret's line (onGutter), Tab indents.
import { CodeEditor, Button, toast } from "march/ui"

// $saved is the last saved text, $code the edited text, $stops the lines with a breakpoint; $dirty is derived.
export function DeployScript() {
  let $saved = "#!/bin/sh\nnpm ci\nnpm run build\nnpx wrangler deploy\n"
  let $code = $saved
  let $stops: number[] = []
  const save = () => { $saved = $code; toast("Betik kaydedildi") }
  const $dirty = $code !== $saved
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* bind:value, lang="sh" (shell colours), label (accessible name), lineNumbers and onSave (Ctrl+S).
            message / status: the foot line says whether there are unsaved changes, and the status dot is red until saved.
            lineMarks: a mark beside each number (a breakpoint dot with a tooltip); onGutter(line): a press on the gutter
            (or F9) toggles that line in $stops. */}
    <CodeEditor bind:value={$code} lang="sh" label="Yayın betiği" lineNumbers onSave={save}
      message={$dirty ? "Kaydedilmemiş değişiklik var (Ctrl+S)" : "Kaydedildi"} status={$dirty ? "error" : "ok"}
      lineMarks={$stops.map((line) => ({ line, kind: "breakpoint", title: `${line}. satırda dur` }))}
      onGutter={(line) => $stops = $stops.includes(line) ? $stops.filter((l) => l !== line) : [...$stops, line]} />
    <div sx={{ flex: ["row", "between", "center"] }}>
      <span sx={{ text: "sm", color: "muted" }}>{$stops.length ? `Durma: ${$stops.join(", ")}. satır` : "Durma noktası yok"}</span>
      <Button size="sm" disabled={!$dirty} on:click={save}>Kaydet</Button>
    </div>
  </div>
}
