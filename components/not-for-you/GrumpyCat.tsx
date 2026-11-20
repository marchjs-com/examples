import { NotForYou } from "march/landing"

// huysuz kediyi sahiplenmek: sana uymayan satırların üstünü çiz; hepsi çizilince kedi senindir
const LINES = [
  { text: "Sabah 5'te uyanmaktan nefret ediyorsun", instead: "Erkenci kuşsun: kahvaltı saati kedinle aynı." },
  { text: "Kanepene bir şey olmasın istiyorsun", instead: "Kanepe zaten eskiydi." },
  { text: "Sevgi gösterisi bekliyorsun", instead: "Haftada bir mırıltı sana yeter." },
]

export function GrumpyCat() {
  let $count = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <strong sx={{ text: "xl" }}>{$count === LINES.length ? "😼 Pamuk artık senin!" : "😾 Pamuk'u sahiplenmek ister misin?"}</strong>
    <NotForYou check title="Pamuk sana göre değil, eğer…" items={LINES} onCheck={(m: number[]) => $count = m.length}
      hint="Sen değil misin? Dokun" markedHint="Tamam, sen değilsin"
      verdict={(n: number, total: number) => (n === total ? "Pamuk seni onayladı." : `${total - n} engel kaldı.`)} />
  </div>
}
