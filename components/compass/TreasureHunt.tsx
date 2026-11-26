// TreasureHunt.tsx: the creative-minimal Compass example.
// Steer a little boat towards a treasure: the buttons turn the boat left or right, the compass rose turns under the
// lubber line like a ship's compass, and the bearing marker shows where the treasure lies. When the heading is within
// 10° of the bearing, you are on course.
// Use this pattern when the user has to match a heading to a target: navigation, a game, aligning a device.
import { Compass, Button, Card, Badge } from "march/ui"

// The shortest signed difference between two headings (−180…180): 350° vs 10° is 20°, not 340°.
const diff = (a: number, b: number) => ((((b - a) % 360) + 540) % 360) - 180

export function TreasureHunt() {
  // The boat's heading. It may grow past 360 or below 0: the compass wraps it and always turns the short way round.
  let $heading = 0
  // A random treasure bearing, in whole tens of degrees.
  let $treasure = 10 * Math.round(Math.random() * 35)
  const onCourse = () => Math.abs(diff($heading, $treasure)) <= 10
  return <Card title="🏴‍☠️ Hazine avı">
    {/* heading: the boat's heading; the rose turns by it on a damped spring (motion engine), like a card floating in
        fluid; with reduced motion it turns at once. bearing: the treasure's direction, marked on the rose, so it
        turns with it. points={8}: NE, SE, SW and NW as well. The dial is a role="meter" whose value is spoken as
        "045° NE" (at most 4 times a second), and the bearing is part of its name. */}
    <Compass heading={$heading} bearing={$treasure} points={8} label="Tekne pusulası" size={240} />
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button on:click={() => { $heading -= 15 }}>⟲ Sola 15°</Button>
      <Button on:click={() => { $heading += 15 }}>Sağa 15° ⟳</Button>
      <Button variant="ghost" on:click={() => { $treasure = 10 * Math.round(Math.random() * 35) }}>Yeni hazine</Button>
    </div>
    {/* The result in words, with a colour that only repeats it. */}
    <Badge tone={onCourse() ? "success" : "neutral"}>{onCourse() ? "Rotadasın! 🎉" : `Fark: ${Math.round(diff($heading, $treasure))}°`}</Badge>
  </Card>
}
