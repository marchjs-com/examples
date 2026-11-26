// ColorSwatches: the creative-minimal ContextMenu example.
//
// What it shows: a small colour palette. Right-click a colour: the menu knows which colour it opened on, so its first item
// says "make background (#hex)" with that colour's code. A plain click on a swatch also sets the background.
// When to use this pattern: when one menu serves several similar targets. Put the data on the element (data-hex) and
// read it from the clicked element that `items` receives, so every swatch gets its own entries from one ContextMenu.
// Keyboard: the swatches are buttons; with one focused, Shift+F10 or the Menu key opens the same menu, so nothing
// depends on a mouse. Escape closes it and returns focus.
import { Swatch } from "march/ui"
import { ContextMenu } from "march/components/context-menu"

const colors = [["Mercan", "#ff6b5b"], ["Nane", "#3ecf8e"], ["Gece", "#2b3a67"], ["Hardal", "#f2b33d"]]

export function ColorSwatches() {
  let $bg = "transparent"
  let $note = "Bir renge sağ tıklayın."
  // `items` is called on every opening with the clicked element; the colour is read from the nearest data-hex above it.
  // A "-" is a separator; `shortcut` is only a hint shown on the row.
  const items = (target: Element) => {
    const hex = target.closest("[data-hex]")?.getAttribute("data-hex") ?? "#000000"
    return [
      { label: `Arka plan yap (${hex})`, onSelect: () => { $bg = hex; $note = `Arka plan: ${hex}` } },
      { label: "Hex kodunu kopyala", shortcut: "mod+c", onSelect: () => { $note = `Kopyalandı: ${hex}` } },
      "-" as const,
      { label: "Arka planı sıfırla", onSelect: () => { $bg = "transparent"; $note = "Sıfırlandı" } },
    ]
  }
  return <div sx={{ flex: "col", gap: 2, p: 3, radius: 3 }} style={{ background: $bg }}>
    {/* label: the accessible name of the menu. The swatches carry data-hex; `selected` marks the one that is the
        current background. */}
    <ContextMenu items={items} label="Renk işlemleri">
      <div sx={{ flex: "row", gap: 2 }}>
        {colors.map(([name, hex]) => <Swatch color={hex} label={name} data-hex={hex} size="lg" shape="circle" selected={$bg === hex}
          onClick={() => { $bg = hex!; $note = `Arka plan: ${hex}` }} />)}
      </div>
    </ContextMenu>
    <span sx={{ text: "sm" }}>{$note}</span>
  </div>
}
