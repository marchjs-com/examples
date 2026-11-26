// DockLayoutLab: the full-featured DockLayout example; it uses every prop at least once.
//
// Props shown here: panels (min size, closable, badge, dirty dot, disabled, onShow), presets + preset, layout (the tree
// helpers row / col / tabs), persist + storage (kept in memory here), label, commands, api, onChange, onClose, actions,
// narrow + narrowTabs, motion, icons, labels, id and class. The buttons above the dock use the api.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DockLayoutLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { DockLayout, Toolbar, Button, row, col, tabs, type DockApi } from "march/ui"
import { folder, fileText, terminal, bug, lock } from "march/icons"

// The counters and texts the callbacks write, so you can see onChange, onShow and onClose fire.
export function DockLayoutLab() {
  let $changes = 0
  let $shown = 0
  let $closed = "yok"
  let $log = ["hazır"]
  let $dirty = true
  // A tiny in-memory store for `persist`: any object with get / set works (sync or async). Without `storage` the dock
  // uses localStorage. A Map keeps this example from touching the browser's storage.
  const mem = new Map<string, unknown>()
  // The dock's api (open, close, collapse, preset...), handed over by the `api` prop below.
  let dock: DockApi | undefined
  // A panel is { id, title, icon, content } plus options:
  // - min: the smallest size [width, height] in px; closable: a close mark on its tab; badge: a count on the tab;
  // - dirty: a getter; while true the tab shows a "changed" dot; disabled: the tab cannot be used;
  // - onShow: called when the panel becomes visible. `content` is a function so a panel is built when it is needed.
  const panels = [
    { id: "files", title: "Dosyalar", icon: folder, min: [120, 80] as [number, number], content: () => <p sx={{ p: 2 }}>src/ · lab.ts</p> },
    { id: "editor", title: "lab.ts", icon: fileText, dirty: () => $dirty, content: () => <div sx={{ p: 2 }}><Button size="sm" on:click={() => $dirty = !$dirty}>{$dirty ? "Kaydet" : "Değiştir"}</Button></div> },
    { id: "log", title: "Günlük", icon: terminal, closable: true, badge: () => $log.length, onShow: () => $shown++, content: () => <div sx={{ p: 2 }}>{() => $log.join(" · ")}</div> },
    { id: "debug", title: "Hata ayıklama", icon: bug, content: () => <p sx={{ p: 2 }}>kesme noktası yok</p> },
    { id: "secret", title: "Kilitli", icon: lock, disabled: true, content: () => <p>görünmez</p> },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* These buttons call the dock's api: preset(name) switches layout, collapse(id) shrinks a group, close(id) asks onClose. */}
    <Toolbar label="Lab düğmeleri">
      <Button size="sm" variant="secondary" on:click={() => dock?.preset("wide")}>Geniş düzen</Button>
      <Button size="sm" variant="secondary" on:click={() => dock?.collapse("files")}>Dosyaları daralt</Button>
      <Button size="sm" variant="secondary" on:click={() => dock?.close("log")}>Günlüğü kapat</Button>
      <span sx={{ text: "sm" }}>değişiklik: {$changes} · görünme: {$shown} · kapatılan: {$closed}</span>
    </Toolbar>
    <div style={{ height: "20rem" }}>
      {/* The DockLayout (it fills the height of its parent, here 20rem):
                - presets: ready-made layouts, written with row([weight, child]...), col(...) and tabs(ids); preset names the one
                  shown first; layout is the default tree when no presets are given.
                - persist + storage: the layout and the saved layouts are kept under that key in the store we pass.
                - label: the accessible name of the workspace; commands: the prefix of the palette commands it adds
                  (false turns them off); id and class go on the root.
                - api: hands over the dock's api; onChange: called after every change of the layout.
                - onClose(id): asked when a closable tab is closed; return false to keep the panel (here it only records it).
                - actions: which buttons a group shows (menu, maximize, collapse); icons / labels: your own marks and texts.
                - narrow: below this width (px) the dock shows one tab group and no drag; narrowTabs: where its tabs go
                  (bottom is in reach of the thumb).
                - motion={false}: no slide when the layout changes (the default is a short slide on the motion engine, which
                  already respects reduced motion and "Stop all").
                Keyboard: arrows move between tabs, Ctrl+Shift+arrows move a tab, Delete closes a closable tab, Shift+F10 opens
                the panel menu; splitters resize with the arrow keys. */}
      <DockLayout
        panels={panels}
        presets={{
          main: { title: "Ana", tree: () => row([0.25, tabs("files")], [0.75, col([0.6, tabs(["editor", "secret"])], [0.4, tabs(["log", "debug"])])]) },
          wide: { title: "Geniş", tree: () => row([0.5, tabs(["editor", "files"])], [0.5, tabs(["log", "debug", "secret"])]) },
        }}
        preset="main"
        layout={tabs(["editor", "files", "log", "debug", "secret"])}
        persist="lab-dock"
        storage={{ get: (k) => mem.get(k), set: (k, v) => { mem.set(k, v) } }}
        label="Lab çalışma alanı"
        commands="labDock"
        api={(a) => dock = a}
        onChange={() => $changes++}
        onClose={(id) => { $closed = id; $log = [...$log, `${id} kapandı`]; return false }}
        actions={["menu", "maximize", "collapse"]}
        narrow={300}
        narrowTabs="bottom"
        motion={false}
        icons={{ menu: "⋯", maximize: "▢", restore: "❐", collapse: "–" }}
        labels={{ menu: "Seçenekler", maximize: "Tam boy", restore: "Eski boyut", collapse: "Şeride indir", panels: "Paneller", strip: "Daralan paneller" }}
        id="lab-dock"
        class="lab-dock"
      />
    </div>
  </div>
}
