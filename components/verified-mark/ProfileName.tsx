// ProfileName: the creative-minimal VerifiedMark example.
//
// What it shows: the title of a club profile on a dark card, with a large gold badge and a custom accessible name.
// When to use this pattern: a profile heading, where the mark should match the heading size and the brand. Three
// options do the work: size, m:color and label.
import { VerifiedMark, Card } from "march/ui"

export function ProfileName() {
  // m:theme="night" is a common prop (it works on every component): the card and everything inside use the dark theme.
  // On the mark: size="lg" is for a large heading ("sm" beside body text, "md" beside a heading); m:color="brand-gold"
  // is a common prop that sets the colour token of the badge; label is its accessible name (it replaces the default
  // "Verified" text, which is read by screen readers after the name). Pass label={false} only when the text beside the
  // badge already says the account is verified: the badge is then hidden from screen readers.
  return <Card m:theme="night">
    <span sx={{ text: ["xl", "bold"] }}>HADİ Koşu Kulübü <VerifiedMark size="lg" m:color="brand-gold" label="Onaylı kulüp" /></span>
  </Card>
}
