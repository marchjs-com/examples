import { LiveCounter } from "march/landing"

// bir bağış kampanyasının sayfası: toplanan tutar ve destekçi sayısı izlerken artar
export function DonationCounter() {
  return <section sx={{ flex: "col", gap: 4, p: 4 }}>
    <h2>Köy okuluna kütüphane</h2>
    <p sx={{ color: "muted" }}>Hedef 250.000 ₺. Her bağış bir rafı doldurur.</p>
    <div sx={{ flex: ["row", "wrap"], gap: 6 }}>
      <LiveCounter from={168450} rate={900} format={{ style: "currency", currency: "TRY", maximumFractionDigits: 0 }}
        label="toplandı" bubbleColor="brand-green" />
      <LiveCounter from={2311} rate={12} label="destekçi" dotColor="brand-orange" beat={false} />
    </div>
  </section>
}
