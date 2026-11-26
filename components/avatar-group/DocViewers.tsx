// DocViewers: the real-life AvatarGroup example.
//
// "Who is looking at this document": a small row of avatars next to a caption, with the overflow shown as "+N people"
// and a screen-reader label that includes the count. Use this pattern for presence indicators, collaborators on a
// file, or any short list of people that may grow beyond the space you have.
import { AvatarGroup } from "march/ui"

export function DocViewers() {
  // The row centres the caption and the group. In the group: max={3} shows three avatars; size="xs" and spacing="gap"
  // make them small and side by side; color="brand-blue" gives every avatar the same fixed colour (without it each
  // avatar gets a colour derived from its name). `more` is a function that receives the number of hidden people and
  // returns your own bubble content; `label` as a function gets the total count and builds the accessible name.
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <span sx={{ text: "sm", color: "muted" }}>Şu an bakıyor:</span>
    <AvatarGroup names={["Elif Arslan", "Can Demir", "Deniz Kaya", "Ada Yıldız", "Mert Öz", "Selin Ak"]} max={3} size="xs" spacing="gap"
      color="brand-blue" more={(rest: number) => <b>{`+${rest} kişi`}</b>} label={(n: number) => `${n} kişi bakıyor`} />
  </div>
}
