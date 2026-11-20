import { ClampText, Card } from "march/ui"

// sürprizi bozmayan film yorumu: tek satıra katlı; düğme ölçmeden hep görünür ("always"), metinleri senin
export function SpoilerReview() {
  return <Card title="🎬 Gece Yarısı Treni · ★★★★☆">
    <ClampText lines={1} expandable="always" labels={{ more: "🙈 Sürprizi göster", less: "🙉 Yeniden gizle" }} m:color="brand-purple">
      Başta sıradan bir yolculuk gibi görünüyor ama son durakta anlıyoruz ki kondüktör baştan beri yolcuların
      kendisiymiş: her vagon, kahramanın unuttuğu bir yılı taşıyor ve tren aslında hiç hareket etmemiş.
    </ClampText>
  </Card>
}
