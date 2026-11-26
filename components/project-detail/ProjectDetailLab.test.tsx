// Tests for ProjectDetailLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ProjectDetailLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The Lab sets its own `labels`, so the tests look for those texts (the fact names, the back button, the next card).
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ProjectDetailLab } from "./ProjectDetailLab.tsx"

// The title is the page's h1, the cover carries the shared-element name (data-m-shared) so a grid card can morph into
// it, and the custom labels appear: the fact name, the services group and the image button text.
test("başlık h1, kapağın paylaşılan adı ve kendi metinler", () => {
  const s = renderTest(() => <ProjectDetailLab />)
  expect(s.get(".lab-detail h1")?.textContent).toContain("Atlas Banka")
  expect(s.get(".m-pd-cover")?.getAttribute("data-m-shared")).toBe("lab-0")
  expect(s.find("Müşteri")).not.toBe(null)
  expect(s.get('[aria-label="Hizmetler"]')).not.toBe(null)
  expect(s.find("2. görseli büyüt")).not.toBe(null)
})

// `onBack` shows a back button and is called on press (the Lab counts the presses in the page).
test("geri düğmesi onBack'i çağırır", async () => {
  const s = renderTest(() => <ProjectDetailLab />)
  await s.click("Listeye dön")
  expect(s.find("Geri basıldı: 1")).not.toBe(null)
})

// The next-project card shows the next project's title; pressing it calls next.onOpen and the page shows that project.
test("sonraki proje kartı bir sonrakini açar", async () => {
  const s = renderTest(() => <ProjectDetailLab />)
  expect(s.get(".m-pd-next")?.textContent).toContain("Sıradaki iş")
  await s.click(s.get(".m-pd-next")!)
  expect(s.get(".lab-detail h1")?.textContent).toContain("Kite uygulaması")
})

// facts={false} removes the facts list, so the role line is gone.
test("künye kapanınca rol satırı gider", async () => {
  const s = renderTest(() => <ProjectDetailLab />)
  expect(s.find("Rol")).not.toBe(null)
  await s.click("Künye")
  expect(s.find("Rol")).toBe(null)
})
