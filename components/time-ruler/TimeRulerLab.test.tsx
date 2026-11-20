import { test, expect, renderTest } from "march/testing"
import { TimeRulerLab } from "./TimeRulerLab.tsx"

// TimeRulerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("onSeek'li cetvel bir grup, başı bir kaydırıcı; labels adları verir", () => {
  const s = renderTest(() => <TimeRulerLab />)
  const ruler = s.get(".lab-ruler")!
  expect(ruler.getAttribute("aria-label")).toBe("Lab cetveli")
  const head = ruler.querySelector(".lab-head")!
  expect(head.getAttribute("role")).toBe("slider")
  expect(head.getAttribute("aria-label")).toBe("Lab başı")
  expect(head.getAttribute("aria-valuetext")).toBe("1500 milisaniye")
})

test("→ tuşu keyStep kadar ilerletir ve onSeekStart sayar", async () => {
  const s = renderTest(() => <TimeRulerLab />)
  const head = s.get(".lab-head")!
  head.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }))
  await s.flush()
  expect(s.sees("Konum: 2000 ms")).toBe(true)
  expect(s.sees("sürükleme / tuş: 1")).toBe(true)
})

test("ticks kendi etiketlerini, format kendi biçimini yazar", () => {
  const s = renderTest(() => <TimeRulerLab />)
  expect(s.sees("yarı")).toBe(true)
  expect(s.sees("2 sn")).toBe(true)
})
