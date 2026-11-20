import { LiveFeed } from "march/landing"

// bir el yapımı ürün dükkânının vitrininde canlı satış duvarı: birkaç saniyede bir yeni sipariş
const NAMES = ["Ayşe", "Murat", "Selin", "Emre", "Gül", "Okan", "Nazlı", "Barış"]
const CITIES = ["İzmir", "Ankara", "Bursa", "Eskişehir", "Trabzon", "Antalya"]
const ITEMS = ["seramik kupa", "keten çanta", "el örgüsü atkı", "ahşap kaşık seti", "mum", "deri cüzdan"]
const COLORS = ["brand-orange", "brand-green", "brand-blue", "brand-purple"] as const

const orders = () => {
  let k = 0
  return () => {
    const i = k++, who = NAMES[(i * 3) % NAMES.length]!
    return { id: i, avatar: who[0], title: `${who} bir ${ITEMS[(i * 5) % ITEMS.length]} aldı`, body: CITIES[(i * 7) % CITIES.length], meta: "az önce", color: COLORS[i % COLORS.length] }
  }
}

export function ShopActivity() {
  return <section sx={{ flex: "col", gap: 3 }}>
    <h2>Şu an Atölye Pazarı'nda</h2>
    <p sx={{ color: "muted" }}>Türkiye'nin dört bir yanından el emeği siparişler.</p>
    <LiveFeed variant="wall" next={orders()} every={3000} first={800} max={6} label="Son siparişler"
      pauseLabel="Canlı · durdur" resumeLabel="Durdu · sürdür" />
  </section>
}
