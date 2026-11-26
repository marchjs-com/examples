// PeriodicTable: the creative-minimal Tooltip example.
//
// What it shows: one row of the periodic table. Each element is a large button with its symbol, and its full name
// appears in a purple bubble when you hover or focus it.
// When to use this pattern: a dense set of short labels where the explanation would be clutter if always visible
// (abbreviations, symbols, icon grids). Tooltips are only a hint: never put the only copy of important information
// in one.
import { Tooltip, Button } from "march/ui"

// [symbol, name] pairs; the name is what the tooltip shows.
const elements = [["H", "Hidrojen"], ["He", "Helyum"], ["Li", "Lityum"], ["C", "Karbon"], ["O", "Oksijen"]]

export function PeriodicTable() {
  // One Tooltip per button (it wraps exactly one element). `color` is a theme colour token for the bubble (the
  // default is an inverse surface). delay={0} shows the hint at once on hover; the default is 300 ms, and keyboard
  // focus always shows it at once. While shown, the button is linked to the bubble with aria-describedby, and Esc
  // hides it. The bubble never receives pointer events, so it cannot get in the way of the buttons.
  return <div sx={{ flex: "row", gap: 2 }}>
    {elements.map(([sym, name]) => <Tooltip text={name!} color="brand-purple" delay={0}>
      <Button size="lg" sx={{ text: "bold" }}>{sym}</Button>
    </Tooltip>)}
  </div>
}
