// ThemeMenuLab: the full-featured ThemeMenu example.
//
// What it shows: the ThemeMenu options together, in three menus. At the top, a preview menu with a theme of its own (value +
// onChange, page, mode, the button shows the theme in use, preview cards, a slim size, a panel class): its choice paints only
// the card around it and leaves the page's theme alone. Below, the page's menu (own icon, label, placement, accent choices,
// heading texts) and a bare accent-only menu (themes, modes and headings switched off, no icon).
// Use it as a catalogue: copy the prop you need. Props are described in the ThemeMenu docs.
//
// Animation: none of its own to switch off; the panel opens like any Dropdown.
// Accessibility: the button opens a Dropdown panel (Escape closes it and focus returns to the button). Light / dark / system
// is a labelled group of toggle buttons (aria-pressed); themes and accents are labelled radiogroups of role="radio" buttons
// (aria-checked); swatches are decoration.
import { ThemeMenu, Card, Button } from "march/ui"
import { sun } from "march/icons"

export function ThemeMenuLab() {
  // Reactive state: the preview's own theme id ("" means the page's theme) and whether the examples are drawn in dark mode.
  let $theme = ""
  let $dark = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The preview card. m:theme paints the card in the chosen theme (null leaves the page's). The ThemeMenu inside has
        value + onChange, so it shows and sets a theme of its own instead of the page's. page: adds a first entry that means
        "follow the page's theme" (the value ""). mode: whether the swatches and cards are drawn light or dark (a live value).
        current: the button shows the theme in use. view="cards": a grid of preview cards instead of a list. size="sm": a slim
        button. panelClass: a class on the opened panel (the tests find it). */}
    <Card m:theme={$theme || null}>
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        <span sx={{ text: "bold" }}>Önizleme: {$theme || "sayfanın teması"}</span>
        <ThemeMenu value={$theme} onChange={(id) => $theme = id} page mode={$dark ? "dark" : "light"} current view="cards" size="sm" panelClass="lab-preview-panel" />
        <Button on:click={() => $dark = !$dark}>{$dark ? "Örnekler koyu" : "Örnekler açık"}</Button>
      </div>
    </Card>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* The page menu (no value, so it changes the page's theme). label: the button text. icon: our own icon. placement:
          where the panel opens. themes, view="list", modes and headings are written out (the defaults). accents: the accent
          choices. labels: our own section headings (a string or a function). class is kept on the button. */}
      <ThemeMenu label="Sayfa görünümü" icon={sun} placement="bottom-start" themes view="list" modes headings
        accents={["primary", "brand-green", "brand-purple"]} labels={{ theme: "Renk teması", accent: () => "Vurgu rengi" }} class="lab-page-menu" />
      {/* An accent-only menu: icon={false} makes the button text only; themes={false}, modes={false} and headings={false} leave
          just the accent choices; placement="top-start" opens the panel above the button. */}
      <ThemeMenu label="Yalnız vurgu" icon={false} themes={false} modes={false} headings={false} placement="top-start" class="lab-accent-menu" />
    </div>
  </div>
}
