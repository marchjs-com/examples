// KbdLab: the full-featured Kbd example; it uses every prop at least once.
//
// Props shown here: keys (a shortcut string written for the visitor's platform, and it can be live), children (plain
// key text such as "Esc") and class (your own class next to the built-in m-kbd).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// KbdLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Kbd, Button } from "march/ui"

// The modifier names the buttons below can swap into the live shortcut. "mod" is March's platform-neutral modifier:
// it is written as the Command key on macOS and as Ctrl elsewhere. ctrl, alt and shift are written as themselves.
const mods = ["mod", "ctrl", "alt", "shift"] as const

export function KbdLab() {
  // $mod is a signal: the shortcut at the bottom reads it, so it is written again whenever a button changes it.
  let $mod = "mod"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* keys="…": a shortcut string, modifiers joined with "+". Kbd formats it for the platform, so you write one
        string and every visitor sees their own keys. class="lab-cmd" / "lab-enter" is added next to m-kbd, so a test
        or your CSS can find these two instances. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Kbd keys="mod+k" class="lab-cmd" />
      <Kbd keys="shift+enter" class="lab-enter" />
      <Kbd keys="alt+arrowleft" />
      <Kbd keys="mod+shift+z" />
    </div>
    {/* children: when there is no `keys`, whatever you write is the key text. Use it for a single key that is the
        same on every platform (Esc, Tab). */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Kbd>Esc</Kbd> <Kbd>Tab</Kbd> <span sx={{ color: "muted" }}>düz metin (children)</span>
    </div>
    {/* `keys` is live: the template string reads $mod, so pressing a button below writes the shortcut again with the
        new modifier (the live-keys test relies on this). The pressed button is "primary", the others "ghost". */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {mods.map((m) => <Button size="sm" variant={$mod === m ? "primary" : "ghost"} on:click={() => $mod = m}>{`${m} ile`}</Button>)}
      <Kbd keys={`${$mod}+s`} class="lab-live" />
    </div>
  </div>
}
