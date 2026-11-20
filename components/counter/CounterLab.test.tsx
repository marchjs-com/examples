import { test, expect, renderTest } from "march/testing"
import { CounterLab } from "./CounterLab.tsx"

// CounterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ön ve son ek sayının iki yanında", () => {
  const s = renderTest(() => <CounterLab />)
  const affix = s.all(".lab-counter .m-counter-affix")
  expect(affix.length).toBe(2)
  expect(affix[0]?.textContent).toBe("★")
  expect(affix[1]?.textContent).toBe(" puan")
})

test("hareketsiz türde sayı hemen yazılır; düğmeyle değişir", async () => {
  const s = renderTest(() => <CounterLab />)
  await s.flush()
  expect(s.get(".lab-counter .m-counter-view")?.textContent).toBe("42")
  await s.click("+8 puan")
  expect(s.get(".lab-counter .m-counter-view")?.textContent).toBe("50")
})

test("ekran okuyucu son değeri bir kez okur", async () => {
  const s = renderTest(() => <CounterLab />)
  await s.click("+8 puan")
  expect(s.get(".lab-counter .m-sr-only")?.textContent).toBe("50")
  expect(s.get(".lab-counter .m-counter-view")?.getAttribute("aria-hidden")).toBe("true")
})

test("odometre türüne geçince basamaklar döner", async () => {
  const s = renderTest(() => <CounterLab />)
  await s.click("roll")
  expect(s.get(".lab-counter")?.classList.contains("m-counter-roll")).toBe(true)
})
