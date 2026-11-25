import { test, expect, renderTest } from "march/testing"
import { LevelMeterLab } from "./LevelMeterLab.tsx"

// LevelMeterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("her kanal bir ölçer: adı ve değeri ekran okuyucuya gider, harfler görünür", () => {
  const s = renderTest(() => <LevelMeterLab />)
  const meters = s.all(".lab-stereo .m-lm-meter")
  expect(meters.length).toBe(2)
  expect(meters[0]!.getAttribute("role")).toBe("meter")
  expect(meters[0]!.getAttribute("aria-label")).toBe("Kanal, A kanalı")
  expect(meters[1]!.getAttribute("aria-valuenow")).toBe("60")
  expect(s.get(".lab-stereo")!.textContent).toContain("A")
  expect(s.all(".lab-stereo .m-lm-seg").length).toBe(40)
})

test("Yükselt kırpılma ışığını yakar; basınca söner ve sayılır", async () => {
  const s = renderTest(() => <LevelMeterLab />)
  await s.click(".lab-up")
  await s.click(".lab-up")
  const clip = s.get(".lab-stereo .m-lm-clip")!
  expect(clip.getAttribute("class")).toContain("is-on")
  expect(Number(s.get(".lab-clips")!.textContent)).toBeGreaterThan(0)
  await s.click(".lab-stereo .m-lm-clip")
  expect(s.get(".lab-stereo .m-lm-clip")!.getAttribute("class")).not.toContain("is-on")
  expect(s.get(".lab-resets")!.textContent).toBe("1")
})

test("dB ölçeği işaretleri, yatay ölçer ve kendi okunan metni", () => {
  const s = renderTest(() => <LevelMeterLab />)
  const marks = s.all(".lab-db .m-lm-tick").map((t) => t.textContent)
  expect(marks).toContain("-60")
  expect(marks).toContain("0")
  expect(s.get(".lab-cpu")!.getAttribute("class")).toContain("m-lm-h")
  expect(s.get(".lab-cpu .m-lm-meter")!.getAttribute("aria-valuetext")).toBe("yüzde 40")
  expect(s.get(".lab-cpu .m-lm-clip")).toBeFalsy()
})
