import { LiveStatus, Checkbox, Card } from "march/ui"

// e-posta listesi: kutular işaretlendikçe altta "N ileti seçildi" okunur; yardım satırı listeye aria-describedby ile bağlı
const MAILS = ["Fatura hazır", "Toplantı daveti", "Haftalık bülten", "Şifre değişti"]

export function MailSelection() {
  let $picked: string[] = []
  const flip = (m: string, on: boolean) => { $picked = on ? [...$picked, m] : $picked.filter((x) => x !== m) }
  return <Card title="Gelen kutusu">
    <div aria-describedby="mail-help" sx={{ flex: "col", gap: 1 }}>
      {MAILS.map((m) => <Checkbox label={m} onChange={(on: boolean) => flip(m, on)} />)}
    </div>
    <LiveStatus as="p" help="Toplu işlem için iletileri işaretleyin." helpId="mail-help"
      text={() => ($picked.length ? `${$picked.length} ileti seçildi` : "Seçili ileti yok")} />
  </Card>
}
