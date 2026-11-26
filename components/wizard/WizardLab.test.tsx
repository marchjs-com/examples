// Tests for WizardLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <WizardLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - The Next button submits the wizard's form, so the tests use s.submit(selector), which fires the same submit event
//   and waits until the view has updated. `next` below is the class the Lab put on the wizard's form.
// - s.type("shop", "test") fills the field found by its name, label or placeholder; s.click(text) clicks a button;
//   s.sees(text) asks if a text is visible; s.wait(predicate) waits until something becomes true (used for the
//   submit, which finishes asynchronously). Every call that changes the view is awaited.
// - The tests check what a user can see (the count text, the step title, error messages, the final line) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the field name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { WizardLab } from "./WizardLab.tsx"

// The selector of the wizard's form (the `class` prop of the Lab).
const next = ".lab-wizard"

// The name field is required: with it empty, Next does not move on, and the count text and step title still show step 1.
test("zorunlu ad boşken İleri ilk adımda kalır", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.submit(next)
  expect(s.sees("1 / 3")).toBe(true)
  expect(s.sees("Adım 1")).toBe(true)
})

// The step's own `validate` returns a field error for the reserved name "test": the message shows and the wizard stays
// on step 1.
test("adın ek doğrulaması alan hatası verir", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.type("shop", "test")
  await s.submit(next)
  expect(s.sees("Bu ad ayrılmış")).toBe(true)
  expect(s.sees("Adım 1")).toBe(true)
})

// With a valid name Next moves to step 2. That step has no title, so its heading comes from labels.step.
test("ad yazılınca ikinci adıma geçer; başlıksız adımın adı labels.step'ten gelir", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.type("shop", "Kahve Durağı")
  await s.submit(next)
  expect(s.sees("2 / 3")).toBe(true)
  expect(s.get(".lab-wizard .m-wizard-title")?.textContent).toBe("Bölüm 2")
  expect(s.sees("Adım 2")).toBe(true)
})

// The go() function that onReady gave the Lab jumps straight to the summary step, which renders the values; submitting
// there runs onSubmit, and its text appears (s.wait waits for it because submitting is asynchronous).
test("onReady'nin go'su özete atlar; Mağazayı aç onSubmit'i çalıştırır", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.type("shop", "Kahve Durağı")
  await s.click("Özete atla")
  expect(s.sees("Kahve Durağı · İzmir · Pro")).toBe(true)
  await s.submit(next)
  await s.wait(() => s.sees("Kahve Durağı açıldı (Pro, 3 kişi)"))
  expect(s.sees("Kahve Durağı açıldı")).toBe(true)
})
