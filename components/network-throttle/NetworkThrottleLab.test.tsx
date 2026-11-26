// Tests for NetworkThrottleLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <NetworkThrottleLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.sees(text) says whether the text is visible, s.get(selector) finds an element by CSS selector, and s.click(name)
//   clicks like a user and waits until the view has updated, which is why the test that clicks is async.
// - The tests check what a user or a screen reader can observe (visible names, attributes, the text the Lab writes)
//   rather than internal state, so they keep passing when the component's internals change. They do not make real
//   network requests; choosing a network only changes the panel's value.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { NetworkThrottleLab } from "./NetworkThrottleLab.tsx"

// `presets` replaces the built-in networks with the Lab's own, and `label` becomes the panel's accessible name
// (aria-label on the root, found through the class we gave it).
test("kendi ağları listelenir; panel adını label'dan alır", () => {
  const s = renderTest(() => <NetworkThrottleLab />)
  expect(s.sees("Kafe Wi-Fi")).toBe(true)
  expect(s.sees("Metroda")).toBe(true)
  expect(s.get(".lab-net")?.getAttribute("aria-label")).toBe("Önizlemenin ağı")
})

// Choosing a network calls onChange with its profile: the Lab prints that profile as JSON, so the test reads the
// printed text. The no-limit preset is an empty profile, so the output is an empty object.
test("bir ağ seçilince onChange onu bildirir", async () => {
  const s = renderTest(() => <NetworkThrottleLab />)
  await s.click("Metroda")
  expect(s.get(".lab-last")?.textContent).toContain("\"latency\":900")
  await s.click("Kısıtsız")
  expect(s.get(".lab-last")?.textContent).toContain("{}")
})

// gauge and requests are on in the Lab, so both parts are in the DOM (their part classes come from the docs).
test("hız göstergesi ve istek şelalesi görünür", () => {
  const s = renderTest(() => <NetworkThrottleLab />)
  expect(s.get(".lab-net .m-nt-gauge")).toBeTruthy()
  expect(s.get(".lab-net .m-nt-log")).toBeTruthy()
})
