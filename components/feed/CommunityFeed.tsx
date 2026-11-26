// CommunityFeed: the real-life Feed example.
//
// What it shows: a club's community feed. The first page arrives from the "network" (skeleton posts show meanwhile),
// reaching the end loads the next page, pulling down refreshes, and likes update at once (optimistic update).
// The network is faked with a short timer so the example runs on its own.
// When to use this pattern: any social or news timeline where posts load in pages. Feed puts every PostCard in a
// virtual list, so only the posts near the viewport are in the DOM, however long the feed grows.
// Motion: the pull-to-refresh and the new-posts pill run on the motion engine (reduced motion and "Stop all" apply);
// pass `motion={false}` to Feed to make the pill appear at once.
import { Feed, toast, type Post } from "march/ui"

// Sample data: a tiny placeholder image (a base64 data URL, so no file is needed) and four clubs with matching texts.
const PHOTO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mPY/f2C0tE4BrFUE5FgXQAtngULJa1nqAAAAABJRU5ErkJggg=="
const CLUBS = ["HADİ Koşu Kulübü", "Pazar Bisiklet Grubu", "Fotoğraf Atölyesi", "Kitap Kulübü"]
const TEXTS = ["Yeni rota denendi: orman yolu 8 km.", "Akşam turu yağmur yüzünden yarına kaldı.", "Atölyede analog banyo günü!", "Ayın kitabı belli oldu."]
// A stand-in for a network call: resolves after `ms` milliseconds. A real app would call fetch() here.
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
// Builds one page of four posts starting at index `from`. A Post needs an id, an author, a time and likes; text, comments and
// media are optional. Every third post gets a photo so you can see how media renders.
const page = (from: number): Post[] => Array.from({ length: 4 }, (_, i) => {
  const k = from + i
  return { id: `c${k}`, author: { name: CLUBS[k % 4]! }, time: Date.now() - k * 40 * 60_000, text: TEXTS[k % 4], likes: 10 + k * 7, comments: k % 5,
    media: k % 3 === 0 ? [{ src: PHOTO, alt: "Orman" }] : undefined }
})

export function CommunityFeed() {
  // Reactive state ($ prefix): when one of these changes, only the places in the JSX that read it update.
  // $posts is the list shown, $loading drives the skeleton posts of the first page, $pages counts pages loaded.
  let $posts: Post[] = []
  let $loading = true
  let $pages = 1
  // The first page "arrives" after 800 ms; until then loading={true} shows skeleton posts instead of an empty list.
  void wait(800).then(() => { $posts = page(0); $loading = false })
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Feed props used here:
        - posts / loading: the data and the first-page loading state (skeleton posts while true).
        - hasMore: while true, reaching the end calls onLoadMore; false shows the end mark and stops loading. Here three
          pages are allowed.
        - label: the accessible name of the list for screen readers.
        - onRefresh: pull to refresh; it returns a promise. Without onRefresh
          pulling is off (keyboard users get a Refresh button either way).
        - onLoadMore: called once per page near the end; it returns a promise, and the bottom skeleton shows while a page loads.
        - onLike(on, post): the optimistic update: we flip `liked` and adjust the count right away, no waiting for a server.
        - onComment(post): called when the comment button of a PostCard is pressed; here it just shows a toast. */}
    <Feed posts={$posts} loading={$loading} hasMore={$pages < 3} label="Topluluk akışı"
      onRefresh={() => wait(600).then(() => { $posts = page(0); $pages = 1; toast("Akış yenilendi") })}
      onLoadMore={() => wait(600).then(() => { $posts = [...$posts, ...page($posts.length)]; $pages++ })}
      onLike={(on, p) => { $posts = $posts.map((x) => (x.id === p.id ? { ...x, liked: on, likes: x.likes + (on ? 1 : -1) } : x)) }}
      onComment={(p) => toast(`${p.author.name}: yorumlar`)} />
  </div>
}
