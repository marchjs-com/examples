// WindStation.tsx: the real-life Compass example.
// A weather station's wind card: the wind direction on a fixed rose with a turning needle, the speed beside it, and a
// "new reading" button standing in for the sensor feed.
// Use mode="needle" when the dial itself does not move with the user (a wall display, a weather card): the rose stays
// put with north on top and the needle points to the direction. Use the default rose mode for something that turns
// (a ship, a phone, a drone).
import { Compass, Button, Card, Stat } from "march/ui"

export function WindStation() {
  // The latest reading. In a real app these come from your weather API or sensor; any number of degrees is fine.
  let $dir = 225
  let $speed = 18
  const read = () => {
    // A gusty wind: the direction drifts by up to ±40°, the speed by ±6 km/h.
    $dir += Math.round(Math.random() * 80 - 40)
    $speed = Math.max(0, Math.round($speed + Math.random() * 12 - 6))
  }
  return <Card title="Rüzgâr · Kadıköy istasyonu">
    <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
      {/* mode="needle": a two-tone needle (the north half in the colour) springs to the direction on the motion
          engine; reduced motion moves it at once. cardinals: your own names from north, clockwise (here Turkish
          wind-rose letters; by default they are translated for the page's language). The readout rolls ("225° GB"). */}
      <Compass heading={$dir} mode="needle" points={8} cardinals={["K", "KD", "D", "GD", "G", "GB", "B", "KB"]}
        label="Rüzgâr yönü" color="brand-blue" size={210} />
      <div sx={{ flex: "col", gap: 3 }}>
        <Stat label="Hız" value={`${$speed} km/sa`} />
        <Button size="sm" on:click={read}>Yeni ölçüm</Button>
      </div>
    </div>
  </Card>
}
