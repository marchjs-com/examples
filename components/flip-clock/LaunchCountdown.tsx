import { FlipClock, Button, Card } from "march/ui"

// LaunchCountdown: the real-life FlipClock example.
// A launch countdown and a row of city clocks for a global event. The countdown is a FlipClock fed your own time
// source: the time left as a timestamp, shown in UTC so the cards read hours, minutes and seconds of the remaining
// duration. The city clocks are the same component with a time zone each. Use this pattern for a product launch, a
// sale that ends, an exam timer, or a dashboard that serves teams in several time zones.
export function LaunchCountdown() {
  // The launch moment: two hours from now when the example opens. The restart button sets it again.
  let $launch = Date.now() + 2 * 3600_000
  // No timer of our own: FlipClock beats once a second while it is on screen and reads its `time` source again on
  // every beat, so a plain function of Date.now() is enough to count down.
  return <Card title="Lansmana kalan süre">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      {/* The countdown.
          - time: your own source. A number is a timestamp in ms; here the remaining milliseconds (never below 0).
          - timeZone="UTC" with hour12={false}: the remaining time reads as a plain duration, 01:59:58.
          - size="lg" and color="danger": the eye goes to it first. label: a screen reader hears the label and "01:59".
          - The cards roll down as the numbers shrink (Odometer rolls a smaller number downward), which suits a
            countdown. */}
      <FlipClock time={() => Math.max(0, $launch - Date.now())} timeZone="UTC" hour12={false} size="lg" color="danger" label="Kalan süre" />
      {/* City clocks: the system clock in each city's time zone. parts frame={false} drops the housing so the three
          sit lightly under the countdown; seconds={false} keeps them calm; size="sm" small cards. */}
      <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
        {[["İstanbul", "Europe/Istanbul"], ["New York", "America/New_York"], ["Tokyo", "Asia/Tokyo"]].map(([city, zone]) =>
          <div sx={{ flex: ["col", "center"], gap: 1 }}>
            <FlipClock timeZone={zone} hour12={false} seconds={false} size="sm" parts={{ frame: false }} label={city} />
            <span sx={{ text: "sm", color: "muted" }}>{city}</span>
          </div>)}
      </div>
      {/* An ordinary Button: Tab to reach it, Enter or Space to press it. */}
      <Button size="sm" variant="ghost" on:click={() => { $launch = Date.now() + 2 * 3600_000 }}>Yeniden başlat</Button>
    </div>
  </Card>
}
