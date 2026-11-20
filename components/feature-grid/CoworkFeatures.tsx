import { FeatureGrid } from "march/landing"
import { coffee, monitor, lock, calendar, users, phone } from "march/icons"

// bir ortak çalışma alanının "neler var" bölümü: üç sütun kart, imleç ışığı açık
export function CoworkFeatures() {
  return <FeatureGrid variant="cards" cols={3} items={[
    { icon: monitor, title: "Hazır masa", body: "Ekran, sandalye ve hızlı internet: çantanı bırak, başla." },
    { icon: coffee, title: "Sınırsız kahve", body: "Yerel kavurucudan taze çekirdek, bütün gün." },
    { icon: calendar, title: "Toplantı odası", body: "Uygulamadan saatlik ayır, kapıda kodla gir." },
    { icon: lock, title: "Kilitli dolap", body: "Dizüstün ve eşyaların gece de güvende." },
    { icon: users, title: "Topluluk akşamları", body: "Her perşembe sunum, tanışma ve pizza." },
    { icon: phone, title: "Telefon kabini", body: "Görüntülü görüşmeler için sessiz kabinler.", href: "#kabinler" },
  ]} />
}
