// QuizDeck: the creative-minimal Presentation example.
//
// What it shows: a quiz. Each slide holds one question; pressing next first reveals the answer (an Appear step) and
// only then moves to the next question. When to use this pattern: any "ask, then reveal" flow (quizzes, riddles,
// flash cards) built from the same two components.
//
// Animation: the zoom transition and the reveal run on the motion engine (reduced motion, global speed and "Stop all"
// apply). Keyboard: arrow keys, Space and Page Up / Down step through the questions and answers.

import { Presentation, Slide, Appear } from "march/landing"

// Plain data: add a line and the deck gets another question slide.
const QUESTIONS = [
  { q: "Türkiye'nin en uzun nehri?", a: "Kızılırmak 🌊" },
  { q: "Bir ahtapotun kaç kalbi var?", a: "Üç 🐙" },
  { q: "Ay'a ilk ayak basan kim?", a: "Neil Armstrong 🚀" },
]

export function QuizDeck() {
  // - transition="zoom": a ready transition (slide, fade, zoom or none).
  // - sync={false}: this deck does not mirror other windows or tabs (the default shares a channel named "deck").
  // - counter: a function that writes the counter text itself, "Question 1 / 3" style.
  return <Presentation label="Bilgi yarışması" transition="zoom" sync={false}
    counter={(i: number, n: number) => `Soru ${i + 1} / ${n}`}>
    {/* One slide per question; the Appear child is the answer, hidden until the next step. */}
    {QUESTIONS.map((x) => <Slide layout="center" tone="brand">
      <h2>{x.q}</h2>
      <Appear as="div" effect="scale"><p>{x.a}</p></Appear>
    </Slide>)}
  </Presentation>
}
