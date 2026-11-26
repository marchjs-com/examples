// MediaGridLab: the full-featured MediaGrid example; it uses every prop at least once.
//
// Props shown here: items (src, alt, kind, poster, width, height), max, shape, gap, onOpen, onDoubleTap, label,
// tileLabel, skeleton, videoMark, more and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// MediaGridLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility: the grid is a group named by `label`; every tile is a button named by tileLabel; opening with the
// keyboard (Enter or Space) is immediate. The video mark and the "+N" tile are decorative.
import { MediaGrid } from "march/ui"

// The photos. A photo can carry its own size (width and height, so the space is reserved before it loads), and a video
// item has kind: "video" plus a poster, the picture shown on its tile. `as const` keeps "video" as a literal type.
const items = [
  { src: "/media/social/sunset.svg", alt: "Gün batımı", width: 1200, height: 1500 },
  { src: "/media/social/sea.svg", alt: "Deniz", kind: "video" as const, poster: "/media/social/sea.svg" },
  { src: "/media/social/forest.svg", alt: "Orman" },
  { src: "/media/social/city.svg", alt: "Şehir" },
  { src: "/media/social/coffee.svg", alt: "Kahve" },
]

export function MediaGridLab() {
  // The last thing that happened, written by the two callbacks so you can see them fire.
  let $log = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The props, one by one:
        - items: the photos above. max={3}: show three tiles, and the rest is counted on the last tile.
        - shape="square": every tile is square (the default "auto" keeps a single photo's own shape). gap="thin": the
          space between tiles ("none", "thin" or "gap").
        - label: the accessible name of the whole grid. tileLabel(index, total): the accessible name of each tile.
        - skeleton={false}: no shimmering placeholder while an image loads. videoMark: the mark on a video tile.
        - more(rest): your own content for the "+N" on the last tile (here "+N daha").
        - onOpen(index): a tap, Enter or Space on a tile. onDoubleTap(index): a double tap with a pointer (a like); when
          it is set, a single tap waits a moment so a double tap never also opens the photo.
        - class: for tests and your CSS. */}
    <MediaGrid class="lab-grid" items={items} max={3} shape="square" gap="thin" label="Gezi" skeleton={false}
      tileLabel={(i: number, n: number) => `Fotoğraf ${i + 1} / ${n}`} videoMark more={(rest: number) => `+${rest} daha`}
      onOpen={(i: number) => $log = `açıldı ${i}`} onDoubleTap={(i: number) => $log = `beğenildi ${i}`} />
    <span class="lab-log">{$log}</span>
  </div>
}
