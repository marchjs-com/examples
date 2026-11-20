import { Media, Button, openMedia } from "march/ui"

// bir sohbetteki ekler: kare küçük resimler; basınca büyük önizleme pencerede açılır
const files = [
  { name: "gun-batimi.jpg", src: "/media/dusk.jpg" },
  { name: "dalga.webm", src: "/media/hadi-waves.webm" },
  { name: "silinen.jpg", src: "/media/silinen.jpg" },
]

// bir ek: küçük resim ve adı, altında aç düğmesi
const Attachment = (props: { name: string; src: string }) => <div sx={{ flex: "col", gap: 1 }}>
  <Media src={props.src} kind="auto" size="sm" alt={props.name} poster="/media/hadi-waves.jpg" fallback="Ek yok" />
  <Button size="sm" variant="ghost" on:click={() => openMedia(props.src, { title: props.name, poster: "/media/hadi-waves.jpg" })}>{props.name}</Button>
</div>

export function ChatAttachments() {
  return <div sx={{ flex: "col", gap: 2 }}>
    <span sx={{ color: "muted", text: "sm" }}>Ayşe 3 dosya gönderdi</span>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>{files.map((f) => <Attachment name={f.name} src={f.src} />)}</div>
  </div>
}
