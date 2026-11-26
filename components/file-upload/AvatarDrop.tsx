// AvatarDrop: the creative-minimal FileUpload example.
//
// What it shows: a profile photo. Drop or choose an image and it instantly becomes a round avatar, with the file's name
// and size beside it. Until then the Avatar shows the initials of the name.
// When to use this pattern: a single image whose result you want to show in your own way. FileUpload only collects the
// file; what you draw from it is up to you (here an Avatar, with the built-in thumbnail turned off).
// Keyboard: the drop zone is a role="button"; Enter or Space opens the file chooser, so keyboard users can pick a file too.
import { FileUpload, Avatar, Card } from "march/ui"

// FileUpload's value is a File (or null). It is typed unknown because the component can also hold upload results.
const NO_PHOTO: unknown = null

export function AvatarDrop() {
  // $photo holds the chosen file (bind:value keeps it in sync with the drop zone).
  let $photo = NO_PHOTO
  // Derived values: they recompute whenever $photo changes. The File is narrowed with instanceof, and an object URL
  // is made so the Avatar can show the picture.
  const $file = $photo instanceof File ? $photo : null
  const $url = $file ? URL.createObjectURL($file) : null
  // Card gives a framed surface; m:theme="night" draws this subtree in the dark colour theme, whatever the page theme is.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* - bind:value: two-way link to $photo.
          - accept="image/*": only images are kept; others are rejected with a message in the drop zone.
          - maxSize: a size limit in bytes (2 MB); bigger files are rejected the same way.
          - preview={false}: no built-in thumbnail, because the Avatar below is the preview.
          - label: the text inside the drop zone. */}
      <FileUpload bind:value={$photo} accept="image/*" maxSize={2_000_000} preview={false} label="Fotoğrafını buraya bırak" />
      <div sx={{ flex: ["row", "center"], gap: 3 }}>
        {/* Avatar shows `src` when there is one and falls back to the initials of `name` when src is null. */}
        <Avatar src={$url} name="Deniz Yılmaz" size="xl" />
        <span sx={{ color: $file ? "brand-green" : "muted" }}>
          {$file ? `${$file.name} · ${Math.round($file.size / 1024)} KB` : "Henüz fotoğraf yok: baş harfler gösteriliyor"}
        </span>
      </div>
    </div>
  </Card>
}
