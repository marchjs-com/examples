// MusicPanel: the creative-minimal PanelHeader example.
//
// A playlist panel on a dark background: an icon, the title and a second line, a song count and a shuffle toggle button.
// It shows PanelHeader as a plain heading bar with no close button, with free content in `meta` and `actions`. Use this
// pattern for the title area of a card or a board column.
import { PanelHeader, IconButton, Card } from "march/ui"
import { music } from "march/icons"
import { shuffle } from "march/icons/lucide"

export function MusicPanel() {
  // Whether shuffle is on (the toggle button and the text under the header both read it).
  let $shuffle = false
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night">
    {/* - icon: drawn before the title; m:color (the common colour token prop) colours the header and its icon.
        - title / subtitle: the heading (a real heading element, <h3> by default) and a second line.
        - meta: free content right after the title (a count, a badge). actions: free content at the end, here an
          IconButton. Its `label` is the accessible name and tooltip, and `pressed` makes it a toggle (aria-pressed).
        - close={false}: no close button. Every part of PanelHeader is optional. */}
    <PanelHeader icon={music} m:color="brand-pink" title="Gece Yolu" subtitle="Çalma listesi" meta={<span>12 şarkı</span>}
      actions={<IconButton icon={shuffle} label="Karıştır" pressed={$shuffle} on:click={() => $shuffle = !$shuffle} />} close={false} />
    <p sx={{ p: 2, text: "sm" }}>{$shuffle ? "Karışık çalıyor" : "Sırayla çalıyor"}</p>
  </Card>
}
