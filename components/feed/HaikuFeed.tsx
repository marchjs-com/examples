import { Feed, Button, type Post } from "march/ui"

// üç dizelik şiirler akışı: her gönderi kendi kartıyla çizilir (renderPost); "Yeni şiir" yukarıda bekleyen
// gönderi hapını gösterir, hapa basınca şiirler akışın başına katılır
const LINES = [
  ["Sabah sisinde", "martı tek başına", "denizi çizer"],
  ["Çay buğusunda", "eski bir şarkı döner", "pencere açık"],
  ["Kedi uykuda", "güneş halıya düşmüş", "saat durmuş sanki"],
  ["Yağmur damlası", "kaldırımda bir harita", "eve dönüş yolu"],
]
let n = 0
const poem = (): Post => { const l = LINES[n % LINES.length]!; n++; return { id: `h${n}`, author: { name: "Şiir Defteri" }, time: Date.now(), text: l.join("\n"), likes: 0 } }

export function HaikuFeed() {
  let $posts: Post[] = [poem(), poem()]
  let $waiting: Post[] = []
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button size="sm" variant="ghost" on:click={() => $waiting = [poem(), ...$waiting]}>Yeni şiir</Button>
    <Feed posts={$posts} newCount={$waiting.length} newColor="brand-purple" end={<i>Defterin sonu ✒️</i>}
      labels={{ newPosts: (c) => `${c} yeni şiir` }}
      onShowNew={() => { $posts = [...$waiting, ...$posts]; $waiting = [] }}
      renderPost={(p) => <blockquote sx={{ p: 3, text: ["lg", "center"] }}>{p().text?.split("\n").map((line) => <div>{line}</div>)}</blockquote>} />
  </div>
}
