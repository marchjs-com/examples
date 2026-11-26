// SpoilerReview: the creative-minimal ClampText example.
//
// What it shows: a film review that hides its spoiler. The text is folded to one line and the switch has your own
// playful texts instead of "more" / "less".
// When to use this pattern: content that should stay hidden until the reader asks. expandable="always" shows the
// switch without measuring (a spoiler must stay hideable even if the text happens to fit), and labels replaces both
// switch texts (a text or a node, emoji included).
// Accessibility: the switch is a real button with aria-expanded; note that the folded text is only clipped, not
// removed, so screen readers still read it: do not use this for secrets.
import { ClampText, Card } from "march/ui"

export function SpoilerReview() {
  return <Card title="🎬 Gece Yarısı Treni · ★★★★☆">
    {/* m:color (a common prop) sets the colour token of the switch. The children are the text to fold. */}
    <ClampText lines={1} expandable="always" labels={{ more: "🙈 Sürprizi göster", less: "🙉 Yeniden gizle" }} m:color="brand-purple">
      Başta sıradan bir yolculuk gibi görünüyor ama son durakta anlıyoruz ki kondüktör baştan beri yolcuların
      kendisiymiş: her vagon, kahramanın unuttuğu bir yılı taşıyor ve tren aslında hiç hareket etmemiş.
    </ClampText>
  </Card>
}
