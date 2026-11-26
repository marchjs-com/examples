// Tests for DialogLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DialogLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (a visible text or an element) and waits for the view to update, so tests that click are async.
// - s.flush(2) lets the dialog's entrance (portal and motion) settle: dialogs are drawn in a layer on the page, not inside
//   the test's root, so some checks use document.querySelector.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DialogLab } from "./DialogLab.tsx"

// Opening the dialog shows it with its title. The Lab takes `startOpen` so the tests can begin with the dialog closed.
test("Aç pencereyi başlığıyla gösterir", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Aç")
  await s.flush(2)
  expect(s.sees("Ayarlar")).toBe(true)
})

// The close button uses `closeLabel` as its accessible name (the Lab sets a custom icon and name); pressing it calls
// onClose, which the Lab counts.
test("kendi kapat düğmesi closeLabel adıyla onClose'u çağırır", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Aç")
  await s.flush(2)
  await s.click("Geri dön")
  expect(s.get(".lab-closed")?.textContent).toBe("1 kez kapandı")
})

// A button in the `footer` slot closes it the same way, because it calls the same close handler.
test("footer düğmesi de kapatır", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Aç")
  await s.flush(2)
  await s.click("Kaydet")
  expect(s.get(".lab-closed")?.textContent).toBe("1 kez kapandı")
})

// A dialog without a title takes its accessible name from `label`; with modal={false} it has no aria-modal, so the page
// behind stays usable. The last click closes it so no layer is left behind.
test("başlıksız kipsiz pencere label adını alır, aria-modal yok", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Not")
  await s.flush(2)
  const d = document.querySelector("[aria-label='Hızlı not']")
  expect(d).not.toBe(null)
  expect(d?.getAttribute("aria-modal")).toBe(null)
  await s.click("Not")
  await s.flush(2)
})
