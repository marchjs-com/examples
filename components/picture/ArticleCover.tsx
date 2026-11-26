// ArticleCover: the real-life Picture example.
//
// The covers of two blog posts. The first is on the first screen, so it loads at once (eager); the other loads lazily.
// Both have a known size, so the page does not jump when they arrive, and the second one has a broken address to show
// the fallback text. Use this pattern for the images of cards and articles.
import { Picture, Card, Badge } from "march/ui"

// A picture object: src, alt (the text of the image for screen readers), and width / height (the space is reserved before
// the image loads, so nothing jumps). The second address does not exist on purpose.
const posts = [
  { title: "Sinyallerle tanışın", cover: { src: "/media/dusk.jpg", alt: "Gün batımı", width: 1200, height: 800 } },
  { title: "Kayıp kapak", cover: { src: "/media/kayip-kapak.jpg", alt: "Kapak", width: 1200, height: 800 } },
]

export function ArticleCover() {
  // How many covers have loaded; onLoad adds one.
  let $loaded = 0
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {posts.map((p, i) => <Card title={p.title}>
      {/* - source: the picture object fills src, alt, width and height.
          - loading: "eager" loads at once and gives the image high fetch priority (right for the first screen); the
            default "lazy" waits until the image is near the viewport.
          - fit="cover": the image fills its box and is cropped to fit (without fit it keeps its natural size, never wider
            than the box).
          - fallback: replaces the image when it fails to load (the alt text stays as its accessible name).
          - onLoad: called when the image has loaded (the counter below). */}
      <Picture source={p.cover} loading={i === 0 ? "eager" : "lazy"} fit="cover" fallback="Kapak yüklenemedi" onLoad={() => $loaded++} />
      <div sx={{ mt: 2 }}><Badge tone={i === 0 ? "success" : "neutral"}>{i === 0 ? "Öne çıkan" : "Arşiv"}</Badge></div>
    </Card>)}
    <span sx={{ color: "muted", text: "sm" }}>Yüklenen kapak: {() => $loaded}</span>
  </div>
}
