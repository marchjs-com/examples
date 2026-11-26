import { FlipClock, Segmented } from "march/ui"

// NightStand: the creative-minimal FlipClock example.
// A bedside flip clock: big split number cards for the hours and minutes, a 12 / 24-hour switch, and the cards that
// fall over each minute on the motion engine. Use this pattern when the time itself is the decoration: a lock screen,
// a kiosk idle screen, a "focus mode" page.
export function NightStand() {
  // "12" or "24": the Segmented below writes it, the clock reads it.
  let $cycle = "24"
  return <div sx={{ flex: ["col", "center"], gap: 3 }}>
    {/* The clock.
        - hour12: a 12-hour clock gets a small split-flap with the page language's AM / PM text (in Turkish its own two-letter
          abbreviations); without the prop the page language's habit decides.
        - seconds={false}: hours and minutes only, as a bedside clock; the separator still blinks once a second.
        - size="lg": 64 px cards. color: a theme token for the digits (the cards stay dark in every theme).
        - label: the accessible name; a screen reader hears the label and "23:41" (to the minute, once a minute).
        Motion: the cards roll through Odometer / CountRoll on the motion engine. With the OS reduced-motion setting,
        or motion={false}, the digits change without flipping and the separators do not blink. */}
    <FlipClock hour12={$cycle === "12"} seconds={false} size="lg" color="warning" label="Başucu saati" />
    {/* A Segmented for two short choices; arrow keys move between them, its aria-label names it. */}
    <Segmented size="sm" aria-label="Saat biçimi" bind:value={$cycle} options={[{ value: "24", label: "24 saat" }, { value: "12", label: "12 saat" }]} />
  </div>
}
