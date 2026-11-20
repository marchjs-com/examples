import { Swatch } from "march/ui"

// tişört boyacısı: küçük daireden bir renk seç, büyük örnek o renge boyanır ve üstündeki yazı aynı kalır
const colors: [string, string][] = [["#f2801f", "Turuncu"], ["#1d9ad6", "Gök mavisi"], ["#78be3a", "Çimen"], ["#a3338c", "Mürdüm"], ["#111827", "Gece"]]

export function TShirtPainter() {
  let $color = "#f2801f"
  return <div sx={{ flex: ["row", "center"], gap: 4 }}>
    <Swatch color={$color} size="lg" shape="square" checker={false} label="Tişört önizlemesi">HADİ</Swatch>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {colors.map(([c, name]) => <Swatch color={c} label={name} shape="circle" mark
        selected={$color === c} onClick={() => $color = c} />)}
    </div>
  </div>
}
