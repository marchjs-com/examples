import { CtaBand } from "march/landing"

// beşlik bandı: her basışta sayaç artar, başlık ve not kendiliğinden güncellenir (title ve note işlev olabilir)
export function HighFive() {
  let $fives = 0
  return <CtaBand variant="mesh" reveal="none"
    title={() => ($fives ? `${$fives} beşlik çakıldı ✋` : "Bir beşlik çak!")}
    lead="Gün boyu iyi iş çıkardın."
    actions={[{ label: "✋ Çak", onClick: () => $fives++ }]}
    note={() => ($fives >= 5 ? "Efsane oldun 🏆" : `Efsaneye ${5 - $fives} kaldı`)} />
}
