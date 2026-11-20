import { test, expect, renderTest } from "march/testing"
import { TimelineLab } from "./TimelineLab.tsx"

// TimelineLab'in testleri: kaydedince Testler sekmesinde çalışır
test("her öge bir li; metin zaman olduğu gibi yazılır", () => {
  const s = renderTest(() => <TimelineLab />)
  const tl = s.get(".lab-tl")!
  expect(tl.tagName).toBe("OL")
  expect(tl.querySelectorAll("li").length).toBe(3)
  expect(tl.querySelectorAll("time")[1].textContent).toBe("dün")
})

test("öge class'ı li'ye, ISO zaman datetime'a yazılır", () => {
  const s = renderTest(() => <TimelineLab />)
  const last = s.get(".lab-tl .lab-last")!
  expect(last.querySelector("time")!.getAttribute("datetime")).toBe("2026-11-18T08:30:00.000Z")
})

test("formatTime kendi metnini, dot işlevi sıra numarasını yazar; dot={false} noktasız", () => {
  const s = renderTest(() => <TimelineLab />)
  expect(s.sees("biçimli zaman")).toBe(true)
  const lists = s.all(".m-timeline")
  expect(lists[1].querySelector(".m-tl-dot.is-own")!.textContent).toBe("1")
  expect(lists[2].querySelector(".m-tl-dot")).toBe(null)
})

test("anahtar çizgiyi kaldırır", async () => {
  const s = renderTest(() => <TimelineLab />)
  expect(s.get(".lab-tl .m-tl-line")).not.toBe(null)
  await s.click("Bağlantı çizgisi")
  expect(s.get(".lab-tl")!.classList.contains("m-timeline-no-line")).toBe(true)
})
