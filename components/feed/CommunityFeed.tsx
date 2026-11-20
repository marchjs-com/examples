import { Feed, toast, type Post } from "march/ui"

// bir topluluk akışı: ilk sayfa ağdan gelir (iskelet kartlar), sona kaydırınca sonraki sayfa, aşağı çekince yenileme;
// beğeniler iyimser güncellenir. Ağ yerine bir bekleme kullanılır
const PHOTO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mPY/f2C0tE4BrFUE5FgXQAtngULJa1nqAAAAABJRU5ErkJggg=="
const CLUBS = ["HADİ Koşu Kulübü", "Pazar Bisiklet Grubu", "Fotoğraf Atölyesi", "Kitap Kulübü"]
const TEXTS = ["Yeni rota denendi: orman yolu 8 km.", "Akşam turu yağmur yüzünden yarına kaldı.", "Atölyede analog banyo günü!", "Ayın kitabı belli oldu."]
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const page = (from: number): Post[] => Array.from({ length: 4 }, (_, i) => {
  const k = from + i
  return { id: `c${k}`, author: { name: CLUBS[k % 4]! }, time: Date.now() - k * 40 * 60_000, text: TEXTS[k % 4], likes: 10 + k * 7, comments: k % 5,
    media: k % 3 === 0 ? [{ src: PHOTO, alt: "Orman" }] : undefined }
})

export function CommunityFeed() {
  let $posts: Post[] = []
  let $loading = true
  let $pages = 1
  void wait(800).then(() => { $posts = page(0); $loading = false })
  return <div sx={{ flex: "col", gap: 2 }}>
    <Feed posts={$posts} loading={$loading} hasMore={$pages < 3} label="Topluluk akışı"
      onRefresh={() => wait(600).then(() => { $posts = page(0); $pages = 1; toast("Akış yenilendi") })}
      onLoadMore={() => wait(600).then(() => { $posts = [...$posts, ...page($posts.length)]; $pages++ })}
      onLike={(on, p) => { $posts = $posts.map((x) => (x.id === p.id ? { ...x, liked: on, likes: x.likes + (on ? 1 : -1) } : x)) }}
      onComment={(p) => toast(`${p.author.name}: yorumlar`)} />
  </div>
}
