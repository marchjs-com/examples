// SavingsStory: the real-life ScrollStory example.
//
// What it shows: a product tour for a savings app. The picture on one side stays pinned while the four text steps
// scroll past; whichever step is nearest the middle of the screen is the active one, its picture cross-fades in and the
// section takes that step's colour.
// When to use this pattern: a landing page that explains a process in a few steps and has a picture or mock-up per
// step. On phones the pinned picture sits at the top and the steps flow under it, so the same code works there.
import { Picture } from "march/ui"
import { ScrollStory } from "march/landing"

// A small mock "app screen" used as the picture of three steps. role="img" with an aria-label gives the card one
// accessible name, so a screen reader reads it as a single picture instead of three loose texts.
const Screen = (p: { title: string; amount: string; note: string }) => <div sx={{ flex: "col", gap: 2, p: 5, radius: 3, shadow: 2 }} role="img" aria-label={p.title}>
  <span sx={{ color: "muted" }}>{p.title}</span>
  <strong sx={{ text: "2xl" }}>{p.amount}</strong>
  <span sx={{ text: "sm" }}>{p.note}</span>
</div>

export function SavingsStory() {
  // - side="start": the pinned picture is on the start side (the left in left-to-right text); the default is "end".
  // - steps: one object per step.
  //   title and body: the text that scrolls (each step is an article with a heading, in reading order).
  //   media: any node shown in the pinned column; here the mock screens and, for step three, a real Picture.
  //   color: a theme colour token; because `theme` is on by default, the section is tinted with the active step's colour.
  // Everything else is left at its default: numbers "01, 02…" above the titles, dots under the picture, and the "rise"
  // transition. The picture change runs on the motion engine, so reduced motion swaps the pictures without movement.
  return <ScrollStory side="start" steps={[
    { title: "Hedefini koy", body: "Tatil, bilgisayar ya da acil durum: bir ad ve tutar yaz, gerisini biz planlayalım.", media: <Screen title="Yaz tatili" amount="30.000 ₺" note="Haziran'a kadar" />, color: "brand-blue" },
    { title: "Küsuratları biriktir", body: "Her kart harcamasını yukarı yuvarlıyoruz; aradaki fark kumbarana gider.", media: <Screen title="Bu hafta" amount="+142 ₺" note="37 harcamadan" />, color: "brand-green" },
    { title: "Faizle büyüsün", body: "Kumbaran her gün faiz kazanır; istediğin an çekersin.", media: <Picture src="/media/hadi-waves.jpg" alt="Dalgalar" width={320} height={200} />, color: "brand-purple" },
    { title: "Hedefe ulaş", body: "Hedefe varınca kutlarız; parayı tek dokunuşla hesabına aktar.", media: <Screen title="Tamamlandı 🎉" amount="30.000 ₺" note="2 hafta erken" />, color: "brand-orange" },
  ]} />
}
