import { AppUI, ActivityBar, StatusBar, Button, definePlugin, row, col, tabs, type AppKit, type DockApi } from "march/ui"
import { fileText, folder, grid, terminal, star } from "march/icons"

// AppUI'nin bütün özellikleri: paneller (biri dosya), eklenti (".md" dosya türü + kendi paneli), başlık, açıklama ve
// işareti, araçlar, yan (ActivityBar) ve durum (StatusBar) yuvaları, üst çubuk, Yerleşim düğmesinin adı / ikonu, kit;
// altındaki DockLayout'un da hepsi: hazır düzenler, başlangıç düzeni, düzen ağacı, saklama, ad, komut öneki, api,
// onChange, onClose, grup düğmeleri, dar kip, hareket, ikonlar, metinler, id, sınıf.
const mdPlugin = definePlugin({ id: "lab.md", title: "Markdown", activate(ctx) {
  ctx.fileType({ id: "md", match: /\.md$/, mount: (f) => <article sx={{ p: 2 }}><strong>{() => f.text().split("\n")[0]}</strong></article> })
  ctx.panel({ id: "stars", title: "Yıldızlar", icon: star, content: () => <p sx={{ p: 2 }}>Eklentinin paneli</p> })
} })

export function AppUILab() {
  let $view: string | null = "files"
  let $bar = true
  let $changes = 0
  let $plugins = 0
  let $closed = ""
  const mem = new Map<string, unknown>()
  let dock: DockApi | undefined
  const panels = [
    { id: "files", title: "Dosyalar", icon: folder, min: [120, 80] as [number, number], content: () => <p sx={{ p: 2 }}>src/ · README.md</p> },
    { id: "readme", title: "README.md", icon: fileText, file: { path: "README.md", text: () => "# Merhaba AppUI\nbir dosya paneli" } },
    { id: "log", title: "Günlük", icon: terminal, closable: true, content: () => <p sx={{ p: 2 }}>derleme tamam</p> },
  ]
  return <div style={{ height: "24rem" }}>
    <AppUI
      panels={panels}
      plugins={[mdPlugin]}
      title="lab-ide"
      description="bütün özellikler"
      descriptionMark="#"
      tools={<Button size="sm" variant="secondary" on:click={() => dock?.open("log")}>Günlüğü aç</Button>}
      side={<ActivityBar items={[{ id: "files", label: "Dosyalar", icon: folder }, { id: "log", label: "Günlük", icon: terminal }]} value={$view} onChange={(id) => { $view = id; if (id) dock?.open(id) }} />}
      status={<StatusBar items={[{ id: "bar", text: () => ($bar ? "Çubuğu gizle" : "Çubuğu göster"), onSelect: () => $bar = !$bar }, { id: "ch", text: () => `değişiklik: ${$changes}` }, { id: "pl", text: () => `eklenti paneli: ${$plugins}`, side: "end" }, { id: "cl", text: () => $closed ? `kapandı: ${$closed}` : "açık", side: "end" }]} />}
      bar={$bar}
      layoutLabel="Düzenler"
      layoutMenu
      layoutIcon={grid}
      kit={(k: AppKit) => $plugins = k.panels().length}
      presets={{
        main: { title: "Ana düzen", tree: () => row([0.25, tabs("files")], [0.75, col([0.6, tabs(["readme", "stars"])], [0.4, tabs("log")])]) },
        flat: { title: "Tek grup", tree: () => tabs(["readme", "files", "log", "stars"]) },
      }}
      preset="main"
      layout={tabs(["files", "readme", "log", "stars"])}
      persist="lab-app-ui"
      storage={{ get: (k) => mem.get(k), set: (k, v) => { mem.set(k, v) } }}
      label="Lab çalışma alanı"
      commands="labApp"
      api={(a) => dock = a}
      onChange={() => $changes++}
      onClose={(id) => { $closed = id; return false }}
      actions={["maximize", "collapse", "menu"]}
      narrow={320}
      narrowTabs="bottom"
      motion={false}
      icons={{ menu: "⋯", maximize: "▢", restore: "❐", collapse: "–" }}
      labels={{ menu: "Seçenekler", maximize: "Tam boy", restore: "Eski boyut", collapse: "Daralt", panels: "Paneller", strip: "Şerit" }}
      id="lab-app"
      class="lab-app"
    />
  </div>
}
