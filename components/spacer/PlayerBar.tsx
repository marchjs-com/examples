// PlayerBar: the real-life Spacer example.
//
// What it shows: the control bar of a music player. The play button and the song title sit at the start, and the volume button
// is pushed to the far end by a Spacer.
// When to use this pattern: any row that has a group at the start and another at the end (top bars, toolbars, list rows). The
// Spacer takes all the free room in the row, so no widths or margins are needed.
import { Spacer, IconButton } from "march/ui"
import { play, pause } from "march/icons"
import { volume2 } from "march/icons/lucide"

export function PlayerBar() {
  // `let $playing` is a March signal: the play button flips it, and the icon and the accessible name below follow it.
  let $playing = false
  // A flex row (sx flex: ["row", "center"]) with a gap; class="m-card" gives the bar the card styling.
  return <div sx={{ flex: ["row", "center"], gap: 2, p: 2, radius: 2 }} class="m-card">
    {/* An icon-only button must have a `label`: it is its accessible name, here "play" or "pause" depending on the state. */}
    <IconButton icon={$playing ? pause : play} label={$playing ? "Duraklat" : "Çal"} variant="solid" shape="round" on:click={() => $playing = !$playing} />
    <span sx={{ text: "bold" }}>Gece Yolu</span>
    {/* Spacer takes no props. It is a flexible gap: everything after it moves to the logical end of the row, so in a
        right-to-left page the volume button is on the left, mirrored automatically (see TopBar for a switch that shows
        this). It is decorative (aria-hidden), so screen readers skip it. */}
    <Spacer />
    <IconButton icon={volume2} label="Ses" />
  </div>
}
