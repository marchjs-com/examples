// ProfileCover: the real-life GradientEditor example.
//
// What it shows: a profile card whose cover is a gradient. The Edit button opens the editor below the card, the cover changes
// while you edit, and Save closes the editor and shows a toast.
// When to use this pattern: letting a user design a background. Keep the gradient as a CSS string in state, draw it with
// `style={{ background }}`, and show the editor only while editing so the page stays calm.
// Accessibility: give the editor an aria-label (it has no visible label here); stops and the dial are sliders.
import { GradientEditor, Card, Avatar, Button, toast } from "march/ui"

export function ProfileCover() {
  // $cover is the gradient (a CSS string); $editing says whether the editor is shown.
  let $cover = "linear-gradient(120deg, #1d9ad6 0%, #78be3a 100%)"
  let $editing = false
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* The cover: the CSS string from the editor is used directly as the background. */}
      <div style={{ background: $cover, height: "5rem", borderRadius: "0.75rem" }} />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        {/* Avatar with the person's initials, the name, and a button that toggles the editor. */}
        <Avatar name="Elif Arslan" />
        <b>Elif Arslan</b>
        <Button size="sm" variant="ghost" on:click={() => $editing = !$editing}>{$editing ? "Kapat" : "Kapağı düzenle"}</Button>
      </div>
      {/* The editor only exists while editing. preview={false} and hint={false} remove the big preview and the hint under the
          stop bar: the cover itself is the preview, and this keeps the panel short. Everything else (type, angle, stops, presets)
          stays. */}
      {$editing && <div sx={{ flex: "col", gap: 2 }}>
        <GradientEditor bind:value={$cover} preview={false} hint={false} aria-label="Kapak gradyanı" />
        <Button on:click={() => { $editing = false; toast("Kapak kaydedildi") }}>Kaydet</Button>
      </div>}
    </div>
  </Card>
}
