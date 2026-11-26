// Tests for RoutingLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <RoutingLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Router pages load lazily, so the tests call `s.flush(3)` after each navigation to let the new page appear.
// - Elements are found by the classes the Lab sets (.lab-path, .lab-city ...), and Links and Buttons by their texts.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { RoutingLab } from "./RoutingLab.tsx"

// Navigating to a city changes the address and the page, but the frame (layout) is mounted only once: the text typed
// into its note field is still there afterwards.
test("şehre gidince adres ve sayfa değişir, not yerinde kalır", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.type(".lab-note", "unutma")
  await s.click("Aç")
  await s.flush(3)
  expect(s.get(".lab-path")?.textContent).toContain("/sehir/")
  expect(s.get(".lab-city")).not.toBe(null)
  expect((s.get(".lab-note") as HTMLInputElement | null)?.value).toBe("unutma")
})

//  A Link with outlet="aside" opens the page in the named side outlet: the list stays, and the side panel is no longer
// empty.
test("yanda açınca liste kalır, yan panel dolar", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.click("Yanda")
  await s.flush(3)
  expect(s.get(".lab-aside-empty")).toBe(null)
  expect(s.sees("Z → A sırala")).toBe(true)
})

// The guard sends a visitor who is not an admin from the admin page back to the cities; after switching the admin
// toggle on, the same navigation shows the admin page.
test("guard: yönetici değilken yönetim şehirlere döner", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.click("Yönetim")
  await s.flush(3)
  expect(s.get(".lab-admin")).toBe(null)
  await s.click("Yönetici girişi (guard)")
  await s.click("Yönetim")
  await s.flush(3)
  expect(s.get(".lab-admin")).not.toBe(null)
})

// `redirects` maps an old address to a new page; an address that matches no route shows the `notFound` content.
test("eski adres yönlendirilir, bilinmeyen adres notFound gösterir", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.click("Eski adres")
  await s.flush(3)
  expect(s.get(".lab-about")).not.toBe(null)
  await s.click("Kayıp sayfa")
  await s.flush(3)
  expect(s.get(".lab-404")).not.toBe(null)
})
