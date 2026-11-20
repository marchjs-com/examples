import { FollowButton, Card } from "march/ui"

// kulübe katıl: kendi metinleri ve yeşil renk; koyu kartta
export function ClubJoin() {
  let $state = "follow"
  return <Card m:theme="night">
    <strong>HADİ Koşu Kulübü</strong>
    <FollowButton state={$state as "follow"} onChange={(s: string) => $state = s} name="HADİ Koşu Kulübü"
      labels={{ follow: "Katıl", following: "Üyesin" }} m:color="brand-green" />
  </Card>
}
