import { ImageCropper, Button, Card, Avatar, toast, type ImageCropperApi, FileUpload } from "march/ui"

// profil fotoğrafı: dosya seç (ya da örnekle başla), kare kırp, "Kaydet" kırpılmış hâli 256 px genişlikte avatara koyar
// küçük bir satır içi SVG; blob: adresi olarak (data: SVG güvenli sayılmaz, engellenir)
const SAMPLE = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><rect width="160" height="120" fill="#4cc3e0"/><circle cx="80" cy="52" r="24" fill="#f4ecd8"/><path d="M40 120q40-50 80 0z" fill="#a3338c"/></svg>`], { type: "image/svg+xml" }))

export function AvatarUpload() {
  let $src = SAMPLE
  let $avatar = ""
  let api: ImageCropperApi | undefined
  const choose = (f: File | null) => { if (f) $src = URL.createObjectURL(f) }
  const save = async () => {
    const blob = await api?.toBlob("image/png", undefined, 256)
    if (!blob) { toast("Görsel henüz yüklenmedi"); return }
    $avatar = URL.createObjectURL(blob)
    toast("Profil fotoğrafı güncellendi")
  }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <Avatar name="Deniz Kaya" src={$avatar || undefined} size="lg" />
        <FileUpload accept="image/*" label="Fotoğraf seç ya da bırak" onChange={choose} />
      </div>
      <ImageCropper src={$src} alt="Profil fotoğrafı" aspect={1} aspects={false} preview={false} api={(a) => api = a} />
      <Button on:click={save}>Kaydet</Button>
    </div>
  </Card>
}
