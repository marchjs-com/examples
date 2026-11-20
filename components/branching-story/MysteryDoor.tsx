import { BranchingStory } from "march/landing"

// gizemli kapılar: üç kapıdan birini seç; her adımda kaç adım attığını sayar
export function MysteryDoor() {
  let $steps = 0
  return <div sx={{ flex: "col", gap: 2 }}>
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
