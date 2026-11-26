// DashboardOverlay: the real-life Loader example.
//
// What it shows: a sales dashboard that refreshes its data. The content stays where it is, and while the (simulated)
// request runs, a translucent scrim with a spinner and a line of text covers it; when the data arrives the scrim goes and
// the order count has changed.
// When to use this pattern: refreshing something the visitor is already looking at. `overlay` covers the nearest
// positioned container, so the layout does not jump the way it would if the content were replaced by a spinner.
//
// Accessibility: the Loader is role="status" with a polite live region, so its text is announced once; the spinner is
// decorative. The fade-in waits a moment, so a fast load never flashes a spinner. Animation: the loader fades in after a short delay,
// and `fade={false}` switches that off.
import { Loader, Button, Card } from "march/ui"

export function DashboardOverlay() {
  // $busy: a request is running. $orders: the number shown.
  let $busy = false
  let $orders = 1284
  // Simulates a request: show the loader, and after 1.2 s change the number and hide it. Replace the timeout with your
  // API call.
  const refresh = () => { $busy = true; setTimeout(() => { $orders += Math.floor(Math.random() * 40); $busy = false }, 1200) }
  return <Card title="Satış panosu" sx={{ p: 3 }}>
    {/* The wrapper must be positioned (position: relative): an overlay Loader covers its nearest positioned container.
        min-height keeps the area big enough for the scrim to look right when the content is short. */}
    <div style={{ position: "relative", "min-height": "6rem" }}>
      <p sx={{ text: ["xl", "bold"] }}>{() => `${$orders.toLocaleString("tr-TR")} sipariş`}</p>
      <p sx={{ color: "muted" }}>Bu çeyrekte ortalama sepet 412 ₺.</p>
      {/* A live region that draws the Loader only while busy. overlay: cover the container with a scrim; color: colour
          token of the spinner; text: the visible line under the spinner (also what is announced). */}
      {() => $busy ? <Loader overlay color="brand-orange" text="Veriler yenileniyor…" /> : null}
    </div>
    {/* The refresh button is disabled while busy, so requests do not pile up. */}
    <Button size="sm" disabled={() => $busy} on:click={refresh}>Yenile</Button>
  </Card>
}
