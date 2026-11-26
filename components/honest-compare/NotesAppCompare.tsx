// NotesAppCompare: the real-life HonestCompare example.
//
// What it shows: the comparison section of a note app's pricing page, honest about where it is behind. Rows where the app loses
// get a mark, and their `note` explains why and what is planned.
// When to use this pattern: marketing pages that want trust. Put a `note` on every row where you lose. The default `us` id
// is "us", so the first column here needs no `us` prop.
// Accessibility: a real table (caption, column and row headers); the summary toggle "only where we are behind" is a toggle
// button with aria-pressed, and hidden rows also leave the reading order.
import { HonestCompare } from "march/landing"

export function NotesAppCompare() {
  return <section sx={{ flex: "col", gap: 3 }}>
    <h2>Defter ve diğerleri: dürüst bir karşılaştırma</h2>
    {/* - showCaption: shows the caption (otherwise it is for screen readers only). caption: the table's name.
        - columns: id and name per product; "us" is the default id of our own column.
        - rows: each has a label, a value per column id and an optional note. true / false / "partial" are scored; other text (like
          the prices) is shown but not scored.
        - note: shown under the label of a row where we are behind (what is missing and when it comes). */}
    <HonestCompare showCaption caption="Defter, Büyük Not ve Kâğıt"
      columns={[{ id: "us", name: "Defter" }, { id: "big", name: "Büyük Not" }, { id: "paper", name: "Kâğıt defter" }]}
      rows={[
        { label: "Çevrimdışı çalışır", values: { us: true, big: "partial", paper: true } },
        { label: "Uçtan uca şifreleme", values: { us: true, big: false, paper: "partial" } },
        { label: "El yazısı tanıma", values: { us: false, big: true, paper: false }, note: "Henüz yok. İlkbahar sürümünde geliyor; şimdilik fotoğraf eklenebiliyor." },
        { label: "Ekip paylaşımı", values: { us: "partial", big: true, paper: false }, note: "Beş kişiye kadar ortak defter. Daha büyük ekipler için Büyük Not daha uygun." },
        { label: "Aylık fiyat", values: { us: "49 ₺", big: "129 ₺", paper: "Bir kez 60 ₺" } },
      ]} />
  </section>
}
