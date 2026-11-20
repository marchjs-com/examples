import { SectionHead } from "march/landing"

// başlık zarı: "Zar at" her basışta başka bir başlık, ölçek ve hiza getirir
const ROLLS = [
  { eyebrow: "🎲 1", title: "Pazartesi sendromuna son", size: "sm", align: "start" },
  { eyebrow: "🎲 2", title: "Kahve bitti, panik yok", size: "md", align: "center" },
  { eyebrow: "🎲 3", title: "Kediler ofisi devraldı", size: "lg", align: "end" },
  { eyebrow: "🎲 4", title: "Bugün her şey mümkün", size: "xl", align: "center" },
] as const

export function HeadlineDice() {
  let $roll = 0
  return <div>
    {() => {
      const r = ROLLS[$roll]!
      return <SectionHead eyebrow={r.eyebrow} title={r.title} size={r.size} align={r.align}
        actions={[{ label: "Zar at", onClick: () => $roll = ($roll + 1) % ROLLS.length }]} note={`${r.size} ölçek · ${r.align} hiza`} />
    }}
  </div>
}
