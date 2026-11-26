// MysteryDoor: the creative-minimal BranchingStory example.
//
// Mysterious doors: pick one of three doors, and a counter says how many steps you have taken. Choices can lead back
// (the red room has a "go back" choice that returns to the hall), so a story is a graph, not a straight line. It
// shows the smallest BranchingStory: just `start`, `passages` and a label. Use the pattern for short interactive
// tales and playful quizzes.
import { BranchingStory } from "march/landing"

export function MysteryDoor() {
  // The number of steps taken so far (reactive state).
  let $steps = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* onChange receives the whole path (the list of passage ids visited); the first entry is the start, so its
        length minus one is the number of steps. The passages are data: `choices` lead to other passage ids (`to`),
        `note` is a small hint on a choice, and a passage with an `ending` and no choices is a result. Number keys 1-9
        pick a choice and the trail above the story rewinds to any step (both are on by default). minHeight keeps the
        stage steady, and label names the story for screen readers. */}
    <BranchingStory start="hol" minHeight="14rem" label="Gizemli kapılar" onChange={(p: string[]) => $steps = p.length - 1}
      passages={{
        hol: { title: "🚪🚪🚪 Üç kapı", body: "Uzun bir koridordasın. Önünde üç kapı var.", choices: [
          { label: "Kırmızı kapı", to: "kirmizi" }, { label: "Mavi kapı", to: "mavi" }, { label: "Minicik kapı", to: "mini", note: "eğilmen gerek" }] },
        kirmizi: { title: "🔥 Sıcak oda", body: "İçerisi fırın gibi. Ortada bir dondurma makinesi duruyor.", choices: [
          { label: "Dondurma al", to: "dondurma" }, { label: "Geri çık", to: "hol" }] },
        mavi: { title: "🌊 Akvaryum", body: "Duvarlar camdan, bir ahtapot sana el sallıyor.", ending: "Ahtapotun arkadaşı" },
        mini: { title: "🐭 Fare kasabası", body: "Küçülüyorsun! Fareler seni çay içmeye davet ediyor.", ending: "Kasabanın konuğu" },
        dondurma: { title: "🍦 Serinlik", body: "Fıstıklı ve limonlu. Fırın artık umrunda değil.", ending: "Dondurmacı" },
      }} />
    <small sx={{ color: "muted" }}>{$steps} adım attın</small>
  </div>
}
