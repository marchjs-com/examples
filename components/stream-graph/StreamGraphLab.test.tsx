import { test, expect, renderTest } from "march/testing"
import { StreamGraphLab } from "./StreamGraphLab.tsx"

// StreamGraphLab's tests: they run in MarchIDE's Tests tab when you save. They check layers, texts and the hidden
// data table (what users and screen readers get), not how far an animation has run.

// Proves four genres make four layers and the accessible name and description reach the SVG.
test("dört tür dört katman; başlık ve açıklama", () => {
  const s = renderTest(() => <StreamGraphLab />)
  const chart = s.get(".lab-stream")!
  expect(chart.querySelectorAll(".m-chart-area").length).toBe(4)
  expect(chart.querySelector("svg title")!.textContent).toBe("Türlere göre dinleme")
  expect(chart.querySelector("svg desc")!.textContent).toBe("Ay ay müzik türlerine göre dinleme saatleri")
})

// Proves a stream has no value axis (the shape is the message) and the edges class is set.
test("değer ekseni yok, kenar çizgileri açık", () => {
  const s = renderTest(() => <StreamGraphLab />)
  const chart = s.get(".lab-stream")!
  expect(chart.querySelector(".m-chart-axis-left")).toBe(null)
  expect(chart.classList.contains("m-stream-edges")).toBe(true)
})

// Proves a new month grows the data table, and emptying the data shows the empty text.
test("bir ay daha tabloyu büyütür; boşalınca boş metni", async () => {
  const s = renderTest(() => <StreamGraphLab />)
  await s.click(".lab-more")
  expect(s.get(".lab-stream")!.querySelectorAll("table tbody tr").length).toBe(13)
  await s.click(".lab-empty")
  expect(s.sees("Dinleme yok")).toBe(true)
})
