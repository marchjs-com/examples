// Tests for FontPickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FontPickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) / s.get(selector) / s.all(selector) look things up; s.sees(text) says whether text is on screen;
//   s.type(label, text) types into the field with that accessible name; s.click(...) clicks like a user.
// - s.wait(fn) polls until fn is true. The picker draws its list lazily (the catalog is a separate part), so tests wait
//   for what they need instead of assuming it is already there.
// - The tests check observable things (texts, roles, aria-labels) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { FontPickerLab } from "./FontPickerLab.tsx"

// Our own lists and labels: the group names from `labels` appear, and a family from our catalog is listed.
test("kendi listeleri ve metinleri: cihaz ve kitaplık grupları", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.wait(() => s.sees("Kitaplık"))
  expect(s.sees("Cihaz")).toBe(true)
  expect(s.find("Inter")).not.toBe(null)
})

// Typing in the search field filters the list; with no match the custom empty text shows instead.
test("aramada yazılan aile süzülür, eşleşmeyince kendi boş metni görünür", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.type("Yazı tipi ara", "fira")
  await s.wait(() => s.all(".lab-fp [role=option]").length === 1)
  expect(s.get(".lab-fp [role=option]")?.getAttribute("aria-label")).toBe("Fira Code")
  await s.type("Yazı tipi ara", "zzz")
  await s.wait(() => s.sees("Hiçbiri tutmadı"))
  // the empty text appears at once, but the list rows disappear a frame later: wait for that too
  await s.wait(() => s.all(".lab-fp [role=option]").length === 0)
  expect(s.all(".lab-fp [role=option]").length).toBe(0)
})

// Pressing a row runs onPick with the family and its weight (the lab prints it).
test("bir satıra basınca onPick seçimi kalınlığıyla verir", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.wait(() => s.find("Inter") != null)
  await s.click(s.get(".lab-fp [role=option][aria-label=Inter]")!)
  await s.wait(() => s.sees("Seçim: Inter 700"))
})

// A custom trigger button opens the popover, and onOpenChange reports the open state (the lab prints it).
test("kendi düğmesi açılır paneli açar; onOpenChange durumu bildirir", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.click("Başlık yazısı: Georgia")
  await s.wait(() => s.sees("panel: açık"))
})
