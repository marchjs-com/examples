// SearchPill: the creative-minimal Joined example.
//
// What it shows: a pill-shaped search: the input and the button are drawn as one piece, with rounded corners only on the outside.
// When to use this pattern: controls that act as one (a field and its button). Joined removes the borders, corners and
// shadows of the parts and draws one frame, one radius and a line between them. Only the direct children are joined.
// Accessibility: Joined is a plain div; for parts that form one control, add role="group" and an aria-label (see JoinedLab).
// Here the input has its own aria-label.
import { Joined, TextInput, Button } from "march/ui"

export function SearchPill() {
  // $q is what is typed, $sent what was searched.
  let $q = ""
  let $sent = ""
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* direction="horizontal": side by side. radius="full": fully rounded ends (a pill). */}
    <Joined direction="horizontal" radius="full">
      {/* The field: bind:value keeps $q in sync; aria-label names it since there is no visible label. */}
      <TextInput placeholder="Şehir ara…" aria-label="Şehir" bind:value={$q} />
      {/* The button: pressing it copies the query into $sent. */}
      <Button variant="primary" on:click={() => $sent = $q}>Ara</Button>
    </Joined>
    <span sx={{ text: "sm", color: "muted" }}>{$sent ? `“${$sent}” aranıyor` : "Bir şehir yazın"}</span>
  </div>
}
