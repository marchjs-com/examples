// StudioWork: the real-life ProjectGrid example.
//
// What it shows: the work of a design studio: photographic covers with their size reserved (no layout jump, lazy
// loading) and filter chips made from the categories. Without `onOpen`, pressing a cover opens it in a Lightbox.
// When to use this pattern: a portfolio page; pass `onOpen` instead to morph a card into a ProjectDetail page.
//
// Animation: filtering and the entrance of the cards run on the motion engine (reduced motion, global speed and
// "Stop all" apply). Accessibility: filters are toggle chips (aria-pressed) in a labelled group; each card's title link
// covers the card, so it is one tab stop.

import { ProjectGrid } from "march/landing"

// The shape of a project: the cover is an image ({ src, alt, width, height }) or a node.
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; href?: string; cover: Node | { src: string; alt: string; width: number; height: number } }
//  The projects; alt text describes each image and width / height reserve its space. Texts here are content, so they
// stay Turkish.
const WORK: Project[] = [
  { id: "kapadokya", title: "Kapadokya Turizm", category: "Marka", year: 2026, summary: "Yeni kimlik ve rezervasyon sitesi.", cover: { src: "/media/dusk.jpg", alt: "Gün batımında vadi", width: 1200, height: 800 } },
  { id: "dalga", title: "Dalga Müzik", category: "Uygulama", year: 2026, summary: "Canlı dinleme odaları, iOS ve Android.", cover: { src: "/media/hadi-waves.jpg", alt: "Renkli dalgalar", width: 960, height: 540 } },
  { id: "aksam", title: "Akşam Sofrası", category: "Web", year: 2025, summary: "Restoran zinciri için sipariş sitesi.", cover: { src: "/media/dusk.jpg", alt: "Akşam ışığı", width: 1200, height: 800 } },
  { id: "ritim", title: "Ritim Festivali", category: "Marka", year: 2025, summary: "Afişler, bilet sayfası ve hareket.", cover: { src: "/media/hadi-waves.jpg", alt: "Festival renkleri", width: 960, height: 540 } },
]

export function StudioWork() {
  // - cols={2}: two columns; allLabel and filtersLabel: the texts of the "all" chip and the chip group.
  // - No onOpen: a press on a cover opens it in the Lightbox (the `lightbox` prop is on by default).
  return <ProjectGrid projects={WORK} cols={2} allLabel="Tüm işler" filtersLabel="İşleri süz" />
}
