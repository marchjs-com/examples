import { test, expect, renderTest } from "march/testing"
import { JsonViewLab } from "./JsonViewLab.tsx"

// JsonViewLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kök liste label adıyla adlandırılır", () => {
  const s = renderTest(() => <JsonViewLab />)
  // iç içe listeler ve aria-expanded taşıyan aç / kapa düğmeleri: kök listenin adı label
  const root = s.get(".lab-json .m-json-root")!
  expect(root.getAttribute("aria-label")).toBe("Paket")
})

test("describe işlevi adlandırır, döngü kendi metniyle yazılır", () => {
  const s = renderTest(() => <JsonViewLab />)
  const text = s.get(".lab-json")!.textContent!
  expect(text).toContain("ƒ işlev")
  expect(text).toContain("(kendisi)")
  expect(text).toContain("\"tsx\"")
})

test("open={0} kapalı başlar, tıklayınca açılır", async () => {
  const s = renderTest(() => <JsonViewLab />)
  const trees = s.all(".m-json")
  const btn = trees[1].querySelector(".m-json-toggle")!
  expect(btn.getAttribute("aria-expanded")).toBe("false")
  await s.click(btn)
  expect(btn.getAttribute("aria-expanded")).toBe("true")
})

test("kapalı dal labels.keys ile sayılır", () => {
  const s = renderTest(() => <JsonViewLab />)
  expect(s.get(".lab-json")!.textContent).toContain("1 alan")
})
