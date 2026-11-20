import { FileUpload, Avatar, Card } from "march/ui"

// profil fotoğrafı: bir görsel bırak ya da seç; anında yuvarlak avatar olur, adı ve boyutu yanında
const NO_PHOTO: unknown = null

export function AvatarDrop() {
  let $photo = NO_PHOTO
  const $file = $photo instanceof File ? $photo : null
  const $url = $file ? URL.createObjectURL($file) : null
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 3 }}>
      <FileUpload bind:value={$photo} accept="image/*" maxSize={2_000_000} preview={false} label="Fotoğrafını buraya bırak" />
      <div sx={{ flex: ["row", "center"], gap: 3 }}>
        <Avatar src={$url} name="Deniz Yılmaz" size="xl" />
        <span sx={{ color: $file ? "brand-green" : "muted" }}>
          {$file ? `${$file.name} · ${Math.round($file.size / 1024)} KB` : "Henüz fotoğraf yok: baş harfler gösteriliyor"}
        </span>
      </div>
    </div>
  </Card>
}
