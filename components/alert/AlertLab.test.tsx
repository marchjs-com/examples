// Tests for AlertLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <AlertLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds an element by its visible text; s.get(selector) returns one element; s.sees(text) says whether
//   text is on screen; s.click(label) clicks like a user and waits until the view has updated (so those tests are
//   async and await it); s.flush() waits for pending updates when an action runs outside a click.
// - The tests check what a user or a screen reader can observe (roles, visible text, which elements exist) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the text or selector. Part classes (.m-alert, .m-alert-icon) are in the docs.
import { test, expect, renderTest } from "march/testing"
import { AlertLab } from "./AlertLab.tsx"

// The ARIA role depends on urgency: warn and danger are role="alert" (announced at once), the calmer tones are
// role="status" (announced politely). An explicit `role` prop wins: the "raised" alert asks for role="note".
test("warn ve danger role=alert, diğerleri role=status; role prop'u üstün gelir", () => {
  const s = renderTest(() => <AlertLab />)
  expect(s.find("Ton: danger")?.closest(".m-alert")?.getAttribute("role")).toBe("alert")
  expect(s.find("Ton: info")?.closest(".m-alert")?.getAttribute("role")).toBe("status")
  expect(s.get(".lab-alert")?.getAttribute("role")).toBe("note")
})

// The dismiss button is found by its accessible name (`dismissLabel`). Clicking it removes the alert from the page
// and calls onDismiss, whose counter the Lab prints.
test("kapat düğmesi uyarıyı gizler ve onDismiss çağrılır", async () => {
  const s = renderTest(() => <AlertLab />)
  await s.click("Başarı mesajını kapat")
  expect(s.sees("Kapatınca sayaç artar.")).toBe(false)
  expect(s.sees("Kapatılan: 1")).toBe(true)
})

// An action() object passed as `action` is rendered as a small button and its handler runs on click.
// s.flush() lets the counter text update before we read it.
test("action() nesnesi düğme olur ve çalışır", async () => {
  const s = renderTest(() => <AlertLab />)
  await s.click("Kaydet")
  await s.flush()
  expect(s.sees("kaydedilen: 1")).toBe(true)
})

// `class` lands on the root, `partClass` on the named inner parts (body, dismiss), and icon={null} removes the icon
// element entirely.
test("partClass parçalara, class köke eklenir; icon={null} ikonu kaldırır", () => {
  const s = renderTest(() => <AlertLab />)
  const lab = s.get(".lab-alert")
  expect(lab?.querySelector(".lab-body")).not.toBe(null)
  expect(lab?.querySelector(".lab-x")).not.toBe(null)
  expect(s.find("İkonsuz")?.closest(".m-alert")?.querySelector(".m-alert-icon")).toBe(null)
})
