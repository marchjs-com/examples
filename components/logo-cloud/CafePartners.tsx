import { LogoCloud } from "march/landing"

// bir kahve markasının "bizi tercih edenler" şeridi: yazı logoları ızgarada, üzerine gelince renklenir
const Wordmark = (p: { name: string; color: "brand-orange" | "brand-blue" | "brand-green" | "brand-purple" | "brand-gold" | "brand-pink" }) =>
  <span sx={{ text: ["lg", "bold"], color: p.color }}>{p.name}</span>

export function CafePartners() {
  return <LogoCloud title="Çekirdeklerimiz bu kafelerde demleniyor" reveal="up" logos={[
    { name: "Moda Kahve", node: <Wordmark name="Moda Kahve" color="brand-orange" /> },
    { name: "Kuzguncuk Fırın", node: <Wordmark name="Kuzguncuk Fırın" color="brand-gold" /> },
    { name: "Üç Çatal", node: <Wordmark name="Üç Çatal" color="brand-green" /> },
    { name: "Mavi Kapı", node: <Wordmark name="Mavi Kapı" color="brand-blue" /> },
    { name: "Lale Büfe", node: <Wordmark name="Lale Büfe" color="brand-pink" /> },
    { name: "Gece Kuşu", node: <Wordmark name="Gece Kuşu" color="brand-purple" /> },
  ]} />
}
