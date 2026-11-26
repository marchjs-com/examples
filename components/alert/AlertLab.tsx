// AlertLab: the full-featured Alert example; it uses every prop at least once.
//
// Props shown here: tone, title, icon (your own or none), body and children, action (a node or an action() object) with
// actionPlacement, dismissable with dismissLabel, dismissIcon and onDismiss, variant, role, partClass, class and the
// common prop m:color. Notice is another name for the same component.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// AlertLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Alert, Notice, Button, Card, action } from "march/ui"
import { sparkles, check } from "march/icons"

// The five tones. Each gets its own colour and default icon; warn and danger also use role="alert" (announced at once).
const tones = ["info", "success", "warn", "danger", "neutral"] as const

export function AlertLab() {
  // How many alerts were dismissed and how often the Kaydet action ran (reactive state: the text below redraws).
  let $closed = 0
  let $saved = 0
  // action(label, handler) makes a reusable action object: Alert turns it into a small button.
  const save = action("Kaydet", () => { $saved++ })
  return <div sx={{ flex: "col", gap: 2 }}>
    <p>Kapatılan: <b>{() => $closed}</b> · kaydedilen: <b>{() => $saved}</b></p>
    {/* One alert per tone: `tone` sets colour, default icon and the ARIA role. The message is the child text. */}
    {tones.map((t) => <Alert tone={t} title={`Ton: ${t}`}>{`${t} tonunda bir mesaj.`}</Alert>)}
    {/* icon={sparkles} replaces the tone's icon; m:color (common prop) recolours the alert; `body` is the prop form of
        the message (instead of children). */}
    <Alert tone="info" icon={sparkles} m:color="brand-purple" title="Kendi ikonum ve rengim" body="Gövde body prop'u ile geldi." />
    {/* icon={null} draws no icon at all. `action` as an action() object becomes a small button beside the text. */}
    <Alert tone="warn" icon={null} title="İkonsuz" action={save}>Eylem bir action() nesnesi: küçük düğme olur.</Alert>
    {/* actionPlacement="below" moves the action under the text (useful for wide buttons or narrow screens); `action`
        also accepts any node, such as a Button. */}
    <Alert tone="danger" title="Altta eylem" actionPlacement="below" action={<Button size="sm">Yeniden dene</Button>}>Sunucu yanıt vermedi.</Alert>
    {/* dismissable adds a close button. dismissLabel is its accessible name (screen readers, and what the test
        clicks), dismissIcon replaces the cross, onDismiss runs after the alert is closed. */}
    <Alert tone="success" dismissable dismissLabel="Başarı mesajını kapat" dismissIcon={check} onDismiss={() => $closed++}>Kapatınca sayaç artar.</Alert>
    {/* variant="raised" is the floating look. role="note" overrides the tone's automatic role. class goes to the root
        element, partClass to inner parts (icon, body, dismiss) so you can style or find each one. */}
    <Alert variant="raised" tone="success" role="note" class="lab-alert" partClass={{ icon: "lab-icon", body: "lab-body", dismiss: "lab-x" }} dismissable
      onDismiss={() => $closed++}>Yüzen bildirim; rolü "note", parçalarda kendi sınıflarım.</Alert>
    {/* Notice is the same component under another name; m:theme="night" on the Card shows it on a dark surface. */}
    <Card m:theme="night">
      <Notice tone="info" title="Notice">Alert'in diğer adı, koyu zeminde.</Notice>
    </Card>
  </div>
}
