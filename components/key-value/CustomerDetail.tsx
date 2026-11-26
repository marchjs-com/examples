// CustomerDetail: the real-life KeyValue example.
//
// What it shows: the detail panel of one customer: a Card with a status Badge, and inside it a two-column KeyValue
// with a hint under some values, a hidden-by-default phone number you can reveal, and an empty address that shows a
// placeholder instead of a blank.
// When to use this pattern: any read-only "record details" view (customer, order, device, invoice). KeyValue is a real
// definition list, so the label / value pairs stay meaningful for screen readers.
//
// Animation: none. Accessibility: KeyValue renders <dl> / <dt> / <dd>, so each pair is announced together.
import { KeyValue, Card, Badge, Button } from "march/ui"

export function CustomerDetail() {
  // A signal: whether the phone number is shown in full. The button below flips it.
  let $showPhone = false
  return <Card title="Ada Yılmaz" subtitle="Müşteri #1024" actions={<Badge tone="success">Aktif</Badge>}>
    {/* columns={2}: two label / value columns (fewer on narrow screens, the component handles that).
        empty="eklenmedi": shown for a null or empty value, here the address.
        Each row is { label, value, hint? }. A `value` can be a function: the phone row reads $showPhone, so it is
        redrawn when the button is pressed. `hint` is a small extra line under the value. */}
    <KeyValue columns={2} empty="eklenmedi" items={[
      { label: "E-posta", value: "ada@ornek.com" },
      { label: "Telefon", value: () => $showPhone ? "+90 532 000 00 00" : "•••• •• ••", hint: "Görmek için düğmeye basın" },
      { label: "Toplam sipariş", value: "18", hint: "Son 12 ay" },
      { label: "Harcama", value: "24.180 ₺" },
      { label: "Adres", value: "" },
      { label: "Üyelik", value: "2024'ten beri" },
    ]} />
    {/* The button text is a function too, so it always says what pressing it will do. */}
    <Button size="sm" on:click={() => $showPhone = !$showPhone}>{() => $showPhone ? "Telefonu gizle" : "Telefonu göster"}</Button>
  </Card>
}
