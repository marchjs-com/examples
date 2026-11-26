// Tests for TimelineLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TimelineLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first matching element, s.all(selector) all of them, s.sees(text) asks if a text is
//   visible, and s.click(text) clicks like a user and waits until the view has updated (so that test is async).
// - The tests check the markup a reader or a screen reader gets (the list tag, <time> elements, classes) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. The class names of the parts (.m-tl-dot,
// .m-tl-line) are listed in the Timeline docs.
import { test, expect, renderTest } from "march/testing"
import { TimelineLab } from "./TimelineLab.tsx"

// The list is an <ol> with one <li> per item (so the order is announced), and a text time is written into <time> as
// it is.
test("her öge bir li; metin zaman olduğu gibi yazılır", () => {
  const s = renderTest(() => <TimelineLab />)
  const tl = s.get(".lab-tl")!
  expect(tl.tagName).toBe("OL")
  expect(tl.querySelectorAll("li").length).toBe(3)
  expect(tl.querySelectorAll("time")[1].textContent).toBe("dün")
})

// An item's `class` lands on its <li>, and an ISO time becomes the machine-readable datetime attribute of <time>.
test("öge class'ı li'ye, ISO zaman datetime'a yazılır", () => {
  const s = renderTest(() => <TimelineLab />)
  const last = s.get(".lab-tl .lab-last")!
  expect(last.querySelector("time")!.getAttribute("datetime")).toBe("2026-11-18T08:30:00.000Z")
})

// The second list uses your own formatTime and a dot function (which draws the item number); the third list has
// dot={false}, so no dot is drawn at all.
test("formatTime kendi metnini, dot işlevi sıra numarasını yazar; dot={false} noktasız", () => {
  const s = renderTest(() => <TimelineLab />)
  expect(s.sees("biçimli zaman")).toBe(true)
  const lists = s.all(".m-timeline")
  expect(lists[1].querySelector(".m-tl-dot.is-own")!.textContent).toBe("1")
  expect(lists[2].querySelector(".m-tl-dot")).toBe(null)
})

// line={false}: the Toggle turns the connecting line off. The line exists first, then after the click the list carries
// the m-timeline-no-line class. It awaits the click because the view updates after it.
test("anahtar çizgiyi kaldırır", async () => {
  const s = renderTest(() => <TimelineLab />)
  expect(s.get(".lab-tl .m-tl-line")).not.toBe(null)
  await s.click("Bağlantı çizgisi")
  expect(s.get(".lab-tl")!.classList.contains("m-timeline-no-line")).toBe(true)
})
