import { ErrorBox, Card } from "march/ui"
import { Icon, refresh } from "march/icons"

// ErrorBox'ın bütün özellikleri bir arada: error (Error nesnesi, metin, erişimci), message (error yokken),
// title, retry, retryLabel (metin ya da düğüm), class; hiçbiri yoksa hazır metin
export function ErrorBoxLab() {
  let $count = 0
  let $code = 500
  return <div sx={{ flex: "col", gap: 2 }}>
    <p>Yeniden deneme: <b>{() => $count}</b></p>
    <ErrorBox title="Error nesnesi" error={new Error("Bağlantı reddedildi")} retry={() => $count++} />
    <ErrorBox title="Metin hatası" error="Dosya bulunamadı (404)" />
    <ErrorBox title="Erişimci" error={() => `Sunucu hatası (${$code})`} retry={() => { $count++; $code++ }} retryLabel="Kodu artır" />
    <ErrorBox message="Yalnız message: error verilmedi." retry={() => $count++}
      retryLabel={<span sx={{ flex: ["row", "center"], gap: 1 }}><Icon of={refresh} /> Yenile</span>} class="lab-error" />
    <Card m:theme="night">
      <ErrorBox />
    </Card>
  </div>
}
