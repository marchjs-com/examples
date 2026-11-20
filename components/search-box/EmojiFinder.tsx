import { SearchBox, Card } from "march/ui"

// emoji bulucu: her tuşta hemen süzer (debounce 0); bulunanlar koyu kartta büyük büyük dizilir
const EMOJIS = [
  { char: "❤️", name: "kalp" }, { char: "🔥", name: "ateş" }, { char: "🎉", name: "kutlama" }, { char: "☕", name: "kahve" },
  { char: "🌙", name: "ay gece" }, { char: "☀️", name: "güneş" }, { char: "🚀", name: "roket" }, { char: "🍕", name: "pizza" },
  { char: "🐱", name: "kedi" }, { char: "🎧", name: "müzik kulaklık" }, { char: "⚡", name: "şimşek" }, { char: "🌊", name: "deniz dalga" },
]

export function EmojiFinder() {
  let $q = ""
  const $found = EMOJIS.filter((e) => e.name.includes($q.toLocaleLowerCase("tr")))
  return <Card m:theme="night">
    <SearchBox bind:value={$q} debounce={0} size="sm" placeholder="kalp, roket, kahve…" label="Emoji ara" />
    <div sx={{ flex: ["row", "wrap"], gap: 2, text: "2xl", p: 2 }}>
      {$found.length ? $found.map((e) => <span title={e.name}>{e.char}</span>) : <span sx={{ text: "sm", color: "muted" }}>Böyle bir emoji yok 🤷</span>}
    </div>
  </Card>
}
