import { Joined, Card, Button } from "march/ui"

// Joined'in bütün özellikleri: direction (dikey / yatay, canlı), radius (0–4 ya da full), border, dividers, class ve
// öteki öznitelikler (role, aria-label)
export function JoinedLab() {
  let $horizontal = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Button size="sm" on:click={() => $horizontal = !$horizontal}>{$horizontal ? "Dikey yap" : "Yatay yap"}</Button>
    <Joined class="lab-live" direction={() => ($horizontal ? "horizontal" : "vertical")} radius={4} role="group" aria-label="Kartlar">
      <Card title="Bir">İlk parça</Card>
      <Card title="İki">İkinci parça</Card>
    </Joined>
    <Joined class="lab-bare" direction="horizontal" radius={0} border={false} dividers={false}>
      <Button>Sol</Button>
      <Button>Sağ</Button>
    </Joined>
    <Joined class="lab-full" direction="horizontal" radius="full">
      <Button>Önceki</Button>
      <Button variant="primary">Sonraki</Button>
    </Joined>
  </div>
}
