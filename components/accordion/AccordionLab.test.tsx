// Tests for AccordionLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <AccordionLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.all(selector) finds elements inside it; s.click(el) clicks like a user and waits until the view has updated
//   (that is why the test that clicks is async and awaits it); s.text() is all visible text.
// - The tests check what a user or a screen reader can observe (aria-expanded, disabled, visible text) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. Class names of the parts (.m-acc-btn for
// a header button, .m-acc-chev for its arrow) are listed in the Accordion docs.
import { test, expect, renderTest } from "march/testing"
import { AccordionLab } from "./AccordionLab.tsx"

// `open` with `multiple`: both sections given in open={[…]} start expanded. aria-expanded on the header button is
// the accessible way to tell an open section from a closed one.
test("open ile verilen iki bölüm baştan açık (multiple)", () => {
  const s = renderTest(() => <AccordionLab />)
  const heads = s.all(".lab-acc .m-acc-btn")
  expect(heads[0]?.getAttribute("aria-expanded")).toBe("true")
  expect(heads[1]?.getAttribute("aria-expanded")).toBe("true")
})

// Clicking a header toggles its section and calls onToggle; the Lab writes the event into its "last event" line,
// so we check the visible text instead of spying on the callback.
test("başlığa basınca bölüm kapanır ve onToggle olayı yazar", async () => {
  const s = renderTest(() => <AccordionLab />)
  await s.click(s.all(".lab-acc .m-acc-btn")[0]!)
  expect(s.all(".lab-acc .m-acc-btn")[0]?.getAttribute("aria-expanded")).toBe("false")
  expect(s.text()).toContain("profil kapandı")
})

// An item with `disabled: true` renders a disabled button: it cannot be clicked or toggled.
test("disabled bölümün başlığı devre dışı", () => {
  const s = renderTest(() => <AccordionLab />)
  expect((s.all(".lab-acc .m-acc-btn")[2] as HTMLButtonElement).disabled).toBe(true)
})

// chevron={false} on the second Accordion: no arrow element is drawn at all (not just hidden).
test("chevron={false} ok çizmez", () => {
  const s = renderTest(() => <AccordionLab />)
  const plain = s.all(".m-accordion")[1]!
  expect(plain.querySelector(".m-acc-chev")).toBe(null)
})
