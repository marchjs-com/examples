import { ScrollProgress } from "march/landing"
import { Button } from "march/ui"

// kalınlık oyunu: her basışta çubuk kalınlaşır ve rengi değişir; 12 px'ten sonra başa döner
const COLORS = ["brand-orange", "brand-purple", "brand-blue", "brand-green"] as const

export function ThickBar() {
  let $size = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $size = $size >= 12 ? 3 : $size + 3}>Kalınlaştır ({$size} px)</Button>
    {() => {
      const size = $size
      return <ScrollProgress position="inline" size={size} color={COLORS[(size / 3 - 1) % COLORS.length]} label={`${size} piksellik çubuk`} />
    }}
    <p sx={{ color: "muted" }}>Sayfayı kaydır: çubuk okunan kısmı gösterir.</p>
  </div>
}
