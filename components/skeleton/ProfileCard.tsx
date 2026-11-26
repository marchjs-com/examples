// ProfileCard: the real-life Skeleton example.
//
// What it shows: a profile card while its data loads. A circle stands in for the avatar and two text lines for the name and
// the bio; after 1.5 seconds the real content replaces them in the same layout, so nothing jumps.
// When to use this pattern: cards, lists and detail pages that wait for a request. Draw the skeleton in the shape of the
// final content and swap it for the content when the data arrives.
import { Skeleton, Card, Avatar } from "march/ui"

export function ProfileCard() {
  // `let $user` is a March signal: null while loading, an object once the data has arrived. The setTimeout only imitates a
  // slow request; a real page would set $user when its fetch resolves.
  let $user: { name: string; bio: string } | null = null
  setTimeout(() => { $user = { name: "Ayşe Yılmaz", bio: "Ürün tasarımcısı · İstanbul · kahve ve bisiklet" } }, 1500)
  return <Card>
    {/* A function child is drawn again whenever $user changes: the loaded profile once it exists, the skeleton before that. */}
    {() => $user
      ? <div sx={{ flex: ["row", "center"], gap: 3 }}>
          <Avatar name={$user.name} size="lg" />
          <div sx={{ flex: "col", gap: 1 }}><b>{$user.name}</b><span sx={{ color: "muted" }}>{$user.bio}</span></div>
        </div>
      : <div sx={{ flex: ["row", "center"], gap: 3 }}>
          {/* shape="circle" height="lg": a round placeholder the size of the large avatar (decorative, aria-hidden). */}
          <Skeleton shape="circle" height="lg" />
          {/* lines={2}: two text lines, the last one shorter (shortLast is on by default). label: the accessible name of the
              lines, which also carry aria-busy="true", so a screen reader hears what is loading. The shimmer stops under
              reduced motion. */}
          <div sx={{ flex: "col", gap: 1, w: "full" }}><Skeleton lines={2} label="Profil yükleniyor" /></div>
        </div>}
  </Card>
}
