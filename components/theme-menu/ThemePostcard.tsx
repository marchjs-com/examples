// ThemePostcard: the creative-minimal ThemeMenu example.
//
// What it shows: a postcard that is drawn in its own theme. The card gets the theme with m:theme, and a ThemeMenu inside it
// chooses only that card's theme (shown as preview cards, the button shows the theme in use); the page's own theme stays
// where it is. The text on the card names the chosen theme.
// When to use this pattern: previewing or choosing a theme for one part of a page. Giving the menu a `value` and `onChange`
// makes it work on a theme of its own instead of the page's; here the same variable feeds both the card's m:theme and the
// menu, so they cannot disagree. The light / dark row, the accents and the headings are switched off to keep it small.
//
// Animation: none of its own to switch off; the panel opens like any Dropdown.
// Accessibility: the button opens a Dropdown panel (Escape closes it and focus returns to the button); themes are a labelled
// radiogroup of role="radio" buttons (aria-checked); swatches are decoration, and the theme names are text.
import { ThemeMenu, Card } from "march/ui"

export function ThemePostcard() {
  // Reactive state: the id of the card's theme.
  let $theme = "cream"
  // m:theme is a common prop: it draws the whole subtree in that theme.
  return <Card m:theme={$theme}>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: ["xl", "bold"] }}>Selam, March!</span>
      <span sx={{ color: "muted" }}>Bu kartpostal "{$theme}" temasında yazıldı.</span>
      {/* value + onChange: the menu shows and sets $theme, not the page's theme. view="cards": preview cards, each a small page
          drawn by its theme. current: the button shows the theme in use. modes={false}, accents={false} and headings={false}
          remove the light / dark row, the accent section and the headings. */}
      <ThemeMenu value={$theme} onChange={(id) => $theme = id} view="cards" current modes={false} accents={false} headings={false} />
    </div>
  </Card>
}
