import { Picture } from "march/ui"
import { ScrollStory } from "march/landing"

// bir birikim uygulamasının tanıtımı: adımlar kaydıkça sabit görsel değişir
const Screen = (p: { title: string; amount: string; note: string }) => <div sx={{ flex: "col", gap: 2, p: 5, radius: 3, shadow: 2 }} role="img" aria-label={p.title}>
  <span sx={{ color: "muted" }}>{p.title}</span>
  <strong sx={{ text: "2xl" }}>{p.amount}</strong>
  <span sx={{ text: "sm" }}>{p.note}</span>
</div>

export function SavingsStory() {
  return <ScrollStory side="start" steps={[
    { title: "Hedefini koy", body: "Tatil, bilgisayar ya da acil durum: bir ad ve tutar yaz, gerisini biz planlayalım.", media: <Screen title="Yaz tatili" amount="30.000 ₺" note="Haziran'a kadar" />, color: "brand-blue" },
    { title: "Küsuratları biriktir", body: "Her kart harcamasını yukarı yuvarlıyoruz; aradaki fark kumbarana gider.", media: <Screen title="Bu hafta" amount="+142 ₺" note="37 harcamadan" />, color: "brand-green" },
    { title: "Faizle büyüsün", body: "Kumbaran her gün faiz kazanır; istediğin an çekersin.", media: <Picture src="/media/hadi-waves.jpg" alt="Dalgalar" width={320} height={200} />, color: "brand-purple" },
    { title: "Hedefe ulaş", body: "Hedefe varınca kutlarız; parayı tek dokunuşla hesabına aktar.", media: <Screen title="Tamamlandı 🎉" amount="30.000 ₺" note="2 hafta erken" />, color: "brand-orange" },
  ]} />
}
