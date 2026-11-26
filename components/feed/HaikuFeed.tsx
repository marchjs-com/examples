// HaikuFeed: the creative-minimal Feed example.
//
// What it shows: a feed of three-line poems, each drawn by your own markup instead of the default PostCard
// (`renderPost`), with the "N new poems" pill that Feed shows when posts are waiting above.
// When to use this pattern: the Feed machinery (virtual list, pill, end mark) is useful for content that is not a social
// post: events, notes, poems. Give renderPost a function and Feed keeps everything else.
// Motion: the pill's entrance and the scroll to the top run on the motion engine, so reduced motion and "Stop all" apply;
// `motion={false}` on Feed switches it off for this one feed.
import { Feed, Button, type Post } from "march/ui"

// Four poems of three lines each; they are used in turn.
const LINES = [
  ["Sabah sisinde", "martı tek başına", "denizi çizer"],
  ["Çay buğusunda", "eski bir şarkı döner", "pencere açık"],
  ["Kedi uykuda", "güneş halıya düşmüş", "saat durmuş sanki"],
  ["Yağmur damlası", "kaldırımda bir harita", "eve dönüş yolu"],
]
// A counter that gives every poem a unique id and picks the next text.
let n = 0
const poem = (): Post => { const l = LINES[n % LINES.length]!; n++; return { id: `h${n}`, author: { name: "Şiir Defteri" }, time: Date.now(), text: l.join("\n"), likes: 0 } }

export function HaikuFeed() {
  // $posts is the feed itself; $waiting holds poems that arrived "later". Feed does not show waiting posts: it only shows
  // the pill, and you decide when to merge them (onShowNew below).
  let $posts: Post[] = [poem(), poem()]
  let $waiting: Post[] = []
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Simulates a new post arriving: it goes into the waiting list, not into the feed yet. */}
    <Button size="sm" variant="ghost" on:click={() => $waiting = [poem(), ...$waiting]}>Yeni şiir</Button>
    {/* - newCount: how many posts wait; above 0 the pill appears (its text comes from labels.newPosts).
        - newColor: the pill's colour token.
        - end: your own end mark instead of the built-in text (false would remove it).
        - labels.newPosts(count): the pill text as a function of the count.
        - onShowNew: called when the reader presses the pill; we put the waiting poems first and clear the list. Feed then
          scrolls to the top.
        - renderPost: draw each post yourself. `p` is an accessor (call p() to read the post), so the output stays reactive. */}
    <Feed posts={$posts} newCount={$waiting.length} newColor="brand-purple" end={<i>Defterin sonu ✒️</i>}
      labels={{ newPosts: (c) => `${c} yeni şiir` }}
      onShowNew={() => { $posts = [...$waiting, ...$posts]; $waiting = [] }}
      renderPost={(p) => <blockquote sx={{ p: 3, text: ["lg", "center"] }}>{p().text?.split("\n").map((line) => <div>{line}</div>)}</blockquote>} />
  </div>
}
