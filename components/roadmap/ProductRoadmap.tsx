import { Roadmap } from "march/landing"

// bir not uygulamasının yol haritası: sayfa kaydıkça çizgi dolar, geçilen noktalar yanar
export function ProductRoadmap() {
  return <Roadmap labels={{ done: "Yayında", now: "Yapılıyor", next: "Planlandı" }} items={[
    { time: "Ocak 2026", title: "Çevrimdışı notlar", body: "İnternet yokken yaz, gelince eşitlensin.", status: "done" },
    { time: "Nisan 2026", title: "Paylaşılan defterler", body: "Ailen ya da ekibinle aynı defterde.", status: "done" },
    { time: "Eylül 2026", title: "Sesli not → yazı", body: "Konuş, Türkçe metne dönsün.", status: "now" },
    { time: "2027", title: "El yazısı tanıma", body: "Tablette kalemle yaz, aranabilir olsun.", status: "next" },
    { time: "2027", title: "Masaüstü uygulaması", body: "Windows ve macOS için.", status: "next" },
  ]} />
}
