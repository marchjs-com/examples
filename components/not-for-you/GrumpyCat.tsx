// GrumpyCat: the creative-minimal NotForYou example.
//
// Adopting a grumpy cat: the lines say who the cat is NOT for; you strike out each line that does not describe you, and
// when all of them are struck out the cat is yours. It shows `check` mode with onCheck and your own verdict text.
// Use this pattern when you want a playful, honest "is this for me?" block that reacts to the visitor.
import { NotForYou } from "march/landing"

// Each line: `text` is the "not for you if..." sentence, `instead` is the positive side that appears once the line is
// struck out.
const LINES = [
  { text: "Sabah 5'te uyanmaktan nefret ediyorsun", instead: "Erkenci kuşsun: kahvaltı saati kedinle aynı." },
  { text: "Kanepene bir şey olmasın istiyorsun", instead: "Kanepe zaten eskiydi." },
  { text: "Sevgi gösterisi bekliyorsun", instead: "Haftada bir mırıltı sana yeter." },
]

export function GrumpyCat() {
  // How many lines the visitor has struck out; the headline compares it with the total.
  let $count = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <strong sx={{ text: "xl" }}>{$count === LINES.length ? "😼 Pamuk artık senin!" : "😾 Pamuk'u sahiplenmek ister misin?"}</strong>
    {/* - check: every line becomes a toggle card (role checkbox with aria-checked, so it works with the keyboard
          and screen readers); a tap strikes it out.
        - onCheck gets the list of struck-out line indexes on every change; only its length is used here.
        - hint / markedHint: the small text under a card before and after the tap.
        - verdict: a function (n struck out, total) giving the sentence under the list; it is a status region, so a
          screen reader announces it when it changes.
        Not set: variant (cards), meLabel, mark and forYou, so they use their defaults. The strike-out and the colour
        change of the mark follow the motion engine (reduced motion, global speed, "Stop all"). */}
    <NotForYou check title="Pamuk sana göre değil, eğer…" items={LINES} onCheck={(m: number[]) => $count = m.length}
      hint="Sen değil misin? Dokun" markedHint="Tamam, sen değilsin"
      verdict={(n: number, total: number) => (n === total ? "Pamuk seni onayladı." : `${total - n} engel kaldı.`)} />
  </div>
}
