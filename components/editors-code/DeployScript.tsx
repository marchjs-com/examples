import { CodeEditor, Button, toast } from "march/ui"

// yayın betiği: satır numaraları, satıra tıklayınca durma noktası, Ctrl+S ya da Kaydet; alt satır kaydedilmemiş mi söyler
export function DeployScript() {
  let $saved = "#!/bin/sh\nnpm ci\nnpm run build\nnpx wrangler deploy\n"
  let $code = $saved
  let $stops: number[] = []
  const save = () => { $saved = $code; toast("Betik kaydedildi") }
  const $dirty = $code !== $saved
  return <div sx={{ flex: "col", gap: 2 }}>
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
