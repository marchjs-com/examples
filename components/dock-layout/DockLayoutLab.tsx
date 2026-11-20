import { DockLayout, Toolbar, Button, row, col, tabs, type DockApi } from "march/ui"
import { folder, fileText, terminal, bug, lock } from "march/icons"

// DockLayout'un bütün özellikleri: paneller (en küçük boyut, kapatılabilir, rozet, değişti noktası, kapalı, onShow),
// hazır düzenler + başlangıç düzeni, düzen ağacı, saklama (bellekte), ad, komut öneki, api, onChange, onClose, grup
// düğmeleri, dar kip ve sekme yeri, hareket, kendi ikonlar ve metinler, id, sınıf. Üstteki düğmeler api'yi kullanır.
export function DockLayoutLab() {
  let $changes = 0
  let $shown = 0
  let $closed = "yok"
  let $log = ["hazır"]
  let $dirty = true
  const mem = new Map<string, unknown>()
  let dock: DockApi | undefined
  const panels = [
    { id: "files", title: "Dosyalar", icon: folder, min: [120, 80] as [number, number], content: () => <p sx={{ p: 2 }}>src/ · lab.ts</p> },
    { id: "editor", title: "lab.ts", icon: fileText, dirty: () => $dirty, content: () => <div sx={{ p: 2 }}><Button size="sm" on:click={() => $dirty = !$dirty}>{$dirty ? "Kaydet" : "Değiştir"}</Button></div> },
    { id: "log", title: "Günlük", icon: terminal, closable: true, badge: () => $log.length, onShow: () => $shown++, content: () => <div sx={{ p: 2 }}>{() => $log.join(" · ")}</div> },
    { id: "debug", title: "Hata ayıklama", icon: bug, content: () => <p sx={{ p: 2 }}>kesme noktası yok</p> },
    { id: "secret", title: "Kilitli", icon: lock, disabled: true, content: () => <p>görünmez</p> },
  ]
  return <div sx={{ flex: "col", gap: 2 }}>
    <Toolbar label="Lab düğmeleri">
      <Button size="sm" variant="secondary" on:click={() => dock?.preset("wide")}>Geniş düzen</Button>
      <Button size="sm" variant="secondary" on:click={() => dock?.collapse("files")}>Dosyaları daralt</Button>
      <Button size="sm" variant="secondary" on:click={() => dock?.close("log")}>Günlüğü kapat</Button>
      <span sx={{ text: "sm" }}>değişiklik: {$changes} · görünme: {$shown} · kapatılan: {$closed}</span>
    </Toolbar>
    <div style={{ height: "20rem" }}>
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
