// ProductRoadmap: the real-life Roadmap example.
//
// What it shows: the roadmap of a note-taking app: five entries with a time, a title, a text and a status. The line
// fills as the page scrolls, and the dots of the entries it has passed light up.
// When to use this pattern: a product roadmap, a company story or a work history.
//
// Animation: the fill and the entrance of the entries run on the motion engine (reduced motion shows the line full);
// `scroll={false}` shows the full line and `reveal={false}` removes the entrance. Accessibility: an ordered list with
// <time> elements; the status is a text badge, not only colour.

import { Roadmap } from "march/landing"

export function ProductRoadmap() {
  // - labels: the texts of the three statuses (done, now, next) shown as badges.
  // - items: { time, title, body, status }; status is "done", "now" or "next" and decides how the entry looks.
  //   The texts are content, so they stay Turkish.
  return <Roadmap labels={{ done: "Yayında", now: "Yapılıyor", next: "Planlandı" }} items={[
    { time: "Ocak 2026", title: "Çevrimdışı notlar", body: "İnternet yokken yaz, gelince eşitlensin.", status: "done" },
    { time: "Nisan 2026", title: "Paylaşılan defterler", body: "Ailen ya da ekibinle aynı defterde.", status: "done" },
    { time: "Eylül 2026", title: "Sesli not → yazı", body: "Konuş, Türkçe metne dönsün.", status: "now" },
    { time: "2027", title: "El yazısı tanıma", body: "Tablette kalemle yaz, aranabilir olsun.", status: "next" },
    { time: "2027", title: "Masaüstü uygulaması", body: "Windows ve macOS için.", status: "next" },
  ]} />
}
