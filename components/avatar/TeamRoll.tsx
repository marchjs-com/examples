import { Avatar, Button } from "march/ui"

// takım yoklaması: kim geldiyse avatarına basın; gelenlerin rengi koyulaşır
const team = ["Elif Arslan", "Can Demir", "Deniz Kaya", "Ada Yıldız", "Mert Öz"]

export function TeamRoll() {
  let $here: string[] = []
  const toggle = (n: string) => $here = $here.includes(n) ? $here.filter((x) => x !== n) : [...$here, n]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      {team.map((n) => <Button variant="ghost" pressed={$here.includes(n)} on:click={() => toggle(n)} aria-label={n} sx={{ p: 1 }}>
        <Avatar name={n} size="lg" color={$here.includes(n) ? undefined : "neutral"} />
      </Button>)}
    </div>
    <span sx={{ text: "sm", color: "muted" }}>{$here.length} / {team.length} kişi geldi</span>
  </div>
}
