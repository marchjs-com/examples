import { StoryRing } from "march/ui"

// arkadaş hikâyeleri: basılan halka "görüldü" olur
const friends = ["Elif Arslan", "Can Demir", "Deniz Kaya", "Ada Yıldız"]

export function FriendsTray() {
  let $seen: string[] = []
  return <div sx={{ flex: "row", gap: 3 }}>
    {friends.map((f, i) => <StoryRing name={f} state={$seen.includes(f) ? "seen" : i === 2 ? "close" : "new"} onClick={() => $seen = [...$seen, f]} />)}
  </div>
}
