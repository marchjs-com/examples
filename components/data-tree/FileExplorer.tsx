import { Tree, Card } from "march/ui"
import { folder, fileText, code, settings, image } from "march/icons"

// bir proje gezgini: ikonlu ve boyutlu dosyalar; ok açar / kapar, satır seçer; seçilen dosya sağda açılır
const files = [
  { id: "src", label: "src", icon: folder, children: [
    { id: "app", label: "app.tsx", icon: code, meta: "4 KB" },
    { id: "ui", label: "ui", icon: folder, meta: "2", children: [
      { id: "button", label: "button.tsx", icon: code, meta: "2 KB" },
      { id: "logo", label: "logo.svg", icon: image, meta: "1 KB" },
    ] },
  ] },
  { id: "readme", label: "README.md", icon: fileText, meta: "3 KB" },
  { id: "config", label: "march.config.js", icon: settings, meta: "1 KB" },
]

export function FileExplorer() {
  let $file = "app"
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    <Card title="Dosyalar">
      <Tree label="Proje dosyaları" nodes={files} expanded={["src"]} toggle="chevron" selected={() => $file} onSelect={(n: { id: string; children?: unknown }) => { $file = n.id }} />
    </Card>
    <Card title="Önizleme">
      <span sx={{ color: "muted" }}>{() => `${$file} dosyası düzenleyicide açıldı`}</span>
    </Card>
  </div>
}
