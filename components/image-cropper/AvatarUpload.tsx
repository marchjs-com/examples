// AvatarUpload: the real-life ImageCropper example.
//
// What it shows: a profile photo flow. Pick a file (or start from the sample), crop it to a square, and Save puts the cropped
// result into the Avatar at 256 pixels wide.
// When to use this pattern: you need the cropped pixels, not only the crop state. `api` hands you the cropper's methods:
// `toBlob(type, quality, width)` draws the result on a canvas and returns a file-like Blob you can upload or show.
// Keyboard: the crop area is focusable (arrows move, + and - zoom, [ ] and R turn, F mirrors).
import { ImageCropper, Button, Card, Avatar, toast, type ImageCropperApi, FileUpload } from "march/ui"

// A tiny inline SVG, turned into a blob: URL (an SVG given as a data: URL is not treated as safe and is blocked, and the
// cropper needs a source its canvas can read).
const SAMPLE = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><rect width="160" height="120" fill="#4cc3e0"/><circle cx="80" cy="52" r="24" fill="#f4ecd8"/><path d="M40 120q40-50 80 0z" fill="#a3338c"/></svg>`], { type: "image/svg+xml" }))

export function AvatarUpload() {
  // $src is the image being cropped, $avatar the saved result, and `api` the cropper's methods (set through the api prop).
  let $src = SAMPLE
  let $avatar = ""
  let api: ImageCropperApi | undefined
  // A chosen file becomes an object URL, which is a source the cropper can read.
  const choose = (f: File | null) => { if (f) $src = URL.createObjectURL(f) }
  // Draws the current crop as a PNG, 256 pixels wide, with api.toBlob. It returns nothing if the image has not loaded yet,
  // so we tell the user. Otherwise the blob becomes the avatar.
  const save = async () => {
    const blob = await api?.toBlob("image/png", undefined, 256)
    if (!blob) { toast("Görsel henüz yüklenmedi"); return }
    $avatar = URL.createObjectURL(blob)
    toast("Profil fotoğrafı güncellendi")
  }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        {/* The result: Avatar shows the cropped picture, or the initials while there is none. */}
        <Avatar name="Deniz Kaya" src={$avatar || undefined} size="lg" />
        {/* FileUpload only picks the file; onChange gives it to `choose`. */}
        <FileUpload accept="image/*" label="Fotoğraf seç ya da bırak" onChange={choose} />
      </div>
      {/* - aspect={1}: a square frame; aspects={false}: no ratio choices. preview={false}: no live preview, because the Avatar is
            the preview. api: receives the cropper's methods (toCanvas, toBlob, reset). */}
      <ImageCropper src={$src} alt="Profil fotoğrafı" aspect={1} aspects={false} preview={false} api={(a) => api = a} />
      {/* Save runs the crop and updates the avatar. */}
      <Button on:click={save}>Kaydet</Button>
    </div>
  </Card>
}
