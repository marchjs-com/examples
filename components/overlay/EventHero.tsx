import { Overlay, Button, Badge } from "march/ui"

// bir etkinlik afişi: arkada sessiz, döngülü video (görünmezken durur; afiş resmi yedektir), önde cam panel;
// katmanlar tıklama almaz, kayıt düğmesi çalışır
export function EventHero() {
  let $seats = 42
  return <section sx={{ flex: "col", gap: 3, p: 8, radius: 4, shadow: 2 }}>
    <Overlay src="/media/hadi-waves.webm" poster="/media/hadi-waves.jpg" />
    <Overlay effect="vignette" opacity={0.7} />
    <Overlay effect="glass" front inset={4} opacity={0.35} />
    <div><Badge tone="danger" pulse>Canlı</Badge></div>
    <strong sx={{ text: "2xl" }}>HADİ Konferansı 2026</strong>
    <span>İstanbul · 12 Aralık · {() => $seats} koltuk kaldı</span>
    <div><Button disabled={$seats === 0} on:click={() => $seats--}>{() => ($seats ? "Kayıt ol" : "Doldu")}</Button></div>
  </section>
}
