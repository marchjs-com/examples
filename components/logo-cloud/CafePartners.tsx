// CafePartners: the real-life LogoCloud example.
//
// What it shows: the "chosen by" strip of a coffee brand: six cafe names drawn as coloured wordmarks in a grid. By default
// logos share one muted tone and show their own colour on hover; the cells reveal as they scroll into view.
// When to use this pattern: customer or partner logos on a landing page. You pass a list of { name, node } (or { name,
// src } for an image); `name` is the accessible name of each logo.
//
// Animation: `reveal="up"` picks the entrance of the grid cells; reveal="none" would show them at once. Reveal
// effects are the same ones the Reveal component offers.
// Accessibility: each logo is named by its `name`: an image gets it as alt, an inline node as aria-label.
import { LogoCloud } from "march/landing"

// A small stand-in for a real logo: the name as bold text in a brand colour. In a real page you would pass an image
// (`src`) or an SVG component here.
const Wordmark = (p: { name: string; color: "brand-orange" | "brand-blue" | "brand-green" | "brand-purple" | "brand-gold" | "brand-pink" }) =>
  <span sx={{ text: ["lg", "bold"], color: p.color }}>{p.name}</span>

export function CafePartners() {
  // title: a small heading above the logos. variant is "grid" by default (equal cells that light up on hover). logos:
  // each item has a `name` (its accessible name) and a `node` (what is drawn). Giving `href` would make a logo a link.
  return <LogoCloud title="Çekirdeklerimiz bu kafelerde demleniyor" reveal="up" logos={[
    { name: "Moda Kahve", node: <Wordmark name="Moda Kahve" color="brand-orange" /> },
    { name: "Kuzguncuk Fırın", node: <Wordmark name="Kuzguncuk Fırın" color="brand-gold" /> },
    { name: "Üç Çatal", node: <Wordmark name="Üç Çatal" color="brand-green" /> },
    { name: "Mavi Kapı", node: <Wordmark name="Mavi Kapı" color="brand-blue" /> },
    { name: "Lale Büfe", node: <Wordmark name="Lale Büfe" color="brand-pink" /> },
    { name: "Gece Kuşu", node: <Wordmark name="Gece Kuşu" color="brand-purple" /> },
  ]} />
}
