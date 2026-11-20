import { Presentation, Slide, Appear } from "march/landing"

// bilgi yarışması: her slaytta bir soru; ileri basınca önce cevap belirir, sonra sıradaki soru gelir
const QUESTIONS = [
  { q: "Türkiye'nin en uzun nehri?", a: "Kızılırmak 🌊" },
  { q: "Bir ahtapotun kaç kalbi var?", a: "Üç 🐙" },
  { q: "Ay'a ilk ayak basan kim?", a: "Neil Armstrong 🚀" },
]

export function QuizDeck() {
  return <Presentation label="Bilgi yarışması" transition="zoom" sync={false}
    counter={(i: number, n: number) => `Soru ${i + 1} / ${n}`}>
    {QUESTIONS.map((x) => <Slide layout="center" tone="brand">
      <h2>{x.q}</h2>
      <Appear as="div" effect="scale"><p>{x.a}</p></Appear>
    </Slide>)}
  </Presentation>
}
