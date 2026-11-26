// SeasonStory: the creative-minimal ScrollStory example.
//
// What it shows: four seasons as four scroll steps. While you scroll, the big emoji on the side changes and the whole
// section takes the colour of that season. A line above the story also names the current season.
// When to use this pattern: the smallest useful ScrollStory: steps with a title, a body, a picture and a colour,
// plus onStep to react to the active step elsewhere on the page.
import { ScrollStory } from "march/landing"

// The picture of each step. role="img" with an aria-label gives the emoji an accessible name.
const Big = (p: { face: string }) => <div sx={{ flex: ["row", "center"], p: 6 }} style={{ fontSize: "96px" }} role="img" aria-label={p.face}>{p.face}</div>

export function SeasonStory() {
  // `let $now` is a March signal: onStep writes it and the line below redraws.
  let $now = "İlkbahar"
  const NAMES = ["İlkbahar", "Yaz", "Sonbahar", "Kış"]
  return <div sx={{ flex: "col", gap: 3 }}>
    <strong>{`Şu an: ${$now}`}</strong>
    {/* onStep(index) is called with the index of the step that is now active (nearest the middle of the screen); here
        it looks the season name up. Every `color` is a theme colour token; with the default theme={true} the section
        is tinted with the active step's colour. Side, dots, numbers and transition keep their defaults. */}
    <ScrollStory onStep={(i: number) => $now = NAMES[i]!} steps={[
      { title: "İlkbahar", body: "Erikler çiçek açtı, ceketler dolaba.", media: <Big face="🌸" />, color: "brand-pink" },
      { title: "Yaz", body: "Deniz, karpuz, uzun akşamlar.", media: <Big face="🏖️" />, color: "brand-orange" },
      { title: "Sonbahar", body: "Yapraklar sarı, çay demlik demlik.", media: <Big face="🍂" />, color: "brand-gold" },
      { title: "Kış", body: "Kar yağdı; sahlep sırası.", media: <Big face="☃️" />, color: "brand-blue" },
    ]} />
  </div>
}
