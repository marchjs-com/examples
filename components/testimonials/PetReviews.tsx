// PetReviews: the creative-minimal Testimonials example.
//
// What it shows: pets review a new treat. Testimonials draws the reviews as a two-column grid of quote cards with gold
// stars, and every press of the button reveals one more review (after the last it starts again from one).
// When to use this pattern: a testimonial list that changes with state. Each item is plain data: { quote, name, role?,
// avatar?, rating? }; here the list is a slice of the data, and the component is rebuilt when the count changes.
//
// Animation: the cards enter with a Reveal (by default a rise with a stagger of 60 ms), which follows March's motion
// engine, so the global speed, "Stop all" and the visitor's reduced-motion preference apply. Pass `reveal={false}` for no
// entrance (the tests do) or `reveal={{ effect: "scale", stagger: 140 }}` to change it.
// Accessibility: each card is a <figure> with a <blockquote> and a <figcaption> (the name is a <cite>); the rating is read
// as "4 out of 5" (the text can be changed with `labels.rating`).
import { Testimonials } from "march/landing"
import { Button } from "march/ui"

// The reviews: quote, name, role (a short line under the name) and a star rating out of 5.
const PETS = [
  { quote: "Hav! Hav hav. Yani: harika.", name: "Karabaş", role: "Golden, 4 yaş", rating: 5 },
  { quote: "Kokladım, yedim, uyudum. Beş yıldız.", name: "Pamuk", role: "Tekir, 2 yaş", rating: 5 },
  { quote: "Havuçlu olanı daha iyiydi.", name: "Zıpzıp", role: "Tavşan, 1 yaş", rating: 3 },
  { quote: "Tırmalamadım; bu bir şey demek.", name: "Duman", role: "Van kedisi, 6 yaş", rating: 4 },
]

export function PetReviews() {
  // Reactive state: how many reviews are shown.
  let $count = 2
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Shows one more review; after the last one it goes back to a single review. The label follows the same condition. */}
    <Button on:click={() => $count = $count >= PETS.length ? 1 : $count + 1}>{$count >= PETS.length ? "Baştan" : "Bir yorum daha 🐾"}</Button>
    {/* The function child is drawn again when $count changes, because Testimonials gets the sliced list as a plain value.
        variant="grid": quote cards in equal rows. cols={2}: two columns. ratingColor: a colour token for the stars. */}
    {() => { const n = $count; return <Testimonials variant="grid" cols={2} ratingColor="brand-gold" items={PETS.slice(0, n)} /> }}
  </div>
}
