import { ThemeMenu, Card, Button } from "march/ui"
import { sun } from "march/icons"

// ThemeMenu'nün bütün özellikleri. Üstte: kendi teması olan bir önizleme (value + onChange + page + mode; düğmede geçerli
// tema, kartlar, ince boyut, panel sınıfı). Altta: sayfanın menüsü (kendi ikonu, adı, yeri, vurgular, başlık metinleri)
// ve yalnız metinli, sade bir menü (temalar / kipler / başlıklar kapalı).
export function ThemeMenuLab() {
  let $theme = ""
  let $dark = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card m:theme={$theme || null}>
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        <span sx={{ text: "bold" }}>Önizleme: {$theme || "sayfanın teması"}</span>
        <ThemeMenu value={$theme} onChange={(id) => $theme = id} page mode={$dark ? "dark" : "light"} current view="cards" size="sm" panelClass="lab-preview-panel" />
        <Button on:click={() => $dark = !$dark}>{$dark ? "Örnekler koyu" : "Örnekler açık"}</Button>
      </div>
    </Card>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <ThemeMenu label="Sayfa görünümü" icon={sun} placement="bottom-start" themes view="list" modes headings
        accents={["primary", "brand-green", "brand-purple"]} labels={{ theme: "Renk teması", accent: () => "Vurgu rengi" }} class="lab-page-menu" />
      <ThemeMenu label="Yalnız vurgu" icon={false} themes={false} modes={false} headings={false} placement="top-start" class="lab-accent-menu" />
    </div>
  </div>
}
