// MealKitFit: the real-life NotForYou example.
//
// An honest section on the website of a weekly meal-kit service: who the product is not for, and who it is for. Each
// "not for you" line has an explanation (`detail`) and a positive turn (`instead`), and the visitor can strike out the
// lines that do not apply to them. Use this pattern on a landing page to build trust by being upfront.
import { NotForYou } from "march/landing"

export function MealKitFit() {
  return <section sx={{ flex: "col", gap: 3 }}>
    <h2>Tencere Kutusu herkese göre değil</h2>
    <p sx={{ color: "muted" }}>Para vermeden önce dürüstçe söyleyelim: bazı durumlarda başka bir seçenek sana daha iyi gelir.</p>
    {/* - check: the lines become toggle cards that can be struck out; striking one out reveals its `instead` text.
        - title / forYouTitle: the headings of the two columns (they stack on narrow screens).
        - items: who it is NOT for. `text` is the line, `detail` the explanation under it, `instead` the positive
          side shown after the strike-out.
        - forYou: who it IS for (the second column; these are plain lines, they cannot be struck out).
        Each line is a list item and, with check, a checkbox button, so keyboard and screen reader users can use it.
        The verdict under the list uses the built-in text because no `verdict` is given. */}
    <NotForYou check title="Sana göre değil, eğer…" forYouTitle="Tam sana göre, eğer…"
      items={[
        { text: "Hiç yemek yapmak istemiyorsun", detail: "Kutuda malzeme var, hazır yemek yok. Hazır yemek servisi sana daha uygun.", instead: "Yarım saat mutfakta olmak sana iyi geliyor." },
        { text: "Her gün evde değilsin", detail: "Kutu salı günü gelir, malzemeler beş gün tazedir.", instead: "Haftanın çoğu akşamı evdesin." },
        { text: "Bütçen öğün başına 80 ₺'nin altında", detail: "Öğün başına 120 ₺'den başlıyoruz.", instead: "Pazara gitmeye ayırdığın zamanı paraya değer buluyorsun." },
      ]}
      forYou={[
        { text: "Ne pişireceğini düşünmekten yoruldun", detail: "Her hafta altı yeni tarif." },
        { text: "Israftan kaçınıyorsun", detail: "Malzemeler tarif kadar, gramıyla." },
      ]} />
  </section>
}
