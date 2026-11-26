// Tests for SecretLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SecretLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null), s.all(selector) all matches.
// - s.click("name") clicks the control with that visible text or aria-label (the eye button is found by its label);
//   it waits until the view has updated, which is why the tests that click are async and await it.
// - The tests check what a user or a screen reader can observe (the visible text, which parts exist, the stats line the
//   Lab prints) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value. The part classes (.m-secret-text,
// .m-secret-shown, .m-secret-eye) are the classes Secret puts on its own parts.
import { test, expect, renderTest } from "march/testing"
import { SecretLab } from "./SecretLab.tsx"

// With the default regions only the first and last 4 characters are shown. The important check is the negative one: the
// hidden part must not be in the page text at all (not just visually masked). The hidden-count text is the Lab's own
// `labels.hidden` and is what a screen reader hears instead of the characters.
test("varsayılan: ilk ve son 4 görünür, gizli kısım sayfada yok", async () => {
  const s = renderTest(() => <SecretLab />)
  const key = s.get(".lab-key")!
  expect(key.textContent).toContain("sk_l")
  expect(key.textContent).toContain("d05a")
  expect(key.textContent).not.toContain("live_7f3a")
  expect(key.textContent).toContain("16 karakter gizli")
})

// The eye button (named by labels.show / labels.hide) shows the whole value. The stats line proves that the two
// callbacks work: onRevealChange counted one flip and bind:revealed wrote the open state back to the Lab. Pressing again
// hides it, and the name of the button changes with the state.
test("göz düğmesi açar, bind:revealed ve onRevealChange izler", async () => {
  const s = renderTest(() => <SecretLab />)
  await s.click("Anahtarı göster")
  expect(s.get(".lab-key .m-secret-text")?.textContent).toBe("sk_live_7f3a9c21e4b8d05a")
  expect(s.get(".lab-stats")?.textContent).toBe("göz: 1 · kopya: 0 · açık: evet")
  await s.click("Anahtarı gizle")
  expect(s.get(".lab-stats")?.textContent).toContain("açık: hayır")
})

// Choosing the "last 4" range in the Segmented control passes regions={[[0, -4]]}: everything but the last 4
// characters is hidden, so exactly one shown part remains.
test("aralık seçimi: son 4 görünür", async () => {
  const s = renderTest(() => <SecretLab />)
  await s.click("son 4")
  expect(s.all(".lab-key .m-secret-shown").map((e: Element) => e.textContent)).toEqual(["d05a"])
})

// The PIN uses maskLength={6}: six mask characters although the value has 4 characters, so the length is not revealed;
// toggle={false} means there is no eye button at all. The mask is aria-hidden.
test("PIN: sabit maske uzunluğu, göz yok", () => {
  const s = renderTest(() => <SecretLab />)
  expect(s.get(".lab-pin [aria-hidden]")?.textContent).toBe("✱✱✱✱✱✱")
  expect(s.get(".lab-pin .m-secret-eye")).toBe(null)
})
