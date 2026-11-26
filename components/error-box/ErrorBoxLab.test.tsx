// Tests for ErrorBoxLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ErrorBoxLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text, a selector or an element) and waits for
//   the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { ErrorBoxLab } from "./ErrorBoxLab.tsx"

// `error` can be an Error (its message is shown), a plain text, and `message` is the text used when there is no
// `error`: all three appear as text.
test("Error nesnesinin message'ı, metin hatası ve message gösterilir", () => {
  const s = renderTest(() => <ErrorBoxLab />)
  expect(s.sees("Bağlantı reddedildi")).toBe(true)
  expect(s.sees("Dosya bulunamadı (404)")).toBe(true)
  expect(s.sees("Yalnız message: error verilmedi.")).toBe(true)
})

// `retry` adds a button with `retryLabel`; pressing it runs the handler, and an `error` getter shows the new value.
test("retry düğmesi çağırır; erişimci hatası güncellenir", async () => {
  const s = renderTest(() => <ErrorBoxLab />)
  await s.click("Kodu artır")
  expect(s.sees("Yeniden deneme: 1")).toBe(true)
  expect(s.sees("Sunucu hatası (501)")).toBe(true)
})

// The box has role="alert" (the error is announced), `class` is on the root, and a node given as retryLabel is drawn in the button.
test("hata kutusu role=alert ve class köke eklenir", () => {
  const s = renderTest(() => <ErrorBoxLab />)
  const box = s.get(".lab-error")
  expect(box?.getAttribute("role")).toBe("alert")
  expect(box?.querySelector(".m-errorbox-retry")?.textContent).toContain("Yenile")
})

// Without `retry` there is no button.
test("retry verilmezse düğme yok", () => {
  const s = renderTest(() => <ErrorBoxLab />)
  const text = s.find("Dosya bulunamadı (404)")?.closest(".m-errorbox")
  expect(text?.querySelector("button")).toBe(null)
})
