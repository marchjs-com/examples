import { Tooltip, Button } from "march/ui"

// periyodik tablodan bir sıra: her elementin adı ipucunda, renkli balonla
const elements = [["H", "Hidrojen"], ["He", "Helyum"], ["Li", "Lityum"], ["C", "Karbon"], ["O", "Oksijen"]]

export function PeriodicTable() {
  return <div sx={{ flex: "row", gap: 2 }}>
    {elements.map(([sym, name]) => <Tooltip text={name!} color="brand-purple" delay={0}>
      <Button size="lg" sx={{ text: "bold" }}>{sym}</Button>
    </Tooltip>)}
  </div>
}
