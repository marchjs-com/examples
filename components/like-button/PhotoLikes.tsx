// PhotoLikes: the real-life LikeButton example.
//
// What it shows: a list of three photos, each with its own like button and counter, and a total at the bottom that
// adds the base counts and the likes the visitor gave.
// When to use this pattern: posts, comments, products: any list where every row can be liked. LikeButton does not own
// the state: you keep which items are liked (here one array) and pass `liked` and `count` in, so the total and every
// button always agree.
//
// Animation: liking pops the heart and throws a burst of particles; both run on the motion engine, so the global speed,
// "Stop all" and reduced motion apply. Pass `pop={false}` or `burst={false}` to turn them off for one button.
// Accessibility: a real button with aria-pressed; each button gets its own `label` so a screen reader says which photo.
import { LikeButton } from "march/ui"

// The photos with the likes they already have.
const photos = [{ name: "Gün batımı", n: 120 }, { name: "Deniz", n: 87 }, { name: "Orman", n: 9 }]

export function PhotoLikes() {
  // The names of the photos the visitor liked, a signal. One array is enough because names are unique here.
  let $liked: string[] = []
  // The total: base counts plus one for every photo the visitor liked. It is read inside the view, so it follows $liked.
  const total = () => photos.reduce((s, p) => s + p.n, 0) + $liked.length
  return <div sx={{ flex: "col", gap: 2 }}>
    {photos.map((p) => <div sx={{ flex: ["row", "center", "between"] }}>
      <span>{p.name}</span>
      {/* liked: is this photo in the array? count: its base count plus our like. size="sm" fits a list row.
          onToggle(v): the new state; add the name to the array or remove it. */}
      <LikeButton liked={$liked.includes(p.name)} count={p.n + ($liked.includes(p.name) ? 1 : 0)} size="sm" label={`${p.name}: beğen`}
        onToggle={(v: boolean) => $liked = v ? [...$liked, p.name] : $liked.filter((x) => x !== p.name)} />
    </div>)}
    <span sx={{ text: "sm", color: "muted" }}>Toplam {total()} beğeni</span>
  </div>
}
