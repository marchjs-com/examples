// PetShelter: the creative-minimal ProjectGrid example.
//
// What it shows: animals in a shelter as cards with big emoji covers and filter chips for cat / dog / bird; pressing
// a card raises an "adoption request" counter. When to use this pattern: any filterable set of cards (a catalogue,
// a portfolio) whose cards need no photographs.
//
// Animation: filtering fades out what no longer matches and glides the rest into place; the cards enter with the
// default reveal. Both run on the motion engine (reduced motion, global speed and "Stop all" apply); `motion={false}`
// and `reveal={false}` turn them off. Accessibility: filters are toggle chips (aria-pressed) in a labelled group.

import { ProjectGrid } from "march/landing"

// The shape of a card: a cover that is either an image or a node, plus a title and optional category, year and summary.
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; href?: string; cover: Node | { src: string; alt: string; width: number; height: number } }
// The animals. The category becomes a filter chip; `year` is the age text shown on the card.
const PETS = [
  { id: "pamuk", title: "Pamuk", category: "Kedi", year: "2 yaş", emoji: "🐱" },
  { id: "karabas", title: "Karabaş", category: "Köpek", year: "4 yaş", emoji: "🐶" },
  { id: "limon", title: "Limon", category: "Kuş", year: "1 yaş", emoji: "🐤" },
  { id: "tarcin", title: "Tarçın", category: "Kedi", year: "6 ay", emoji: "😺" },
  { id: "bulut", title: "Bulut", category: "Köpek", year: "3 yaş", emoji: "🐕" },
]

// A big emoji as the cover (aria-hidden: it is decoration; the title names the card).
const Face = (p: { emoji: string }) => <div style={{ "font-size": "4rem", "text-align": "center", padding: "1.5rem" }} aria-hidden="true">{p.emoji}</div>

export function PetShelter() {
  // Counts the presses on a card.
  let $adopted = 0
  // `cover` is a getter, so every read builds a fresh node (a DOM node can only be in one place).
  const pets: Project[] = PETS.map((p) => ({ ...p, get cover() { return <Face emoji={p.emoji} /> as Node } }))
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The counter updates whenever $adopted changes. */}
    <strong>Sahiplenme isteği: {$adopted}</strong>
    {/* - projects: the cards; filter chips appear by themselves when there are two or more categories.
        - cols={3}: three columns (2 or 3). allLabel: the text of the "all" chip.
        - onOpen: called when a card is pressed (without it the cover would open in a Lightbox). */}
    <ProjectGrid projects={pets} cols={3} allLabel="Hepsi" onOpen={() => $adopted++} />
  </div>
}
