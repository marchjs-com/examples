// StackLab: the full-featured Stack example; it uses every Stack prop and the Toolbar and Divider props.
//
// Props shown here: Stack: direction, gap (0 to 8), align, justify, wrap, as and class; Toolbar: label and end; Divider: label and vertical.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// StackLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Stack, Toolbar, Divider, Button } from "march/ui"

// A small item to lay out; the classes only give it a look in this example.
const Box = (props: { n: number }) => <span class="sc-stack-item sc-stack-item-0">Öğe {props.n}</span>

export function StackLab() {
  // `let $gap` is a March signal: the two buttons change it and the row below redraws with the new gap.
  let $gap = 2
  // The outer Stack (a column by default, gap 4) holds everything. Stack lays children out with a gap from the spacing tokens (0 to 8).
  return <Stack gap={4}>
    {/* A function child is drawn again whenever the signal it reads ($gap) changes. Stack props used here:
        - as="ul": the element to draw (the default is a div). A Stack adds no semantics of its own, so `as` picks a meaningful one;
          the children are li elements to match.
        - direction="row": a row instead of the default column. gap={$gap}: the spacing step between children.
        - align="center": the cross axis (up and down in a row). justify="between": the main axis, with the free room between the items.
        - wrap: the row wraps onto a new line when the items do not fit.
        - class="lab-row": lets the tests find it. */}
    {() => <Stack class="lab-row" as="ul" direction="row" gap={$gap} align="center" justify="between" wrap>
      {[1, 2, 3].map((n) => <li><Box n={n} /></li>)}
    </Stack>}
    {/* Toolbar: a labelled bar of controls (role="toolbar", `label` is its accessible name) with an end slot, here a text that prints
        the gap. Divider with `vertical` is a thin separator between the two buttons. */}
    <Toolbar label="Boşluk" end={<span class="lab-gap">gap {$gap}</span>}>
      <Button size="sm" on:click={() => $gap = Math.max(0, $gap - 1)}>Daralt</Button>
      <Divider vertical />
      <Button size="sm" on:click={() => $gap = Math.min(8, $gap + 1)}>Genişlet</Button>
    </Toolbar>
    {/* Divider with a `label`: a horizontal rule with a short text in the middle (here the word for "column"). */}
    <Divider label="sütun" />
    {/* direction="column" (the default, written out here) with align="end": the children are stacked and pushed to the end of the
        cross axis. */}
    <Stack class="lab-col" direction="column" gap={1} align="end"><Box n={4} /><Box n={5} /></Stack>
  </Stack>
}
