// Tests for FormLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FormLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null), s.all(selector) all of them; s.find("text") finds an element by its
//   visible text; s.sees("text") answers whether that text is on screen.
// - s.type(field, value) types like a user and s.click(el) clicks like a user; both wait until the view has updated,
//   which is why the tests that use them are async and await them. s.wait(() => condition) polls until a condition
//   holds (used when the result appears a moment later, such as after a submit).
// - The tests check what a user or a screen reader can observe (visible text, input values, disabled, aria-invalid)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. Fields are found with [name=...], the
// property name used in the schema.
import { test, expect, renderTest } from "march/testing"
import { FormLab } from "./FormLab.tsx"

// The schema's sections and the `initial` values show up on the first render, and onReady has already run
// (the "ready" text in the state line is written by it).
test("şemadaki alanlar bölümleriyle çizilir; başlangıç değerleri dolu", () => {
  const s = renderTest(() => <FormLab />)
  expect(s.sees("Kimlik")).toBe(true)
  expect(s.sees("Profilinde gösterilir")).toBe(true)
  expect((s.get(".lab-form [name=name]") as HTMLInputElement).value).toBe("Ece")
  expect(s.sees("hazır: evet")).toBe(true)
})

// requireDirty: the submit button is disabled until a field changes. After typing a new name and clicking it, onSubmit
// writes the saved values into the page; we wait for that text because submitting is asynchronous.
test("değişmeden kaydedilemez (requireDirty); değişince kaydedilir", async () => {
  const s = renderTest(() => <FormLab />)
  const save = s.find("Kaydet")!.closest("button") as HTMLButtonElement
  expect(save.disabled).toBe(true)
  await s.type(s.get(".lab-form [name=name]")!, "Deniz")
  expect(s.sees("değişiklik: 0")).toBe(false)
  await s.click(save)
  await s.wait(() => s.sees("Kaydedilen: Deniz · İzmir"))
  expect(s.sees("Kaydedilen: Deniz · İzmir")).toBe(true)
})

// validateOn="change": emptying a required field is reported at once. aria-invalid is what assistive technology reads.
test("zorunlu alan boşalınca hata gösterir (validateOn change)", async () => {
  const s = renderTest(() => <FormLab />)
  await s.type(s.get(".lab-form [name=name]")!, "")
  expect(s.get(".lab-form [name=name]")!.getAttribute("aria-invalid")).toBe("true")
})

// actions={false} on the second Form: no submit button is drawn at all.
test("actions={false}: düğme yok", () => {
  const s = renderTest(() => <FormLab />)
  expect(s.get(".lab-plain button[type=submit]")).toBe(null)
})
