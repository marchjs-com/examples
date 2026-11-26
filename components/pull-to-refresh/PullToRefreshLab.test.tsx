// Tests for PullToRefreshLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PullToRefreshLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - A touch pull is not simulated here: the keyboard "refresh" button (refreshButton) starts the same refresh, and
//   s.wait waits for the async onRefresh to settle.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { PullToRefreshLab } from "./PullToRefreshLab.tsx"

// The keyboard button, with the text from `labels.refresh`, runs onRefresh; after it settles the Lab's counter shows 1.
test("klavye düğmesi kendi metniyle yenilemeyi çalıştırır", async () => {
  const s = renderTest(() => <PullToRefreshLab />)
  await s.click("Şimdi yenile")
  await s.wait(() => s.sees("yenileme: 1"), { timeout: 2000 })
  expect(s.sees("yenileme: 1")).toBe(true)
})

// While refreshing, the area is aria-busy, which assistive technology uses to say that content is loading.
test("yenilenirken kap aria-busy olur", async () => {
  const s = renderTest(() => <PullToRefreshLab />)
  await s.click("Şimdi yenile")
  expect(s.get(".lab-ptr")?.getAttribute("aria-busy")).toBe("true")
})

// With disabled on, the keyboard button is disabled too, so nothing can start a refresh.
test("kapalıyken klavye düğmesi devre dışı", async () => {
  const s = renderTest(() => <PullToRefreshLab />)
  await s.click("Yenilemeyi kapat")
  await s.flush()
  expect((s.find("Şimdi yenile")?.closest("button") as HTMLButtonElement | null)?.disabled).toBe(true)
})

// The children are drawn inside the scroll area (the last of the twelve items is on the page).
test("içerik kaydırma alanında çizilir", () => {
  const s = renderTest(() => <PullToRefreshLab />)
  expect(s.sees("Öğe 12")).toBe(true)
})
