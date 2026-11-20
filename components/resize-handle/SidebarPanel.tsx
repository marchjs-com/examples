import { ResizeHandle } from "march/ui"

// kenar çubuğu: genişliği sürükle ya da ok tuşlarıyla değiştir; Enter başa döndürür
export function SidebarPanel() {
  let $w = 240
  return <div sx={{ flex: "row" }}>
    <aside class="m-card" style={{ position: "relative", "inline-size": `${$w}px` }} sx={{ p: 3 }}>
      <strong>Dosyalar</strong>
      <p sx={{ text: "sm", color: "muted" }}>{Math.round($w)} px</p>
      <ResizeHandle value={() => $w} set={(w: number) => $w = w} min={160} max={400} reset={() => $w = 240} label="Kenar çubuğu genişliği" line="hover" />
    </aside>
    <main sx={{ p: 3 }}>Düzenleyici</main>
  </div>
}
