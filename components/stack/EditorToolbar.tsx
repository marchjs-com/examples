// EditorToolbar: the real-life Stack-family example (Toolbar and Divider).
//
// What it shows: the toolbar of a text editor. Format buttons and alignment buttons are separated by a vertical divider, an export
// button sits in the end slot, and below the toolbar a labelled divider ("or") separates it from a second action.
// When to use this pattern: any bar of related controls. Toolbar names the group for assistive technology and gives it an end slot;
// Divider separates groups inside it, or sections of a page.
import { Toolbar, Divider, Button, IconButton } from "march/ui"
import { bold, italic } from "march/icons"
import { underline, alignLeft, alignCenter } from "march/icons/lucide"

export function EditorToolbar() {
  // `let $name` variables are March signals: writing one redraws whatever reads it. $b is whether bold is on, $align the chosen alignment.
  let $b = false
  let $align = "left"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Toolbar options used here:
        - label: the accessible name of the bar. The bar has role="toolbar", so a screen reader announces it as a group of controls.
        - end: a node placed in the end slot of the bar (the right in left-to-right text), here the export button.
        The children are the controls at the start. Each IconButton needs a `label`, its accessible name, because it has no text;
        `pressed` makes it a toggle that reports aria-pressed (bold flips on its own, the two alignments behave like a choice because
        each press sets the other one off through the same signal).
        Divider with `vertical`: a thin vertical separator between the two groups (role="separator", with aria-orientation). */}
    <Toolbar label="Biçim" end={<Button size="sm" variant="primary">Dışa aktar</Button>}>
      <IconButton icon={bold} label="Kalın" pressed={$b} on:click={() => $b = !$b} />
      <IconButton icon={italic} label="İtalik" />
      <IconButton icon={underline} label="Altı çizili" />
      <Divider vertical />
      <IconButton icon={alignLeft} label="Sola hizala" pressed={$align === "left"} on:click={() => $align = "left"} />
      <IconButton icon={alignCenter} label="Ortala" pressed={$align === "center"} on:click={() => $align = "center"} />
    </Toolbar>
    {/* Divider with a `label`: a horizontal rule with a short text in the middle, here the word for "or". */}
    <Divider label="ya da" />
    <Button>Şablondan başla</Button>
  </div>
}
