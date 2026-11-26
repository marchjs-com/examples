// TestimonialsLab: the full-featured Testimonials example.
//
// What it shows: every Testimonials option: the items (quote, name, role, avatar, rating), the layout (variant), the columns
// (cols), the stars (rating) and their colour (ratingColor), the avatar, the quotation marks (quotes), the "show more" button
// (more), the drifting speed (speed), the entrance (reveal), your own texts (labels) and class. A Segmented control picks the
// layout and the number of columns, and four toggles switch parts on and off, so every option can be tried live.
// Use it as a catalogue: copy the prop you need.
//
// Animation: the cards enter with a Reveal and the "marquee" layout drifts, both on March's motion engine, so the global speed,
// "Stop all" and the visitor's reduced-motion preference apply. Here `reveal={false}` removes the entrance (so tests and
// screenshots are stable) and `speed={[30, 18]}` sets the px/s of the two marquee rows.
// Accessibility: each card is a <figure> with a <blockquote> and a <figcaption>; the rating is read through `labels.rating`;
// the wall's button has aria-expanded; the slider is a carousel named by `labels.slider`; copies in the marquee are hidden.
import { Testimonials } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"

// The layouts, and the data: seven reviews. The first has an avatar image, some have no role, the rating varies.
const VARIANTS = ["grid", "wall", "slider", "marquee"] as const
const ITEMS = [
  { quote: "İlk etkinliğimde beş arkadaş edindim.", name: "Deniz Arı", role: "İzmir", rating: 5, avatar: "/media/hadi-waves.jpg" },
  { quote: "Koşu grubumuz her hafta büyüyor.", name: "Mert Kaya", role: "İstanbul", rating: 4 },
  { quote: "Biletleri tek yerden sattım.", name: "Leyla Demir", role: "Ankara", rating: 5 },
  { quote: "Tek uygulama, her şey içinde.", name: "Can Yıldız", rating: 3 },
  { quote: "Hafta sonu planı derdi bitti.", name: "Ece Tan", role: "Bursa", rating: 5 },
  { quote: "Görüntülü tanıştık, kimse yabancı değildi.", name: "Arda Su", role: "Antalya", rating: 5 },
  { quote: "Filtrelerle tam aradığımı buldum.", name: "Selin Ak", role: "İstanbul", rating: 4 },
]

export function TestimonialsLab() {
  // Reactive state: the layout, the number of columns (1, 2 or 3) and the on/off switches.
  let $variant: (typeof VARIANTS)[number] = "grid"
  let $cols: 1 | 2 | 3 = 2
  let $rating = true
  let $avatar = true
  let $quotes = true
  let $more = true
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls. Segmented is a group of toggle buttons (options = value / label pairs, bind:value keeps the state in
        sync); Toggle is a labelled switch. aria-label names each Segmented group for screen readers. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Düzen" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Segmented aria-label="Sütun" options={[1, 2, 3].map((n) => ({ value: n, label: `${n} sütun` }))} bind:value={$cols} />
        <Toggle label="Yıldızlar" bind:value={$rating} />
        <Toggle label="Avatarlar" bind:value={$avatar} />
        <Toggle label="Tırnaklar" bind:value={$quotes} />
        <Toggle label="Daha fazla düğmesi" bind:value={$more} />
      </div>
    </Card>
    {/* The function child is drawn again whenever a state read at its top changes, because Testimonials gets these options
        as plain values. variant: grid / wall / slider / marquee. cols: 1, 2 or 3 (grid and slider). rating: the stars;
        ratingColor: a colour token for them. avatar: the picture next to the name. quotes: the quotation marks. more: the
        wall's "show more" button (false shows the whole wall). speed: the px/s of the two marquee rows. reveal={false}: no
        entrance. labels: our own texts: more, less, the slider's name, and a function for the rating's spoken text. class is
        kept on the root (the tests find it). */}
    {() => {
      // The state is read here, at the top, so a change redraws the whole list.
      const variant = $variant, cols = $cols, rating = $rating, avatar = $avatar, quotes = $quotes, more = $more
      return <Testimonials class="lab-tm" variant={variant} cols={cols} items={ITEMS}
      rating={rating} ratingColor="brand-gold" avatar={avatar} quotes={quotes} more={more}
      speed={[30, 18]} reveal={false}
      labels={{ more: "Hepsini göster", less: "Daralt", slider: "Yorumlar", rating: (n: number) => `5 üzerinden ${n}` }} />
    }}
  </div>
}
