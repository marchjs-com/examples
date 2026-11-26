// ShopActivity: the real-life LiveFeed example.
//
// What it shows: a live "latest orders" wall on the front page of a handmade-goods shop: every few seconds a new order
// ("Ann bought a ceramic mug, Izmir") pops into the grid and the oldest leaves, so the page looks inhabited.
// When to use this pattern: social proof on landing pages. Here the orders are made up by a generator function passed
// as `next`; with real data, pass a signal as `items` (newest first) from your socket or store instead.
//
// Animation: the feed pulls only while it is on screen and runs on the motion clock, so the global motion pause stops
// it too; reduced motion makes items appear without sliding. Accessibility: moving content must be stoppable (WCAG
// 2.2.2), so the feed pauses while the pointer or keyboard focus is inside it, and the pause button stops it until
// pressed again. New items are not announced by default, so a busy feed does not talk over the page.
import { LiveFeed } from "march/landing"

// Made-up order data. The generator below walks these lists with different step sizes, so the combinations look varied
// but the same on every run.
const NAMES = ["Ayşe", "Murat", "Selin", "Emre", "Gül", "Okan", "Nazlı", "Barış"]
const CITIES = ["İzmir", "Ankara", "Bursa", "Eskişehir", "Trabzon", "Antalya"]
const ITEMS = ["seramik kupa", "keten çanta", "el örgüsü atkı", "ahşap kaşık seti", "mum", "deri cüzdan"]
const COLORS = ["brand-orange", "brand-green", "brand-blue", "brand-purple"] as const

// Builds a `next` function: each call returns one FeedItem ({ id, title, body, avatar, meta, color }) and moves on. The
// id must be unique, which is why a counter is kept. The avatar is the buyer's first letter, `color` tints the item.
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
    {/* variant="wall": a grid of cards instead of rows. next: called every `every` ms (3 s) while the feed is visible
        and not paused; first: wait 0.8 s before the first one; max: six items on screen. label: the accessible name.
        pauseLabel / resumeLabel: the two texts of the pause button (running, paused), here in Turkish. */}
    <LiveFeed variant="wall" next={orders()} every={3000} first={800} max={6} label="Son siparişler"
      pauseLabel="Canlı · durdur" resumeLabel="Durdu · sürdür" />
  </section>
}
