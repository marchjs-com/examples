// Elevator: the creative-minimal ScrollToTop example.
//
// What it shows: a tiny "building" made of a scrolling list of floors. The floor you are passing is shown in the
// header, and a "go to the roof" button slides in once you have scrolled down; pressing it takes the list back to the
// top floor.
// When to use this pattern: when the button should have its own character: another appear motion (`motion`), a colour
// (`m:color`) and a name that fits the content.
import { ScrollToTop, Card } from "march/ui"

// Roof first, then floors 11 down to 1, then the lobby: scrolling down walks down the building.
const floors = ["Çatı katı · teras", ...Array.from({ length: 11 }, (_, i) => `${11 - i}. kat`), "Zemin kat · lobi"]

export function Elevator() {
  // `let $floor` is a March signal: the scroll handler writes it and the header text redraws.
  let $floor = floors[0] ?? ""
  // The scrolling box, kept in a variable because ScrollToTop needs the element as its `target`. It scrolls because it
  // has a fixed height and overflow: auto. Every floor row is about 48 px high, so scrollTop / 48 is the floor index.
  const shaft = (<div style={{ height: "200px", overflow: "auto" }} on:scroll={(e: Event) => {
    const el = e.currentTarget as HTMLElement
    $floor = floors[Math.min(floors.length - 1, Math.round(el.scrollTop / 48))] ?? ""
  }}>
    {floors.map((f) => <div sx={{ p: 3, text: "md" }}>{f}</div>)}
  </div>) as HTMLElement
  // m:theme="night" (a common prop that works on every element and component) draws this subtree in the dark theme.
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "between", "center"], gap: 3, mb: 2 }}>
      <span sx={{ text: ["lg", "bold"], color: "brand-orange" }}>{$floor}</span>
      {/* ScrollToTop options used here:
          - inline + target={shaft}: the button sits in this header and scrolls the list, not the page.
          - threshold={60}: it appears after 60 px of scrolling.
          - label: the accessible name and tooltip.
          - motion="slide": how it appears and disappears. Other presets are "fade" and "none"; you can also pass your
            own function (see ScrollToTopLab). The motion runs on the motion engine, so reduced motion, the global
            speed and "Stop all" apply.
          - m:color="brand-orange": a common prop that sets the colour token of the button. */}
      <ScrollToTop inline target={shaft} threshold={60} label="Çatıya çık" motion="slide" m:color="brand-orange" />
    </div>
    {shaft}
  </Card>
}
