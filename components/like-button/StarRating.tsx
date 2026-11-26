// StarRating: the creative-minimal LikeButton example.
//
// What it shows: the heart replaced by a golden star, a "favourite" button on a dark card. With three props (icon,
// colour, particle colours) the same component becomes a favourite toggle.
// When to use this pattern: favourites, bookmarks, "save for later": any on / off toggle that should feel rewarding.
//
// Animation: the pop and the burst of particles run on the motion engine, so the global speed, "Stop all" and reduced
// motion apply (reduced motion keeps only the fill change). Pass `pop={false}` or `burst={false}` to turn them off.
// Accessibility: a real button with aria-pressed; `label` is its accessible name, since there is no visible text.
import { LikeButton, Card } from "march/ui"
import { star } from "march/icons"

export function StarRating() {
  // The liked state and the count are ours: LikeButton reports the wish in onToggle and we update both.
  let $on = false
  let $n = 41
  // m:theme="night" (a common prop that works on every element) draws the card and its content in the dark theme.
  return <Card m:theme="night">
    {/* icon={star}: a March icon, which fills with the colour while liked. m:color="brand-gold": the colour token of
        the button (the default is brand-pink). colors="single": the particles use that one colour instead of the four
        brand colours. size="lg": a larger button. */}
    <LikeButton liked={$on} count={$n} onToggle={(v: boolean) => { $on = v; $n += v ? 1 : -1 }}
      icon={star} m:color="brand-gold" colors="single" size="lg" label="Favorilere ekle" />
  </Card>
}
