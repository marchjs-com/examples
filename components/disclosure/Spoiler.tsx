import { Disclosure, Card } from "march/ui"

// sürprizbozan: film yorumunda sonu gizli; açan okur sayılır
export function Spoiler() {
  let $peeks = 0
  return <Card m:theme="night">
    <p sx={{ text: "sm" }}>Film harika başlıyor, ikinci yarı ise bambaşka bir şeye dönüşüyor.</p>
    <Disclosure title={<span sx={{ color: "brand-orange", text: "bold" }}>Sonu göster (sürprizbozan!)</span>} onToggle={(o: boolean) => { if (o) $peeks++ }}>
      <p sx={{ text: "sm" }}>Kahraman baştan beri kendi rüyasındaymış.</p>
    </Disclosure>
    <span sx={{ text: "xs", color: "muted" }}>{$peeks} kez bakıldı</span>
  </Card>
}
