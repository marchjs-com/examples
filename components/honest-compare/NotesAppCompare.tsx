import { HonestCompare } from "march/landing"

// bir not uygulamasının fiyat sayfasındaki dürüst karşılaştırma: geride kaldığı satırlarda nedenini ve planı yazar
export function NotesAppCompare() {
  return <section sx={{ flex: "col", gap: 3 }}>
    <h2>Defter ve diğerleri: dürüst bir karşılaştırma</h2>
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
