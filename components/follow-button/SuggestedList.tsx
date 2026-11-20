import { FollowButton, Avatar } from "march/ui"

// önerilen hesaplar: gizli hesapta istek gönderilir; takip sayısı altta
const people = [{ name: "Fotoğraf Atölyesi", private: false }, { name: "Kitap Kulübü", private: true }, { name: "Masa Oyunları", private: false }]

export function SuggestedList() {
  let $states: Record<string, string> = {}
  const count = () => Object.values($states).filter((s) => s !== "follow").length
  return <div sx={{ flex: "col", gap: 2 }}>
    {people.map((p) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Avatar name={p.name} size="sm" /><span sx={{ flex: "grow" }}>{p.name}</span>
      <FollowButton size="sm" name={p.name} private={p.private} state={($states[p.name] ?? "follow") as "follow"}
        onChange={(s: string) => $states = { ...$states, [p.name]: s }} />
    </div>)}
    <span sx={{ text: "sm", color: "muted" }}>{count()} hesap</span>
  </div>
}
