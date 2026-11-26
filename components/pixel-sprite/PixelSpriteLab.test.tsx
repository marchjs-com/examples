// Tests for PixelSpriteLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PixelSpriteLab />) mounts the Lab; s.get(selector) finds a sprite by its class.
// - The pixels are on a canvas, so the tests check the screen's name and size, and how many tiles the set has.
import { test, expect, renderTest } from "march/testing"
import { PixelSpriteLab } from "./PixelSpriteLab.tsx"

// A sprite is an image named by its label (or by its name: "thumbs-up" reads "thumbs up"), 8 × 8 LEDs.
test("çizim, adı olan 8 × 8 bir resim", () => {
  const s = renderTest(() => <PixelSpriteLab />)
  const el = s.get(".lab-main") as HTMLElement
  expect(el.getAttribute("role")).toBe("img")
  expect(el.getAttribute("aria-label")).toBe("Roket")
  expect(el.style.getPropertyValue("--m-led-cols")).toBe("8")
})

// cols / rows make a bigger screen than the 3 × 3 sprite read from .led.json.
test("kendi çizimin daha büyük ekranda", () => {
  const s = renderTest(() => <PixelSpriteLab />)
  expect((s.get(".lab-own") as HTMLElement).style.getPropertyValue("--m-led-cols")).toBe("7")
})

// Every built-in sprite has a tile, each named by the sprite's name.
test("hazır çizimlerin hepsi", () => {
  const s = renderTest(() => <PixelSpriteLab />)
  const tiles = s.get(".lab-all")!.querySelectorAll(".m-led")
  expect(tiles.length).toBeGreaterThan(25)
  expect(tiles[0]!.getAttribute("aria-label")).toBe("heart")
})
