import { Kbd, Button } from "march/ui"

// Kbd'nin bütün özellikleri bir arada: keys (platforma göre yazılan kısayol, canlı), children (düz tuş metni),
// class (m-kbd'nin yanına kendi sınıfın)
const mods = ["mod", "ctrl", "alt", "shift"] as const

export function KbdLab() {
  let $mod = "mod"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Kbd keys="mod+k" class="lab-cmd" />
      <Kbd keys="shift+enter" class="lab-enter" />
      <Kbd keys="alt+arrowleft" />
      <Kbd keys="mod+shift+z" />
    </div>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Kbd>Esc</Kbd> <Kbd>Tab</Kbd> <span sx={{ color: "muted" }}>düz metin (children)</span>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {mods.map((m) => <Button size="sm" variant={$mod === m ? "primary" : "ghost"} on:click={() => $mod = m}>{`${m} ile`}</Button>)}
      <Kbd keys={`${$mod}+s`} class="lab-live" />
    </div>
  </div>
}
