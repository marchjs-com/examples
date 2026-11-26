// CookieJar: the creative-minimal LiveStatus example.
//
// What it shows: a cookie jar. Each press of "take one" lowers the count, and a status line below says how many cookies
// are left. When the jar is empty, the same line switches to "assertive", so a screen reader interrupts to say so.
// When to use this pattern: any change that sighted users see but screen reader users would miss: counters, selections,
// "saved" states. LiveStatus is a polite live region: it speaks when its text changes, without moving focus.
//
// Accessibility: the status element has role="status" with aria-live. "polite" waits until the reader has finished
// speaking; "assertive" interrupts, so keep it for important or error messages like the empty jar. Animation: none.
import { LiveStatus, Button, Card } from "march/ui"

export function CookieJar() {
  // The number of cookies left, a signal.
  let $left = 5
  return <Card title="Kurabiye kavanozu 🍪">
    {/* "Take one" is disabled at zero (a function, so it follows the signal); "refill" resets the count. */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" disabled={() => $left === 0} on:click={() => $left--}>Bir tane al</Button>
      <Button size="sm" variant="ghost" on:click={() => $left = 5}>Doldur</Button>
    </div>
    {/* text is a function that builds the sentence (a row of cookie emoji and the count, or the empty message), so it
        is read whenever it changes. politeness is chosen from the state: "assertive" only when the jar is empty. The
        whole LiveStatus is in a live region, so it is built again when the politeness changes. */}
    {() => <LiveStatus politeness={$left === 0 ? "assertive" : "polite"} text={() => ($left ? `${"🍪".repeat($left)} ${$left} kurabiye kaldı` : "Kavanoz boş!")} />}
  </Card>
}
