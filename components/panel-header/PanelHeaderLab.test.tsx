// Tests for PanelHeaderLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PanelHeaderLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element by CSS selector (the Lab gives some parts an id or a class), and s.click(name)
//   clicks the button with that accessible name like a user and waits until the view has updated, which is why the test
//   that clicks is async and awaits it.
// - The tests check what a user or a screen reader can observe (the heading element, the button names, the text the Lab
//   writes) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PanelHeaderLab } from "./PanelHeaderLab.tsx"

// titleAs makes the title a real heading of the chosen level (h2 here), and titleId sets its id, which a panel can use in
// aria-labelledby to take its name from the title.
test("titleAs ve titleId başlık öğesini belirler", () => {
  const s = renderTest(() => <PanelHeaderLab />)
  const t = s.get("#lab-title")
  expect(t?.tagName).toBe("H2")
  expect(t?.textContent).toBe("Ayarlar")
})

// Two close buttons, found by their closeLabel names: the default-icon one and the one with our own icon ("minus").
// Both call onClose, so the Lab's counter reaches 2.
test("kapat düğmesi closeLabel adıyla onClose'u çağırır", async () => {
  const s = renderTest(() => <PanelHeaderLab />)
  await s.click("Paneli kapat")
  await s.click("Küçült")
  expect(s.get(".lab-closed")?.textContent).toBe("2 kez kapatıldı")
})

// as="footer" makes the bar a <footer> element instead of a <header>.
test("as=footer bir footer çizer", () => {
  const s = renderTest(() => <PanelHeaderLab />)
  expect(s.get(".lab-foot")?.tagName).toBe("FOOTER")
})

// partClass adds our own classes to inner parts (the titles wrapper and the title), found here through the root's class.
test("partClass parçalara kendi sınıfını ekler", () => {
  const s = renderTest(() => <PanelHeaderLab />)
  expect(s.get(".lab-own .lab-own-title")?.textContent).toBe("Kendi kapat ikonum")
  expect(s.get(".lab-own .lab-own-titles")).not.toBe(null)
})
