import { Feed, Button, Badge, type Post } from "march/ui"
import { star } from "march/icons"

// Feed'in bütün özellikleri: gönderiler, ilk yükleme (iskelet sayısı), sonraki sayfa ve yenileme, bekleyen yeni
// gönderiler (hap: kendi içeriği ve rengi), görünüm, boş akış içeriği, erişilebilir ad, kendi metinler, bitiş işareti,
// hareket, sınıf ve her PostCard'a giden olaylar ve özellikler (onLike, onComment, onShare, onOpenMedia, onAuthor,
// menu, clamp, postProps); renderPost üstteki küçük akışta
let seq = 0
const make = (k: number): Post[] => Array.from({ length: k }, () => {
  const i = ++seq
  return { id: `l${i}`, author: { name: `Üye ${i}` }, time: Date.now() - i * 60_000, likes: i, comments: i % 3, shares: 0,
    text: `Gönderi ${i}: bugün kulüpte uzun bir gün geçti, akşam herkes bahçede buluştu ve yeni dönemin planları konuşuldu.` }
})

export function FeedLab() {
  let $posts: Post[] = make(2)
  let $loading = false
  let $more = true
  let $waiting: Post[] = []
  let $flat = false
  let $log = "-"
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $waiting = [...make(1), ...$waiting]}>Yeni gelsin</Button>
      <Button size="sm" variant="ghost" on:click={() => { $posts = []; $more = false }}>Boşalt</Button>
      <Button size="sm" variant="ghost" on:click={() => $loading = !$loading}>{$loading ? "Yüklendi" : "Yükleniyor"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $flat = !$flat}>{$flat ? "Kartlar" : "Düz"}</Button>
      <Badge tone="primary">{$log}</Badge>
    </div>
    {/* üstte: sanal liste yalnız ekrana yakın olanı çizer */}
    <Feed posts={[{ id: "own", author: { name: "Duyuru" }, time: Date.now(), text: "Kendi çizimin: renderPost", likes: 0 }]} end={false} newPill={false}
      renderPost={(p) => <p sx={{ p: 2, text: "bold", color: "brand-orange" }}>{p().text}</p>} />
    <Feed class="lab-feed" label="Laboratuvar akışı" posts={() => $posts} loading={() => $loading} skeletons={2} hasMore={() => $more}
      onRefresh={() => { $posts = make(2); $log = "yenilendi" }}
      onLoadMore={() => { $posts = [...$posts, ...make(2)]; $more = $posts.length < 6 }}
      newCount={() => $waiting.length} onShowNew={() => { $posts = [...$waiting, ...$posts]; $waiting = []; $log = "yeniler eklendi" }}
      newPill={(c) => `⬆ ${c} taze gönderi`} newColor="brand-green" motion={false} variant={() => ($flat ? "flat" : "card")}
      empty={<p sx={{ text: "center", color: "muted" }}>Burada henüz kimse yazmadı 🌱</p>}
      labels={{ loading: "Akış yükleniyor", loadingMore: "Daha fazlası geliyor", empty: "Boş", end: "Hepsi bu kadar" }}
      end={<b>— son —</b>} clamp={1}
      onLike={(on, p) => { $posts = $posts.map((x) => (x.id === p.id ? { ...x, liked: on, likes: x.likes + (on ? 1 : -1) } : x)); $log = `beğeni: ${p.author.name}` }}
      onComment={(p) => $log = `yorum: ${p.author.name}`} onShare={(p) => $log = `paylaş: ${p.author.name}`}
      onOpenMedia={(i) => $log = `fotoğraf ${i + 1}`} onAuthor={(p) => $log = `yazar: ${p.author.name}`}
      menu={[{ label: "Kaydet", icon: star, onSelect: (p: Post) => $log = `kaydedildi: ${p.id}` }]}
      postProps={{ avatar: false, likeColor: "brand-green", labels: { like: "Beğen" } }} />
  </div>
}
