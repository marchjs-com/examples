import { ProjectGrid } from "march/landing"

// bir tasarım stüdyosunun işleri: fotoğraf kapaklar (boyutu ayrılmış, tembel yüklenir), süzgeç çipleri;
// kapağa basınca görsel büyük açılır (Lightbox)
// bir projenin biçimi: kapak bir görsel ya da düğüm
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; href?: string; cover: Node | { src: string; alt: string; width: number; height: number } }
const WORK: Project[] = [
  { id: "kapadokya", title: "Kapadokya Turizm", category: "Marka", year: 2026, summary: "Yeni kimlik ve rezervasyon sitesi.", cover: { src: "/media/dusk.jpg", alt: "Gün batımında vadi", width: 1200, height: 800 } },
  { id: "dalga", title: "Dalga Müzik", category: "Uygulama", year: 2026, summary: "Canlı dinleme odaları, iOS ve Android.", cover: { src: "/media/hadi-waves.jpg", alt: "Renkli dalgalar", width: 960, height: 540 } },
  { id: "aksam", title: "Akşam Sofrası", category: "Web", year: 2025, summary: "Restoran zinciri için sipariş sitesi.", cover: { src: "/media/dusk.jpg", alt: "Akşam ışığı", width: 1200, height: 800 } },
  { id: "ritim", title: "Ritim Festivali", category: "Marka", year: 2025, summary: "Afişler, bilet sayfası ve hareket.", cover: { src: "/media/hadi-waves.jpg", alt: "Festival renkleri", width: 960, height: 540 } },
]

export function StudioWork() {
  return <ProjectGrid projects={WORK} cols={2} allLabel="Tüm işler" filtersLabel="İşleri süz" />
}
