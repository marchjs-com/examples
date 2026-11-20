import { LikeButton } from "march/ui"

// fotoğraf beğenileri: üç fotoğraf, her birinin kendi sayacı; toplam altta
const photos = [{ name: "Gün batımı", n: 120 }, { name: "Deniz", n: 87 }, { name: "Orman", n: 9 }]

export function PhotoLikes() {
  let $liked: string[] = []
  const total = () => photos.reduce((s, p) => s + p.n, 0) + $liked.length
  return <div sx={{ flex: "col", gap: 2 }}>
    {photos.map((p) => <div sx={{ flex: ["row", "center", "between"] }}>
      <span>{p.name}</span>
      <LikeButton liked={$liked.includes(p.name)} count={p.n + ($liked.includes(p.name) ? 1 : 0)} size="sm" label={`${p.name}: beğen`}
        onToggle={(v: boolean) => $liked = v ? [...$liked, p.name] : $liked.filter((x) => x !== p.name)} />
    </div>)}
    <span sx={{ text: "sm", color: "muted" }}>Toplam {total()} beğeni</span>
  </div>
}
