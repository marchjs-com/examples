// MoodSection: the creative-minimal SiteSection example.
//
// What it shows: one SiteSection whose tone and heading change on every press of a button, cycling through the four
// tones: plain, muted, brand and inverse.
// When to use this pattern: to see what each `tone` looks like, and as the smallest SiteSection: a heading group (eyebrow,
// title, lead) with a tone and no content.
import { SiteSection } from "march/landing"
import { Button } from "march/ui"

// Four moods: a tone (the section's background), an emoji for the eyebrow and a title. `as const` keeps the tones as
// exact literals, which is what the prop expects.
const MOODS = [
  { tone: "plain", emoji: "🙂", title: "Sakin bir gün" },
  { tone: "muted", emoji: "☁️", title: "Biraz bulutlu" },
  { tone: "brand", emoji: "🎉", title: "Kutlama zamanı" },
  { tone: "inverse", emoji: "🌙", title: "Gece modu" },
] as const

export function MoodSection() {
  // `let $i` is a March signal: pressing the button writes the next index (wrapping around) and the section below redraws.
  let $i = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $i = ($i + 1) % MOODS.length}>Ruh hâlini değiştir</Button>
    {() => {
      // The signal is read inside this function, so the whole section is drawn again for the new mood.
      // SiteSection options used here:
      // - tone: the background: plain, muted, inverse or brand.
      // - space="sm": less vertical padding (default md). width="narrow": a narrow content width (46 rem).
      // - reveal={false}: no entrance animation for the heading group. The default is a rise with a stagger, which honours
      //   reduced motion; here it is off so every change shows at once.
      // - eyebrow, title, lead: the heading group. The section is a <section> named by its title (aria-labelledby).
      const m = MOODS[$i]!
      return <SiteSection tone={m.tone} space="sm" width="narrow" reveal={false} eyebrow={m.emoji} title={m.title}
        lead={`Bu bölümün tonu: ${m.tone}`} />
    }}
  </div>
}
