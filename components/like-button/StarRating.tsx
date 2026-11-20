import { LikeButton, Card } from "march/ui"
import { star } from "march/icons"

// favori yıldızı: kalp yerine yıldız, altın renk, tek renkli parçacıklar
export function StarRating() {
  let $on = false
  let $n = 41
  return <Card m:theme="night">
    <LikeButton liked={$on} count={$n} onToggle={(v: boolean) => { $on = v; $n += v ? 1 : -1 }}
      icon={star} m:color="brand-gold" colors="single" size="lg" label="Favorilere ekle" />
  </Card>
}
