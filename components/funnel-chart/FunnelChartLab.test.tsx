import { test, expect, renderTest } from "march/testing"
import { FunnelChartLab } from "./FunnelChartLab.tsx"

// Tests for FunnelChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the stages and the custom label, selection, the empty state and the switched-off texts, so a change to
// FunnelChart that breaks any of them shows up here first.

// Proves the stages and `label`: four rows give four stages, and the text inside a stage comes from the custom label
// function (it contains "kişi"), not from the default value text.
test("dört aşama dört şekil; içlerinde kendi yazısı", () => {
  const s = renderTest(() => <FunnelChartLab />)
  const funnel = s.get(".lab-funnel")!
  expect(funnel.querySelectorAll(".m-funnel-stage").length).toBe(4)
  expect(funnel.querySelector(".m-funnel-value")!.textContent).toContain("kişi")
})

// Proves onSelect: a click on the first stage reports it by name. s.flush() waits for the reactive update before
// reading the text.
test("bir aşamaya tıklamak onu seçer", async () => {
  const s = renderTest(() => <FunnelChartLab />)
  s.get(".lab-funnel .m-funnel-stage")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Vitrin")
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken or blank chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <FunnelChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Ziyaretçi yok")).toBe(true)
})

// Proves the switches really switch off: with names={false} no name is drawn, and with showConversion={false} and
// dropoff={false} the text between stages is empty.
test("sade hunide ad ve dönüşüm yazısı yok", () => {
  const s = renderTest(() => <FunnelChartLab />)
  expect(s.get(".lab-plain .m-funnel-name")).toBe(null)
  expect(s.get(".lab-plain .m-funnel-between")!.textContent).toBe("")
})
