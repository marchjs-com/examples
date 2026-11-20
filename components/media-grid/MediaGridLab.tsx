import { MediaGrid } from "march/ui"

// MediaGrid'in özellikleri: items (src, alt, kind, poster, width, height), max, shape, gap, onOpen, onDoubleTap, label,
// tileLabel, skeleton, videoMark, more, class
const items = [
  { src: "/media/social/sunset.svg", alt: "Gün batımı", width: 1200, height: 1500 },
  { src: "/media/social/sea.svg", alt: "Deniz", kind: "video" as const, poster: "/media/social/sea.svg" },
  { src: "/media/social/forest.svg", alt: "Orman" },
  { src: "/media/social/city.svg", alt: "Şehir" },
  { src: "/media/social/coffee.svg", alt: "Kahve" },
]

export function MediaGridLab() {
  let $log = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    <MediaGrid class="lab-grid" items={items} max={3} shape="square" gap="thin" label="Gezi" skeleton={false}
      tileLabel={(i: number, n: number) => `Fotoğraf ${i + 1} / ${n}`} videoMark more={(rest: number) => `+${rest} daha`}
      onOpen={(i: number) => $log = `açıldı ${i}`} onDoubleTap={(i: number) => $log = `beğenildi ${i}`} />
    <span class="lab-log">{$log}</span>
  </div>
}
