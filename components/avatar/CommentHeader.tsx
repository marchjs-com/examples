import { Avatar } from "march/ui"

// yorum başlığı: resimli kullanıcı, resmi yüklenemeyen (baş harfler) ve misafir (ikon)
import { user } from "march/icons"

const Row = (props: { avatar: unknown; name: string; text: string }) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
  {props.avatar}<div><strong>{props.name}</strong><p sx={{ text: "sm", color: "muted" }}>{props.text}</p></div>
</div>

export function CommentHeader() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row avatar={<Avatar name="Fotoğraf Atölyesi" src="/media/social/sunset.svg" />} name="Fotoğraf Atölyesi" text="Harika bir kare!" />
    <Row avatar={<Avatar name="Kitap Kulübü" src="/olmayan.jpg" />} name="Kitap Kulübü" text="Resim yüklenemedi: baş harfler görünür" />
    <Row avatar={<Avatar icon={user} label="Misafir" color="neutral" />} name="Misafir" text="Giriş yapmadan yorum" />
  </div>
}
