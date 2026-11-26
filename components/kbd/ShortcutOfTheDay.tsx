// ShortcutOfTheDay: the creative-minimal Kbd example.
//
// What it shows: a one-line "tip of the day" where the shortcut is a Kbd and a refresh button brings the next tip.
// When to use this pattern: tips, onboarding hints, empty states, anywhere a sentence mentions a shortcut. Because
// `keys` is a shortcut string, you write "mod+k" once and macOS visitors see the Command key while the others see Ctrl.
//
// Animation: none; Kbd is a static element, so there is no motion to turn off.
// Accessibility: Kbd renders a real <kbd> element, which screen readers announce as keyboard input. The icon-only
// button has a `label`, which is its accessible name.
import { Kbd, IconButton } from "march/ui"
import { refresh } from "march/icons"

// The tips. `keys` uses the same notation as everywhere else in March (mod, shift, alt, ctrl + a key name).
const tips = [
  { keys: "mod+k", what: "komut paletini aç" },
  { keys: "mod+shift+z", what: "yinele" },
  { keys: "alt+arrowleft", what: "geri git" },
  { keys: "shift+enter", what: "yeni satır" },
]

export function ShortcutOfTheDay() {
  // $i is a signal: clicking the button increments it and everything that reads it is updated.
  let $i = 0
  // $tip is a derived signal (a `$` constant): it is recomputed whenever $i changes, wrapping around with the
  // remainder so the list loops forever.
  const $tip = tips[$i % tips.length]
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <span sx={{ text: "bold" }}>Günün kısayolu:</span>
    {/* keys={$tip.keys} is live, so the key is written again when the tip changes. */}
    <Kbd keys={$tip.keys} />
    <span sx={{ color: "muted" }}>{$tip.what}</span>
    {/* IconButton needs `label`: with no visible text it is the only name a screen reader has. */}
    <IconButton icon={refresh} label="Başka bir kısayol" size="sm" on:click={() => $i++} />
  </div>
}
