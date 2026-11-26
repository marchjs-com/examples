// FeedLab: the full-featured Feed example; it uses every prop at least once.
//
// Props shown here: posts, loading, skeletons, hasMore, onRefresh, onLoadMore, newCount, onShowNew, newPill, newColor,
// motion, variant, empty, labels, end, clamp, label, class, the PostCard events (onLike, onComment, onShare, onOpenMedia,
// onAuthor), menu and postProps, plus renderPost in the small feed at the top.
// Use it as a reference when you need one option: find the prop below and copy the line.
// The small buttons above the feed drive its states (new post waiting, empty, loading, flat variant) so you can try them.
// FeedLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Feed, Button, Badge, type Post } from "march/ui"
import { star } from "march/icons"

// Makes `k` sample posts with unique ids (l1, l2…); `seq` keeps the numbering going across calls.
let seq = 0
const make = (k: number): Post[] => Array.from({ length: k }, () => {
  const i = ++seq
  return { id: `l${i}`, author: { name: `Üye ${i}` }, time: Date.now() - i * 60_000, likes: i, comments: i % 3, shares: 0,
    text: `Gönderi ${i}: bugün kulüpte uzun bir gün geçti, akşam herkes bahçede buluştu ve yeni dönemin planları konuşuldu.` }
})

export function FeedLab() {
  // State of the lab: the posts, the loading flag, whether more pages exist, the posts waiting above (for the pill), the
  // flat/card variant toggle and a line that logs the last event so you can see the callbacks fire.
  let $posts: Post[] = make(2)
  let $loading = false
  let $more = true
  let $waiting: Post[] = []
  let $flat = false
  let $log = "-"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Controls that drive the feed: add a waiting post, empty the feed, toggle loading, toggle the variant. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $waiting = [...make(1), ...$waiting]}>Yeni gelsin</Button>
      <Button size="sm" variant="ghost" on:click={() => { $posts = []; $more = false }}>Boşalt</Button>
      <Button size="sm" variant="ghost" on:click={() => $loading = !$loading}>{$loading ? "Yüklendi" : "Yükleniyor"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $flat = !$flat}>{$flat ? "Kartlar" : "Düz"}</Button>
      <Badge tone="primary">{$log}</Badge>
    </div>
    {/* The first Feed shows renderPost: your own markup replaces the PostCard. Remember the list is virtual: only posts near
        the screen are drawn. end={false} removes the end mark and newPill={false} removes the new-posts pill. */}
    <Feed posts={[{ id: "own", author: { name: "Duyuru" }, time: Date.now(), text: "Kendi çizimin: renderPost", likes: 0 }]} end={false} newPill={false}
      renderPost={(p) => <p sx={{ p: 2, text: "bold", color: "brand-orange" }}>{p().text}</p>} />
    {/* The main Feed. Functions (() => $posts) are passed instead of values here so Feed reads the state itself; plain
        values work too (see HaikuFeed).
        - label: the accessible name of the list. class: added to the root so tests and CSS can find this instance.
        - loading + skeletons: the first-page loading state and how many skeleton posts it shows.
        - hasMore: false shows the end mark and stops onLoadMore.
        - onRefresh / onLoadMore: pull to refresh and the next page (here synchronous, so nothing to wait for).
        - newCount / onShowNew: the pill that offers the posts waiting above; newPill is the pill text as a function of the
          count (it could also be true / false) and newColor its colour token.
        - motion={false}: the pill appears at once, nothing animates. The default is on, and then the motion engine already
          honours reduced motion, the global speed and "Stop all".
        - variant: "card" (each post in a card) or "flat" (a plain list).
        - empty: what shows when there are no posts. labels: replaces every built-in text. end: your own end mark.
        - clamp={1}: passed to every PostCard; it shortens long post text (the lab's posts are long, so you see the effect).
        - onLike(on, post): `on` is the new like state; we update the post (optimistic update).
        - onComment, onShare, onOpenMedia(index), onAuthor: the other PostCard events; here they only write to the log line.
        - menu: extra items of each post's "more" menu; onSelect receives the post.
        - postProps: any other PostCard props for every post (here: no avatar, a like colour and a custom "like" label). */}
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
