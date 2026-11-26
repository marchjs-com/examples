// Recipe: the creative-minimal Accordion example.
//
// What it shows: the steps of a recipe as stacked sections. By default an Accordion keeps one section open at a time,
// so opening a step closes the previous one and the reader always sees exactly one instruction.
// When to use this pattern: short, ordered content where only one part matters at a time (recipes, setup guides,
// onboarding steps). If people need to compare sections side by side, pass `multiple` instead (see AccordionLab).
//
// Animation: the panel height and the turning arrow run on March's motion engine, so the global speed setting,
// "Stop all" and the visitor's reduced-motion preference all apply without any code here. To switch the motion off for
// this one Accordion, pass `animated={false}`.
// Keyboard: every header is a real button (Tab reaches it, Enter / Space toggles it); ↑ ↓ Home End move between
// headers. Closed panels are inert, so screen readers and Tab skip their content.
import { Accordion, Card } from "march/ui"
import { clock, sparkles } from "march/icons"
import { flame } from "march/icons/lucide"

// A tiny helper so each section's body is the same small paragraph. `content` accepts any node (or plain text), so a
// real recipe could put images, lists or a timer component here instead.
const step = (text: string) => <p sx={{ text: "sm" }}>{text}</p>

export function Recipe() {
  // Card gives the example a framed surface; m:theme="night" (a common prop that works on every element and
  // component) draws this whole subtree in the dark colour theme, whatever the page theme is.
  return <Card m:theme="night">
    <h3 sx={{ text: ["lg", "bold"] }}>Menemen</h3>
    {/* m:color tints the Accordion (header accent, arrow, focus ring) with one colour token.
        open={[0]} opens the first section at start; it takes indexes or item ids.
        Each item: title (the header text), optional subtitle (shown smaller beside it, here the time a step takes),
        optional icon at the start of the header, and content (the panel). Without `multiple`, opening a section
        closes the others: the "one step at a time" behaviour this example is about. */}
    <Accordion m:color="brand-orange" open={[0]} items={[
      { title: "Hazırlık", subtitle: "5 dk", icon: clock, content: step("Biberleri ince doğrayın, domatesleri rendeleyin.") },
      { title: "Pişirme", subtitle: "10 dk", icon: flame, content: step("Biberi tereyağında yumuşatın, domatesi ekleyip suyunu çektirin.") },
      { title: "Son dokunuş", icon: sparkles, content: step("Yumurtaları kırın, iki kez karıştırıp ocaktan alın.") },
    ]} />
  </Card>
}
