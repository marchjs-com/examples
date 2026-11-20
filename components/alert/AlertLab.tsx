import { Alert, Notice, Button, Card, action } from "march/ui"
import { sparkles, check } from "march/icons"

// Alert'in bütün özellikleri bir arada: tone, title, icon (kendi / yok), body ve children, action (düğüm ya da
// action() nesnesi) + actionPlacement, dismissable + dismissLabel + dismissIcon + onDismiss, variant, role,
// partClass, class ve m:color; Notice aynı bileşenin diğer adı
const tones = ["info", "success", "warn", "danger", "neutral"] as const

export function AlertLab() {
  let $closed = 0
  let $saved = 0
  const save = action("Kaydet", () => { $saved++ })
  return <div sx={{ flex: "col", gap: 2 }}>
    <p>Kapatılan: <b>{() => $closed}</b> · kaydedilen: <b>{() => $saved}</b></p>
    {tones.map((t) => <Alert tone={t} title={`Ton: ${t}`}>{`${t} tonunda bir mesaj.`}</Alert>)}
    <Alert tone="info" icon={sparkles} m:color="brand-purple" title="Kendi ikonum ve rengim" body="Gövde body prop'u ile geldi." />
    <Alert tone="warn" icon={null} title="İkonsuz" action={save}>Eylem bir action() nesnesi: küçük düğme olur.</Alert>
    <Alert tone="danger" title="Altta eylem" actionPlacement="below" action={<Button size="sm">Yeniden dene</Button>}>Sunucu yanıt vermedi.</Alert>
    <Alert tone="success" dismissable dismissLabel="Başarı mesajını kapat" dismissIcon={check} onDismiss={() => $closed++}>Kapatınca sayaç artar.</Alert>
    <Alert variant="raised" tone="success" role="note" class="lab-alert" partClass={{ icon: "lab-icon", body: "lab-body", dismiss: "lab-x" }} dismissable
      onDismiss={() => $closed++}>Yüzen bildirim; rolü "note", parçalarda kendi sınıflarım.</Alert>
    <Card m:theme="night">
      <Notice tone="info" title="Notice">Alert'in diğer adı, koyu zeminde.</Notice>
    </Card>
  </div>
}
