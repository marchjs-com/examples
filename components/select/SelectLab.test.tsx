// Tests for SelectLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SelectLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(field, value) sets the value of a field and fires the events a user would; the field is found by its label,
//   aria-label, name or a selector. For a native select the value is the option's value attribute, which is the option's
//   position number ("3" is the fourth option); Select then gives the app the value in its own type.
// - s.click("name") clicks the control with that name; s.find("name") finds an element by its text or aria-label;
//   s.get(selector) finds by CSS; s.text() is all visible text. Everything that changes the page is awaited, which is
//   why most tests are async.
// - The tests check what a user or a screen reader can observe (the text the Lab prints, the option list, ARIA and
//   disabled attributes) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the field name, the value or the expected line.
import { test, expect, renderTest } from "march/testing"
import { SelectLab } from "./SelectLab.tsx"

// The number option keeps its type: the Lab prints typeof, so "(number)" proves it did not turn into text. Choosing the
// fifth option (index 4, the number 8) also calls onChange once.
test("seçilen sayı sayı olarak gelir, onChange çağrılır", async () => {
  const s = renderTest(() => <SelectLab />)
  expect(s.text().includes("Seçili: 3 (number)")).toBe(true)
  await s.type("Fibonacci", "4")
  expect(s.text().includes("Seçili: 8 (number) · değişiklik: 1")).toBe(true)
})

// Object options: the select has three options and the third is `disabled`. Choosing the second gives the Lab the whole
// plan object, from which it prints the id and the seat count.
test("nesne şık seçilir; kapalı şık seçilemez işaretli", async () => {
  const s = renderTest(() => <SelectLab />)
  const plan = s.find("Plan")!.querySelectorAll("option")
  expect(plan.length).toBe(3)
  expect(plan[2]!.hasAttribute("disabled")).toBe(true)
  await s.type("Plan", "1")
  expect(s.text().includes("Plan: team · 10 koltuk")).toBe(true)
})

// A live option list (a function returning an array) follows its source: pressing the button adds a size and the
// select gets a fifth option. A comma-separated text becomes one option per part.
test("canlı liste büyür; virgüllü metin şıklara bölünür", async () => {
  const s = renderTest(() => <SelectLab />)
  const sizes = () => s.find("Beden")!.querySelectorAll("option")
  expect(sizes().length).toBe(4)
  await s.click("Beden ekle")
  expect(sizes().length).toBe(5)
  expect(sizes()[4]!.textContent).toBe("XXL")
  expect([...s.find("İçecek")!.querySelectorAll("option")].map((o) => o.textContent)).toEqual(["Çay", "Kahve", "Ayran", "Limonata"])
  await s.type("İçecek", "2")
  expect(s.text().includes("İçecek: Ayran")).toBe(true)
})

// The form-facing props: an empty required select is invalid (aria-invalid) and points to its hint through
// aria-describedby; the placeholder is its empty first option. Choosing a team clears the invalid state. A disabled
// select and a readonly select are both disabled (readonly disables the native select).
test("zorunlu boş alan geçersiz, seçince düzelir; salt okunur select kapalıdır", async () => {
  const s = renderTest(() => <SelectLab />)
  const team = s.get("#lab-team")!
  expect(team.getAttribute("aria-invalid")).toBe("true")
  expect(team.hasAttribute("required")).toBe(true)
  expect(team.getAttribute("aria-describedby")).toBe("lab-team-hint")
  expect(team.querySelector("option")?.textContent).toBe("Takım seç…")
  await s.type("#lab-team", "1")
  expect(s.text().includes("Takım: Mobil")).toBe(true)
  expect(team.getAttribute("aria-invalid")).toBe(null)
  expect(s.find("Kilitli şehir")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Para birimi")?.hasAttribute("disabled")).toBe(true)
})
