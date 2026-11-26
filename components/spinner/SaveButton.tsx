// SaveButton: the real-life Spinner example.
//
// What it shows: a save button that shows a small turning ring inside itself while it saves. The ring is the size and the colour of the
// button text, and the text says "saving..." itself, so the state is clear without the ring.
// When to use this pattern: inline loading feedback inside a button or a line of text. The Spinner is decorative here because the
// words next to it already tell assistive technology what is going on.
import { Spinner, Button, Card } from "march/ui"
import { save } from "march/icons"

export function SaveButton() {
  // `let $name` variables are March signals: writing one redraws whatever reads it. $saving is true during the (fake) save, $saved counts
  // finished saves.
  let $saving = false
  let $saved = 0
  // Fakes a request that takes one second. A real page would await its save call here.
  const run = () => { $saving = true; setTimeout(() => { $saving = false; $saved++ }, 1000) }
  return <Card title="Profil">
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      {/* disabled={() => $saving}: the button cannot be pressed again while saving.
          The label is a function child, so it is drawn again with the state. Spinner options used here:
          - size="em": the ring takes the size and the colour of the text around it.
          - decorative: no role and no label, so it is hidden from assistive technology (aria-hidden). Use it where a text next
            to the ring, like "Kaydediliyor...", already says what is happening; without it the ring would be announced as a status.
          The ring keeps turning slowly under reduced motion. */}
      <Button variant="primary" icon={save} disabled={() => $saving} on:click={run}>
        {() => $saving ? <span sx={{ flex: ["row", "center"], gap: 1 }}><Spinner size="em" decorative /> Kaydediliyor…</span> : "Kaydet"}
      </Button>
      <span sx={{ color: "muted" }}>{() => ($saved ? `${$saved} kez kaydedildi` : "")}</span>
    </div>
  </Card>
}
