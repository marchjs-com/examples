// Tests for FileUploadLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FileUploadLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.container is the root element; s.text() is all visible text; s.flush() waits until the view has updated;
//   s.wait(fn, { timeout }) polls until fn is true; s.click(el) clicks like a user; s.dispose() unmounts.
// - Files cannot be chosen in a test, so `drop` fires a real drop event on the zone with a fake dataTransfer. That goes
//   through the same code as a user dropping files.
// - The tests check what a user or a screen reader can observe (texts, ARIA attributes, which elements exist).
import { test, expect, renderTest } from "march/testing"
import { FileUploadLab } from "./FileUploadLab.tsx"

// Helpers: `file` builds a File of a given size (SVG files get real SVG content so a thumbnail can be drawn) and
// `drop` fires the drop event on a zone the way a browser does (bubbling, cancelable, with a fake dataTransfer).
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect width="8" height="8"/></svg>`
const file = (name: string, type: string, size = 1) => new File([name.endsWith(".svg") ? SVG : "x".repeat(size)], name, { type })
const drop = (zone: Element, files: File[]) => {
  const e = new Event("drop", { bubbles: true, cancelable: true })
  Object.defineProperty(e, "dataTransfer", { value: { files, types: ["Files"] } })
  zone.dispatchEvent(e)
}

// Single image: an accepted SVG is listed with a thumbnail, a file of the wrong type or too large is rejected and onError gets the message.
test("tek görsel: önizlemeyle listelenir, tür ve boyut dışı dosya reddedilir (onError)", async () => {
  const s = renderTest(() => <FileUploadLab />)
  const one = s.container.querySelector(".lab-one")!
  const zone = one.querySelector(".m-drop")!
  expect(zone.getAttribute("aria-label")).toBe("Kapak görseli seç")
  expect(one.querySelector(".m-drop-hint")?.textContent).toBe("PNG, JPG ya da SVG · en çok 50 KB")
  drop(zone, [file("kapak.svg", "image/svg+xml")])
  await s.flush()
  expect(s.text()).toContain("Kapak: kapak.svg")
  expect(one.querySelector("img.m-file-thumb")).not.toBe(null)
  drop(zone, [file("notlar.txt", "text/plain")])
  await s.flush()
  expect(s.text()).toContain("Hata: notlar.txt: yalnız görsel")
  drop(zone, [file("dev.png", "image/png", 60_000)])
  await s.flush()
  expect(s.text()).toContain("dev.png çok büyük")
  s.dispose()
})

// Several files: maxFiles keeps only two, progress shows while uploading with a Cancel button, then both rows show the done badge; removing one updates the list.
test("birden çok: en çok 2 dosya, yükleme ilerlemesi, bitince Yüklendi ve kaldırma", async () => {
  const s = renderTest(() => <FileUploadLab />)
  const many = s.container.querySelector(".lab-many")!
  expect(many.querySelector(".m-drop-hint")?.textContent).toContain("en çok")
  drop(many.querySelector(".m-drop")!, [file("a.pdf", "application/pdf", 100), file("b.pdf", "application/pdf", 100), file("c.pdf", "application/pdf", 100)])
  await s.flush()
  expect(many.textContent).toContain("En çok 2 dosya")
  expect(many.textContent).toContain("a.pdf yükleniyor")
  expect(many.querySelector('[aria-label="a.pdf yüklemesini durdur"]')).not.toBe(null)
  await s.wait(() => s.text().includes("Yüklenen: 2"), { timeout: 3000 })
  expect(many.querySelectorAll(".m-file-ok").length).toBe(2)
  expect(many.querySelector("img.m-file-thumb")).toBe(null)
  await s.click(many.querySelector('[aria-label="a.pdf dosyasını kaldır"]')!)
  expect(s.text()).toContain("Yüklenen: 1")
  s.dispose()
})

// ARIA of a required, invalid zone: role=button, aria-invalid, aria-describedby pointing to our text, no hint line, and the focus event reaches onFocus.
test("zorunlu ve geçersiz alanın ARIA'sı; id, odak olayları", async () => {
  const s = renderTest(() => <FileUploadLab />)
  const doc = s.container.querySelector("#lab-doc")!
  expect(doc.getAttribute("role")).toBe("button")
  expect(doc.getAttribute("aria-invalid")).toBe("true")
  expect(doc.getAttribute("aria-describedby")).toBe("lab-doc-hint")
  expect(doc.querySelector(".m-drop-hint")).toBe(null)
  doc.dispatchEvent(new FocusEvent("focus"))
  await s.flush()
  expect(s.text()).toContain("Odak: belge")
  s.dispose()
})

// disabled turns off dropping (aria-disabled, no tab stop, a dropped file is ignored); readonly lists existing files with no remove buttons.
test("disabled bırakmayı kapatır; readonly var olan dosyaları kaldırma düğmesi olmadan gösterir", async () => {
  const s = renderTest(() => <FileUploadLab />)
  const off = s.container.querySelector(".lab-disabled .m-drop")!
  expect(off.getAttribute("aria-disabled")).toBe("true")
  expect(off.getAttribute("tabindex")).toBe("-1")
  drop(off, [file("x.svg", "image/svg+xml")])
  await s.flush()
  expect(s.container.querySelector(".lab-disabled .m-file")).toBe(null)
  const ro = s.container.querySelector(".lab-readonly")!
  expect(ro.textContent).toContain("sozlesme.pdf")
  expect(ro.textContent).toContain("fatura-kasim.pdf")
  expect(ro.querySelector(".m-file-remove")).toBe(null)
  s.dispose()
})
