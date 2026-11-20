import { test, expect, renderTest } from "march/testing"
import { ScrollToTopLab } from "./ScrollToTopLab.tsx"

// ScrollToTopLab'in testleri: kaydedince Testler sekmesinde çalışır
// kutuyu kaydırır ve scroll olayını gönderir (düğmeler olayı yakalayarak dinler)
const scrollBox = (s: { get(sel: string): Element | null }, top: number) => {
  const box = s.get(".lab-box") as HTMLElement
  box.scrollTop = top
  box.dispatchEvent(new Event("scroll"))
  return box
}

test("label erişilebilir ad olur; eşik geçilmeden düğme gizli (data-shown=false)", () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const pop = s.find("Zıplayarak (pop, 40 px)")
  expect(pop?.getAttribute("aria-label")).toBe("Zıplayarak (pop, 40 px)")
  expect(pop?.getAttribute("data-shown")).toBe("false")
})

test("kutu eşiği geçince yalnız eşiği geçilenler belirir", () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const pop = s.find("Zıplayarak (pop, 40 px)")!
  scrollBox(s, 150)
  expect(pop.getAttribute("data-shown")).toBe("true")
  expect(s.find("Belirerek (fade, 120 px)")?.getAttribute("data-shown")).toBe("true")
  expect(s.find("Kayarak (slide, 200 px)")?.getAttribute("data-shown")).toBe("false")
})

test("class, m:color ve kendi metnin (icon) düğmeye gider", () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const instant = s.get(".lab-instant")
  expect(instant?.textContent).toBe("⇧")
  expect(s.find("Kayarak (slide, 200 px)")?.getAttribute("data-m-color")).toBe("brand-green")
})

test("smooth={false}: basınca kutu hemen başa döner", async () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const instant = s.get(".lab-instant")!
  const box = scrollBox(s, 400)
  expect(instant.getAttribute("data-shown")).toBe("true")
  await s.click(instant)
  expect(box.scrollTop).toBe(0)
})
