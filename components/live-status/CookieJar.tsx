import { LiveStatus, Button, Card } from "march/ui"

// kurabiye kavanozu: her alışta durum satırı kalanı söyler; biterse araya girerek (assertive) uyarır
export function CookieJar() {
  let $left = 5
  return <Card title="Kurabiye kavanozu 🍪">
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" disabled={() => $left === 0} on:click={() => $left--}>Bir tane al</Button>
      <Button size="sm" variant="ghost" on:click={() => $left = 5}>Doldur</Button>
    </div>
    {() => <LiveStatus politeness={$left === 0 ? "assertive" : "polite"} text={() => ($left ? `${"🍪".repeat($left)} ${$left} kurabiye kaldı` : "Kavanoz boş!")} />}
  </Card>
}
