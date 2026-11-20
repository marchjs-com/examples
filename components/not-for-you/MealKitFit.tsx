import { NotForYou } from "march/landing"

// haftalık yemek kutusu sitesinde dürüst bir bölüm: kimin için olmadığı, kimin için olduğu
export function MealKitFit() {
  return <section sx={{ flex: "col", gap: 3 }}>
    <h2>Tencere Kutusu herkese göre değil</h2>
    <p sx={{ color: "muted" }}>Para vermeden önce dürüstçe söyleyelim: bazı durumlarda başka bir seçenek sana daha iyi gelir.</p>
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
