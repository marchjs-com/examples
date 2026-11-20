import { test, expect, renderTest } from "march/testing"
import { StatusDotLab } from "./StatusDotLab.tsx"

// StatusDotLab'in testleri: kaydedince Testler sekmesinde çalışır
test("label verilen nokta role=img ve adıyla okunur", () => {
  const s = renderTest(() => <StatusDotLab />)
  const dot = s.find("Ton danger")
  expect(dot?.getAttribute("role")).toBe("img")
  expect(dot?.classList.contains("is-danger")).toBe(true)
})

test("label'sız nokta süs: aria-hidden; class ve öznitelikler köke gider", () => {
  const s = renderTest(() => <StatusDotLab />)
  const dot = s.get(".lab-dot")
  expect(dot?.getAttribute("aria-hidden")).toBe("true")
  expect(dot?.getAttribute("title")).toBe("Turuncu süs")
  expect(dot?.getAttribute("data-state")).toBe("decor")
})

test("pulse true halka olur, blink yanıp söner", () => {
  const s = renderTest(() => <StatusDotLab />)
  expect(s.find("Halka (true)")?.classList.contains("is-pulse-ring")).toBe(true)
  expect(s.find("Yanıp sönme")?.classList.contains("is-pulse-blink")).toBe(true)
})

test("düğmeyle canlı nokta durur: ad, ton ve hareket değişir", async () => {
  const s = renderTest(() => <StatusDotLab />)
  await s.click("Yayını durdur")
  const dot = s.get(".lab-live")!
  expect(dot.getAttribute("aria-label")).toBe("Durdu")
  expect(dot.classList.contains("is-neutral")).toBe(true)
  expect(dot.classList.contains("is-pulse-ring")).toBe(false)
})
