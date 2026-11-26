// AppUILab: the full-featured AppUI example; it uses every prop at least once.
//
// AppUI is a ready application workspace: a top bar, an optional side slot and status slot, and a dock of panels.
// Props shown here: panels (one of them a file), plugins (a ".md" file type plus a panel of its own), title,
// description, descriptionMark, tools, side (an ActivityBar), status (a StatusBar), bar, layoutLabel, layoutMenu,
// layoutIcon, kit; and everything of the DockLayout underneath: presets, preset, layout (the start tree), persist,
// storage, label, commands, api, onChange, onClose, actions, narrow, narrowTabs, motion, icons, labels, id and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// AppUILab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { AppUI, ActivityBar, StatusBar, Button, definePlugin, row, col, tabs, type AppKit, type DockApi } from "march/ui"
import { fileText, folder, grid, terminal, star } from "march/icons"

// A plugin is a small bundle that extends the app. definePlugin gives it an id and a title; activate(ctx) runs once
// and registers things: ctx.fileType teaches AppUI how to draw ".md" files (`match` picks the files, `mount` draws
// them; f.text() is a reactive accessor of the file's text), and ctx.panel adds a panel of its own to the dock.
const mdPlugin = definePlugin({ id: "lab.md", title: "Markdown", activate(ctx) {
  ctx.fileType({ id: "md", match: /\.md$/, mount: (f) => <article sx={{ p: 2 }}><strong>{() => f.text().split("\n")[0]}</strong></article> })
  ctx.panel({ id: "stars", title: "Yıldızlar", icon: star, content: () => <p sx={{ p: 2 }}>Eklentinin paneli</p> })
} })

export function AppUILab() {
  // Reactive state shown in the status bar and used by the slots: the selected side view, whether the top bar is
  // visible, how many layout changes happened, how many panels the plugin kit reported, and the last closed panel id.
  let $view: string | null = "files"
  let $bar = true
  let $changes = 0
  let $plugins = 0
  let $closed = ""
  // A tiny in-memory store used by `storage` below (instead of localStorage), so the Lab saves nothing between runs.
  const mem = new Map<string, unknown>()
  // The dock's imperative api, handed to us through the `api` prop; used to open panels from outside the dock.
  let dock: DockApi | undefined
  // The panels. `id` is what layouts and dock.open() refer to; `min` is the smallest size in pixels [width, height];
  // `file` makes a file panel (the plugin's file type draws it); `closable` lets the user close the panel's tab.
  const panels = [
    { id: "files", title: "Dosyalar", icon: folder, min: [120, 80] as [number, number], content: () => <p sx={{ p: 2 }}>src/ · README.md</p> },
    { id: "readme", title: "README.md", icon: fileText, file: { path: "README.md", text: () => "# Merhaba AppUI\nbir dosya paneli" } },
    { id: "log", title: "Günlük", icon: terminal, closable: true, content: () => <p sx={{ p: 2 }}>derleme tamam</p> },
  ]
  // A fixed height: the workspace fills its parent, so the parent must have a size.
  return <div style={{ height: "24rem" }}>
    {/* Top bar and slots:
        - panels, plugins: what the dock can show and the plugin that extends it.
        - title, description, descriptionMark: the bar's text; the mark is drawn in front of the description.
        - tools: extra content in the top bar (a button that opens the log panel through the dock api).
        - side: a slot beside the dock, here an ActivityBar whose selection opens the matching panel.
        - status: a slot below the dock, here a StatusBar. Items with onSelect act as buttons; side: "end" aligns an
          item to the right; text as a function stays live.
        - bar: shows or hides the top bar (the status item flips it).
        - layoutLabel, layoutMenu, layoutIcon: name, menu and icon of the layout button in the top bar.
        - kit: called with the app kit (here: how many panels exist).
        Dock layout:
        - presets: named layouts offered in the layout menu; each `tree` builds a layout from row(), col() and tabs()
          (row / col split with size ratios, tabs holds panel ids). preset="main" starts with the first one.
        - layout: the start layout tree (one tab group with all four panels).
        - persist: a key under which the user's layout is saved; storage replaces where it is saved (get / set).
        - label: the accessible name of the dock. commands: the prefix for the dock's commands (the command palette
          lists them under it); the other examples pass commands={false} to switch them off.
        - api hands us the dock api. onChange runs after every layout change; onClose runs when a panel is closed:
          returning false keeps the panel open (a way to ask "are you sure?" first).
        - actions: the buttons on each tab group. narrow={320}: below that width the dock switches to its narrow mode
          and narrowTabs="bottom" puts the tabs at the bottom.
        - motion={false}: turns the dock's own animation off. When it is on, it still follows reduced motion and the
          global speed / "Stop all" settings.
        - icons and labels replace the glyphs and texts of the dock chrome (menu, maximize, restore, collapse).
        - id and class mark the root for CSS and tests. */}
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
