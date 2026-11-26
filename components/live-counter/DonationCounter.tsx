// DonationCounter: the real-life LiveCounter example.
//
// What it shows: the page of a donation campaign with two numbers that grow while you watch: the amount raised (in
// Turkish lira) and the number of supporters. Neither is connected to a server here: `from` and `rate` make the
// counter simulate growth, adding small random steps.
// When to use this pattern: a landing page that wants to show live activity. Give `value` a signal fed by your server
// when you have real numbers; use `from` + `rate` for a demo or an estimate.
//
// Animation: the simulation runs on the motion clock and only while the counter is on screen, so it stops off screen
// and with the global motion pause. Reduced motion: digits change without animation, with no bubble, beat or pulsing dot.
// Accessibility: the number is plain text that screen readers read as it is; it is not a live region, so it never
// interrupts. The dot and the "+N" bubble are decorative.
import { LiveCounter } from "march/landing"

export function DonationCounter() {
  return <section sx={{ flex: "col", gap: 4, p: 4 }}>
    <h2>Köy okuluna kütüphane</h2>
    <p sx={{ color: "muted" }}>Hedef 250.000 ₺. Her bağış bir rafı doldurur.</p>
    <div sx={{ flex: ["row", "wrap"], gap: 6 }}>
      {/* from: where the simulation starts; rate: the average increase per minute. format takes Intl.NumberFormat
          options: here money in Turkish lira without decimals. label: what is counted. bubbleColor: the colour token of
          the "+N" bubble that rises on every increase. */}
      <LiveCounter from={168450} rate={900} format={{ style: "currency", currency: "TRY", maximumFractionDigits: 0 }}
        label="toplandı" bubbleColor="brand-green" />
      {/* dotColor: the colour token of the live dot and its pulse. beat={false}: the number does not beat on an
          increase (the default is to beat once). */}
      <LiveCounter from={2311} rate={12} label="destekçi" dotColor="brand-orange" beat={false} />
    </div>
  </section>
}
