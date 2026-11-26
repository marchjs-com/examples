// TagCloud: the creative-minimal Stack example.
//
// What it shows: a cloud of tags that wraps onto several lines, inside a column with a counter under it. Clicking a tag selects or
// deselects it, and the counter shows how many are selected.
// When to use this pattern: a group of items that must flow like text. A row Stack with `wrap` lays the items out in a line and starts a
// new line when they run out of room; an outer Stack (a column by default) puts the group and the counter above each other.
import { Stack, Chip } from "march/ui"

// The tags. Plain data, so a real page could load them.
const tags = ["sinyal", "TSX", "derleyici", "erişilebilirlik", "tema", "hareket", "test", "i18n"]

export function TagCloud() {
  // `let $picked` is a March signal holding the chosen tags; toggle adds a tag that is not in the list and removes one that is, by assigning
  // a new array (which redraws whatever reads it).
  let $picked: string[] = []
  const toggle = (t: string) => $picked = $picked.includes(t) ? $picked.filter((x) => x !== t) : [...$picked, t]
  // The outer Stack is a column (the default direction) with gap={4}, a step of the spacing tokens (0 to 8).
  return <Stack gap={4}>
    {/* The inner Stack: direction="row" lays the chips in a line, gap={2} is a small step between them, and `wrap` lets the line continue
        on the next row when it is full. Each Chip reports whether it is selected (`selected`), and clicking calls toggle. */}
    <Stack direction="row" gap={2} wrap>
      {tags.map((t) => <Chip selected={$picked.includes(t)} onClick={() => toggle(t)}>{t}</Chip>)}
    </Stack>
    <span sx={{ text: "sm", color: "muted" }}>{$picked.length} etiket seçildi</span>
  </Stack>
}
