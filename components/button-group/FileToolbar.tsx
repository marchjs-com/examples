import { ButtonGroup, Button, Card, toast } from "march/ui"
import { Icon, list, grid, upload, folder, fileText } from "march/icons"

// dosya yöneticisinin üst çubuğu: solda aralıklı eylem grubu, sağda bitişik görünüm seçici (liste / ızgara)
const files = ["Teklif.pdf", "Bütçe.xlsx", "Logo.svg", "Notlar.md", "Sunum.key", "Sözleşme.pdf"]

export function FileToolbar() {
  let $view = "list" as "list" | "grid"
  return <Card title="Belgeler">
    <div sx={{ flex: ["row", "between", "wrap"], gap: 2, mb: 3 }}>
      <ButtonGroup label="Dosya eylemleri">
        <Button icon={upload} size="sm" on:click={() => toast("Yükleme penceresi açıldı")}>Yükle</Button>
        <Button icon={folder} size="sm" variant="secondary" on:click={() => toast("Yeni klasör oluşturuldu")}>Yeni klasör</Button>
      </ButtonGroup>
      <ButtonGroup attached label="Görünüm">
        <Button icon={list} size="sm" variant="secondary" pressed={$view === "list"} on:click={() => $view = "list"}>Liste</Button>
        <Button icon={grid} size="sm" variant="secondary" pressed={$view === "grid"} on:click={() => $view = "grid"}>Izgara</Button>
      </ButtonGroup>
    </div>
    <div sx={{ cols: $view === "grid" ? 3 : 1, gap: 2 }}>
      {files.map((f) => <div sx={{ flex: ["row", "center"], gap: 2, p: 2, radius: 2, shadow: 1 }}>
        <span sx={{ color: "brand-blue" }}><Icon of={fileText} /></span><span sx={{ text: "sm" }}>{f}</span>
      </div>)}
    </div>
  </Card>
}
