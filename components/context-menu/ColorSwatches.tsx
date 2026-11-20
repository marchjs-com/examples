import { Swatch } from "march/ui"
import { ContextMenu } from "march/components/context-menu"

// renk paleti: bir renge sağ tıkla; menü o rengin adını ve hex kodunu bilir
const colors = [["Mercan", "#ff6b5b"], ["Nane", "#3ecf8e"], ["Gece", "#2b3a67"], ["Hardal", "#f2b33d"]]

export function ColorSwatches() {
  let $bg = "transparent"
  let $note = "Bir renge sağ tıklayın."
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
    <ContextMenu items={items} label="Renk işlemleri">
      <div sx={{ flex: "row", gap: 2 }}>
        {colors.map(([name, hex]) => <Swatch color={hex} label={name} data-hex={hex} size="lg" shape="circle" selected={$bg === hex}
          onClick={() => { $bg = hex!; $note = `Arka plan: ${hex}` }} />)}
      </div>
    </ContextMenu>
    <span sx={{ text: "sm" }}>{$note}</span>
  </div>
}
