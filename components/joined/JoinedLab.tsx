// JoinedLab: the full-featured Joined example; it uses every prop at least once.
//
// Props shown here: direction (vertical or horizontal, live), radius (0 to 4 or "full"), border, dividers, class and the
// other attributes that go to the element (role, aria-label).
// Use it as a reference when you need one option: find the prop below and copy the line.
// JoinedLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Joined, Card, Button } from "march/ui"

export function JoinedLab() {
  // Whether the first group is laid out horizontally.
  let $horizontal = false
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* Switches the first group between vertical and horizontal. */}
    <Button size="sm" on:click={() => $horizontal = !$horizontal}>{$horizontal ? "Dikey yap" : "Yatay yap"}</Button>
    {/* direction as a function: it can change at any time (the button above flips it). radius={4}: the largest numbered corner.
        role and aria-label are not Joined props: other attributes go to the element, so the group is announced as a group.
        The children here are Cards: their own frames are removed and one frame is drawn around both. */}
    <Joined class="lab-live" direction={() => ($horizontal ? "horizontal" : "vertical")} radius={4} role="group" aria-label="Kartlar">
      <Card title="Bir">İlk parça</Card>
      <Card title="İki">İkinci parça</Card>
    </Joined>
    {/* border={false} removes the frame around the whole, dividers={false} the lines between parts, radius={0} square corners. */}
    <Joined class="lab-bare" direction="horizontal" radius={0} border={false} dividers={false}>
      <Button>Sol</Button>
      <Button>Sağ</Button>
    </Joined>
    {/* radius="full": fully rounded ends, with the frame and dividers on (their defaults). */}
    <Joined class="lab-full" direction="horizontal" radius="full">
      <Button>Önceki</Button>
      <Button variant="primary">Sonraki</Button>
    </Joined>
  </div>
}
