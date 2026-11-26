// EmojiFinder: the creative-minimal SearchBox example.
//
// What it shows: a live filter. Every key you type narrows a grid of emoji at once, and a friendly message appears
// when nothing matches. The whole thing is one SearchBox, one signal and one filtered list.
// When to use this pattern: filtering a small, in-memory list while the user types. `debounce={0}` is right here
// because filtering 12 items is free; keep the default 250 ms delay when each search costs a request.
import { SearchBox, Card } from "march/ui"

// The data: the emoji and a lower-case name (or two words) to match against.
const EMOJIS = [
  { char: "❤️", name: "kalp" }, { char: "🔥", name: "ateş" }, { char: "🎉", name: "kutlama" }, { char: "☕", name: "kahve" },
  { char: "🌙", name: "ay gece" }, { char: "☀️", name: "güneş" }, { char: "🚀", name: "roket" }, { char: "🍕", name: "pizza" },
  { char: "🐱", name: "kedi" }, { char: "🎧", name: "müzik kulaklık" }, { char: "⚡", name: "şimşek" }, { char: "🌊", name: "deniz dalga" },
]

export function EmojiFinder() {
  // `let $q` is a March signal that holds the text of the box. `const $found` is a value derived from it: it is
  // computed again whenever $q changes. toLocaleLowerCase("tr") lower-cases with Turkish rules, so the capital "I"
  // becomes the dotless Turkish i, as a Turkish user expects.
  let $q = ""
  const $found = EMOJIS.filter((e) => e.name.includes($q.toLocaleLowerCase("tr")))
  // m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme.
  return <Card m:theme="night">
    {/* SearchBox options used here:
        - bind:value={$q}: two-way binding, so the box and the signal always agree.
        - debounce={0}: no delay; the value is written on every keystroke. The default is 250 ms.
        - size="sm": the smaller box.
        - placeholder: the hint shown while empty.
        - label: the accessible name of the input (without it the placeholder is used).
        The clear button (an IconButton with its own name) shows while there is text, and Escape clears a filled box;
        both come with the component. */}
    <SearchBox bind:value={$q} debounce={0} size="sm" placeholder="kalp, roket, kahve…" label="Emoji ara" />
    {/* The result: each emoji is a span with a title (a tooltip with its name); with no match a muted message is
        shown instead. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2, text: "2xl", p: 2 }}>
      {$found.length ? $found.map((e) => <span title={e.name}>{e.char}</span>) : <span sx={{ text: "sm", color: "muted" }}>Böyle bir emoji yok 🤷</span>}
    </div>
  </Card>
}
