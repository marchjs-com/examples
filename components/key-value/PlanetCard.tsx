// PlanetCard: the creative-minimal KeyValue example.
//
// What it shows: a small fact card for a planet. A Segmented control picks the planet and the KeyValue below shows its
// facts; the card title follows the choice too.
// When to use this pattern: a product spec, a profile or any "pick one, see its attributes" view. Because `items` can
// be a plain object, the data stays a simple lookup table and its keys become the labels, with no mapping code.
//
// Animation: none. Accessibility: KeyValue is a real <dl>, so label / value pairs are announced together; Segmented is
// a keyboard-operable group.
import { KeyValue, Card, Segmented } from "march/ui"

// The data: one object of facts per planet. The inner keys become the labels of the KeyValue rows.
const PLANETS: Record<string, Record<string, string>> = {
  Mars: { "Güneşe uzaklık": "228 milyon km", "Bir gün": "24 sa 37 dk", "Uydu": "2", "Renk": "Kızıl" },
  Jüpiter: { "Güneşe uzaklık": "778 milyon km", "Bir gün": "9 sa 56 dk", "Uydu": "95", "Renk": "Çizgili" },
  Satürn: { "Güneşe uzaklık": "1,4 milyar km", "Bir gün": "10 sa 33 dk", "Uydu": "146", "Renk": "Altın" },
}

export function PlanetCard() {
  // The chosen planet, a signal: Segmented writes it through bind:value and the parts below read it.
  let $p = "Mars"
  return <Card title={() => `🪐 ${$p}`}>
    {/* The options are the object's keys, so adding a planet to PLANETS adds a button. The Card title is a function
        too, so it is written again when the choice changes. */}
    <Segmented options={Object.keys(PLANETS)} bind:value={$p} />
    {/* `items` as a function returning an object: it reads $p, so the rows are redrawn for the chosen planet. */}
    <KeyValue items={() => PLANETS[$p]} columns={2} />
  </Card>
}
