// ClubJoin: the creative-minimal FollowButton example.
//
// What it shows: a join-the-club button with your own words (Turkish "join" / "member") and a green colour, on a dark card.
// When to use this pattern: any follow, join or subscribe toggle. The component keeps the morph (the width springs between the
// two labels, the fill turns into an outline, the + turns into a tick) whatever words you give it.
// Motion: the morph and the small colour burst on a new follow run on the motion engine, so reduced motion and "Stop all"
// apply; the component's own `morph={false}` and `burst={false}` turn them off (see FollowButtonLab).
import { FollowButton, Card } from "march/ui"

export function ClubJoin() {
  // The state is "follow", "following" or "requested"; here the parent owns it, the button only asks to change it.
  let $state = "follow"
  // m:theme="night" draws the card and its contents in the dark colour theme.
  return <Card m:theme="night">
    <strong>HADİ Koşu Kulübü</strong>
    {/* - state / onChange: controlled value and the callback that receives the next state when pressed.
        - name: used in the accessible name (the club name), so a screen reader knows what is being followed.
        - labels: your own button texts (any subset of follow, following, requested).
        - m:color: a common prop that sets the colour token of the button and everything inside it. */}
    <FollowButton state={$state as "follow"} onChange={(s: string) => $state = s} name="HADİ Koşu Kulübü"
      labels={{ follow: "Katıl", following: "Üyesin" }} m:color="brand-green" />
  </Card>
}
