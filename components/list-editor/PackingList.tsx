import { ListEditor, Card, Badge } from "march/ui"

// tatil bavulu: en fazla 8 eşya; bavul dolunca rozet kırmızıya döner, ekleme satırı kilitlenir
export function PackingList() {
  let $items = ["mayo", "güneş kremi", "şapka"]
  const $full = $items.length >= 8
  return <Card title="Bavulum" actions={<Badge tone={$full ? "danger" : "success"}>{$items.length} / 8</Badge>}>
    <ListEditor bind:value={$items} max={8} placeholder="Ne unutuldu?" addLabel="Bavula at"
      labels={{ item: (n: number) => `${n}. eşya`, remove: "Bavuldan çıkar" }} />
    <span sx={{ text: "sm", color: "muted" }}>{$full ? "Bavul doldu, fermuar zorlanıyor!" : "Biraz daha yer var."}</span>
  </Card>
}
