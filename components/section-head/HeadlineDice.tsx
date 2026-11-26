// HeadlineDice: the creative-minimal SectionHead example.
//
// What it shows: one SectionHead whose title, scale (`size`) and alignment (`align`) change every time you press its
// own "roll" action, so you can see the four sizes and three alignments side by side in time.
// When to use this pattern: when a heading block must follow state. Read the signal inside a function and pass the
// values into the props; an action with `onClick` (instead of `href`) makes the button run code.
import { SectionHead } from "march/landing"

// Four "rolls". `as const` keeps size and align as exact literals, which is what the component's props expect.
const ROLLS = [
  { eyebrow: "🎲 1", title: "Pazartesi sendromuna son", size: "sm", align: "start" },
  { eyebrow: "🎲 2", title: "Kahve bitti, panik yok", size: "md", align: "center" },
  { eyebrow: "🎲 3", title: "Kediler ofisi devraldı", size: "lg", align: "end" },
  { eyebrow: "🎲 4", title: "Bugün her şey mümkün", size: "xl", align: "center" },
] as const

export function HeadlineDice() {
  // `let $roll` is a March signal: pressing the action writes it and the function below redraws the head.
  let $roll = 0
  return <div>
    {() => {
      // The signal is read inside this function, so the whole SectionHead is drawn again for the new roll.
      // - size: the scale of the title: sm (a card), md (a section), lg (a call to action) or xl (a hero).
      // - align: start, center or end.
      // - actions: one button that runs onClick (it moves to the next roll and wraps around at the end).
      // - note: the small text under the actions; here it prints the current scale and alignment.
      const r = ROLLS[$roll]!
      return <SectionHead eyebrow={r.eyebrow} title={r.title} size={r.size} align={r.align}
        actions={[{ label: "Zar at", onClick: () => $roll = ($roll + 1) % ROLLS.length }]} note={`${r.size} ölçek · ${r.align} hiza`} />
    }}
  </div>
}
