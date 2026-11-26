// RestaurantWall: the real-life Testimonials example.
//
// What it shows: the review wall of a restaurant. variant="wall" is a masonry wall that fades out at the bottom with a
// "show more" button; the button's texts are our own, and the stars are orange. Some reviewers have a role (a
// neighbourhood, a nickname), some only a name.
// When to use this pattern: a long list of short quotes where the first few should be enough at a glance. The other layouts
// are "grid" (cards in equal rows), "marquee" (two endless rows drifting at different speeds) and "slider" (a Carousel).
//
// Animation: the cards enter with a Reveal (by default a rise with a stagger), which follows March's motion engine, so the
// global speed, "Stop all" and the visitor's reduced-motion preference apply. `reveal={false}` removes the entrance.
// Accessibility: each card is a <figure> with a <blockquote> and a <figcaption>; the rating is read as "4 out of 5" (the
// text can be changed with `labels.rating`). The wall's button has aria-expanded, so its open or closed state is announced.
import { Testimonials } from "march/landing"

export function RestaurantWall() {
  // ratingColor: a colour token for the stars. labels: our own texts for the "show more" button and its "fold" state (the
  // component's other texts keep their built-in values). items: each is { quote, name, role?, rating? } (avatar is optional
  // too and not used here).
  return <Testimonials variant="wall" ratingColor="brand-orange" labels={{ more: "Hepsini göster", less: "Daralt" }} items={[
    { quote: "Hünkâr beğendi annemin yaptığından iyi; bunu ona söylemeyin.", name: "Selim Öz", role: "Beşiktaş", rating: 5 },
    { quote: "Öğle arasında 15 dakikada çıktım, hem de doyarak.", name: "Gizem Ay", role: "Mecidiyeköy", rating: 5 },
    { quote: "Mercimek çorbası tam kıvamında, limonu bol.", name: "Hakan Er", rating: 4 },
    { quote: "Garsonlar ismimizi hatırlıyor, ayrı bir keyif.", name: "Nur Kaya", role: "Her cuma buradayız", rating: 5 },
    { quote: "İzmir köfte ve pilav: başka söze gerek yok.", name: "Ozan Tek", rating: 5 },
    { quote: "Tatlılar ev yapımı, kazandibi efsane.", name: "Ela Sarı", role: "Tatlı avcısı", rating: 5 },
    { quote: "Fiyatlar semtin en makulü.", name: "Kerem Bal", rating: 4 },
    { quote: "Paket servis bile sıcak geldi.", name: "Defne Uz", role: "Levent", rating: 5 },
  ]} />
}
