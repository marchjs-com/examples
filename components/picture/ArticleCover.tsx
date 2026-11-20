import { Picture, Card, Badge } from "march/ui"

// bir blog yazısının kapağı: ilk ekranda olduğu için hemen yüklenir (eager), boyutu bilindiğinden sayfa kaymaz;
// resim gelmezse yerinde bir yedek metin
const posts = [
  { title: "Sinyallerle tanışın", cover: { src: "/media/dusk.jpg", alt: "Gün batımı", width: 1200, height: 800 } },
  { title: "Kayıp kapak", cover: { src: "/media/kayip-kapak.jpg", alt: "Kapak", width: 1200, height: 800 } },
]

export function ArticleCover() {
  let $loaded = 0
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {posts.map((p, i) => <Card title={p.title}>
      <Picture source={p.cover} loading={i === 0 ? "eager" : "lazy"} fit="cover" fallback="Kapak yüklenemedi" onLoad={() => $loaded++} />
      <div sx={{ mt: 2 }}><Badge tone={i === 0 ? "success" : "neutral"}>{i === 0 ? "Öne çıkan" : "Arşiv"}</Badge></div>
    </Card>)}
    <span sx={{ color: "muted", text: "sm" }}>Yüklenen kapak: {() => $loaded}</span>
  </div>
}
