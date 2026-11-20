import { test, expect, renderTest } from "march/testing"
import { FollowButtonLab } from "./FollowButtonLab.tsx"

// FollowButtonLab'in testleri: kaydedince Testler sekmesinde çalışır
test("basınca following olur, ariaLabel adı yazar", async () => {
  const s = renderTest(() => <FollowButtonLab />)
  expect(s.get(".lab-follow")?.getAttribute("aria-label")).toBe("Elif: follow")
  await s.click(s.get(".lab-follow")!)
  expect(s.get(".lab-state")?.textContent).toBe("following")
})

test("labels kendi metnini yazar", () => {
  const s = renderTest(() => <FollowButtonLab />)
  expect(s.get(".lab-private")?.textContent).toContain("İstek gönder")
})
