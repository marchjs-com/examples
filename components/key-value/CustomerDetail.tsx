import { KeyValue, Card, Badge, Button } from "march/ui"

// bir müşteri ayrıntısı: iki sütun, ipucu satırları; telefon gizlenebilir, boş adres "eklenmedi" yazar
export function CustomerDetail() {
  let $showPhone = false
  return <Card title="Ada Yılmaz" subtitle="Müşteri #1024" actions={<Badge tone="success">Aktif</Badge>}>
    <KeyValue columns={2} empty="eklenmedi" items={[
      { label: "E-posta", value: "ada@ornek.com" },
      { label: "Telefon", value: () => $showPhone ? "+90 532 000 00 00" : "•••• •• ••", hint: "Görmek için düğmeye basın" },
      { label: "Toplam sipariş", value: "18", hint: "Son 12 ay" },
      { label: "Harcama", value: "24.180 ₺" },
      { label: "Adres", value: "" },
      { label: "Üyelik", value: "2024'ten beri" },
    ]} />
    <Button size="sm" on:click={() => $showPhone = !$showPhone}>{() => $showPhone ? "Telefonu gizle" : "Telefonu göster"}</Button>
  </Card>
}
