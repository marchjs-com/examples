// FontSizer: the creative-minimal ButtonGroup example.
//
// A text-size control: three attached buttons look like one strip, the chosen button stays pressed, and a sample
// sentence grows or shrinks. It shows the smallest attached group used as a choice. Use the pattern for compact
// settings next to a preview.
import { ButtonGroup, Button } from "march/ui"

// The buttons as [label, size token] pairs: smaller, normal and larger text.
const sizes = [["A−", "sm"], ["A", "md"], ["A+", "xl"]] as const

export function FontSizer() {
  // The chosen size token (reactive state); it is used by the sentence's sx text token below.
  let $size: "sm" | "md" | "xl" = "md"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* attached: one strip, no gaps. Each Button's `pressed` is true for the current size (aria-pressed), so the
        state is visible and announced; `label` names the group for screen readers. */}
    <ButtonGroup attached label="Yazı boyu">
      {sizes.map(([name, size]) => <Button variant="secondary" pressed={$size === size} on:click={() => $size = size}>{name}</Button>)}
    </ButtonGroup>
    <p sx={{ text: $size }}>March'ta bileşen bir kez çalışır; değişen yalnız bu yazının boyudur.</p>
  </div>
}
