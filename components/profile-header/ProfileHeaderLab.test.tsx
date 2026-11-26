// Tests for ProfileHeaderLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ProfileHeaderLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Stats are found by the button text; the Lab passes custom `labels`, so the names are the Lab's own words.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ProfileHeaderLab } from "./ProfileHeaderLab.tsx"

// `stats={["followers", "posts"]}` shows only those two, in that order, under the custom names; the omitted one is
// absent. Pressing a stat calls onStat with its key, which the Lab logs.
test("istatistikler seçilen sırada ve kendi adlarıyla; basınca onStat çalışır", async () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  expect(s.sees("Takipçi")).toBe(true)
  expect(s.sees("Takip edilenler")).toBe(false)
  const stat = s.all(".lab-profile button").find((b) => (b.textContent ?? "").includes("Gönderi"))
  expect(stat).toBeTruthy()
  await s.click(stat!)
  expect(s.sees("liste: posts")).toBe(true)
})

// The message button (its text comes from labels.message) calls onMessage.
test("Mesaj at düğmesi onMessage'ı çalıştırır", async () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  await s.click("Mesaj at")
  expect(s.sees("mesaj")).toBe(true)
})

// With `self` on, the follow and message buttons are replaced by an Edit button, which calls onEdit.
test("kendi profilimde takip ve mesaj yerine Profili düzenle çıkar", async () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  await s.click("Kendi profilim")
  expect(s.find("Mesaj at")).toBe(null)
  await s.click("Profili düzenle")
  expect(s.sees("düzenle")).toBe(true)
})

// The second header turns things off (cover="none", stats={false}): no stats row and no cover art, while the first
// one shows its two chosen stats.
test("ikinci başlıkta kapak ve istatistik yok; ilkinde iki istatistik var", () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  const [lab, plain] = s.all(".m-prof")
  expect(lab?.querySelectorAll(".m-prof-stat").length).toBe(2)
  expect(plain?.textContent).toContain("Gizli Hesap")
  expect(plain?.querySelector(".m-prof-stats")).toBe(null)
  expect(plain?.querySelector(".m-prof-cover-art")).toBe(null)
})
