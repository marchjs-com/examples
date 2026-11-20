import { Toolbar, Divider, Button, IconButton } from "march/ui"
import { bold, italic } from "march/icons"
import { underline, alignLeft, alignCenter } from "march/icons/lucide"

// düzenleyici araç çubuğu: gruplar dikey ayraçla ayrılır, sonda dışa aktar; altta "ya da" ayracı
export function EditorToolbar() {
  let $b = false
  let $align = "left"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Toolbar label="Biçim" end={<Button size="sm" variant="primary">Dışa aktar</Button>}>
      <IconButton icon={bold} label="Kalın" pressed={$b} on:click={() => $b = !$b} />
      <IconButton icon={italic} label="İtalik" />
      <IconButton icon={underline} label="Altı çizili" />
      <Divider vertical />
      <IconButton icon={alignLeft} label="Sola hizala" pressed={$align === "left"} on:click={() => $align = "left"} />
      <IconButton icon={alignCenter} label="Ortala" pressed={$align === "center"} on:click={() => $align = "center"} />
    </Toolbar>
    <Divider label="ya da" />
    <Button>Şablondan başla</Button>
  </div>
}
