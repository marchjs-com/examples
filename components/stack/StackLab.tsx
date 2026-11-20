import { Stack, Toolbar, Divider, Button } from "march/ui"

// Stack'in bütün özellikleri: direction, gap (0–8), align, justify, wrap, as, class; yanında Toolbar (label, end) ve
// Divider (label, vertical)
const Box = (props: { n: number }) => <span class="sc-stack-item sc-stack-item-0">Öğe {props.n}</span>

export function StackLab() {
  let $gap = 2
  return <Stack gap={4}>
    {() => <Stack class="lab-row" as="ul" direction="row" gap={$gap} align="center" justify="between" wrap>
      {[1, 2, 3].map((n) => <li><Box n={n} /></li>)}
    </Stack>}
    <Toolbar label="Boşluk" end={<span class="lab-gap">gap {$gap}</span>}>
      <Button size="sm" on:click={() => $gap = Math.max(0, $gap - 1)}>Daralt</Button>
      <Divider vertical />
      <Button size="sm" on:click={() => $gap = Math.min(8, $gap + 1)}>Genişlet</Button>
    </Toolbar>
    <Divider label="sütun" />
    <Stack class="lab-col" direction="column" gap={1} align="end"><Box n={4} /><Box n={5} /></Stack>
  </Stack>
}
