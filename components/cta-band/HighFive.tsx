// HighFive: the creative-minimal CtaBand example.
//
// What it shows: a high-five band. Every press raises a counter, and the title and the note update by themselves
// (they are functions that read the state), counting down to "legend".
// When to use this pattern: a band that reacts to what the visitor does. `title` and `note` accept a function, so the
// texts stay live without drawing the band again. variant="mesh" is a different background (gradient, mesh, glass,
// plain or video) and reveal="none" removes the entrance motion: nothing moves when the band scrolls into view; by
// default the panel scales in on the motion engine (reduced motion and "Stop all" apply there).
import { CtaBand } from "march/landing"

export function HighFive() {
  let $fives = 0
  return <CtaBand variant="mesh" reveal="none"
    title={() => ($fives ? `${$fives} beşlik çakıldı ✋` : "Bir beşlik çak!")}
    lead="Gün boyu iyi iş çıkardın."
    actions={[{ label: "✋ Çak", onClick: () => $fives++ }]}
    note={() => ($fives >= 5 ? "Efsane oldun 🏆" : `Efsaneye ${5 - $fives} kaldı`)} />
}
