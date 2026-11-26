// FileTabs: the real-life Tabs example.
//
// What it shows: the open files of an editor. A file with unsaved changes has a "changed" dot, every tab has a close mark
// (the Delete key closes the focused tab too), a button at the end of the strip adds a new file, and the chosen tab is kept
// in `$active` with bind:value. The panel of each file shows its text and a save button while it has unsaved changes.
// When to use this pattern: tabs that come and go at run time. `tabs` is given as a function that maps your own list, so
// adding or removing a file updates the strip; Tabs only reports `onClose`, and you remove the file yourself.
//
// Animation: by default the panel rises in once when it appears; `motion` picks another (see WeekWeather) or "none".
// Reduced motion: the panel switches without motion.
// Accessibility: role="tablist" with role="tab" buttons and one role="tabpanel" labelled by the active tab. Only the active
// tab is a Tab stop; the arrow keys, Home and End move between tabs (mirrored in RTL). The close mark is a pointer shortcut
// hidden from assistive technology, so the Delete key is the keyboard way; the "changed" dot has an accessible name
// (labels.dirty).
import { Tabs, IconButton, Button, toast } from "march/ui"
import { plus, fileText } from "march/icons"

// A file is an id, a name, its text and whether it has unsaved changes.
interface OpenFile { id: string; name: string; text: string; dirty: boolean }

export function FileTabs() {
  // Reactive state: the open files (replaced, not mutated), the id of the active tab, and a counter for new file names.
  let $files: OpenFile[] = [
    { id: "app", name: "App.tsx", text: "export function App() { return <Home /> }", dirty: false },
    { id: "router", name: "router.ts", text: "export const routes = { \"/\": Home, \"/ayarlar\": Settings }", dirty: true },
    { id: "theme", name: "theme.css", text: ":root { --m-radius-3: 12px; }", dirty: false },
  ]
  let $active = "app"
  let $count = 1
  // Whether a file has unsaved changes (read live, so the dot and the save button follow it).
  const dirty = (id: string) => $files.find((f) => f.id === id)?.dirty ?? false
  // Saves: clears the flag and shows a toast. close: removes the file (Tabs calls it, it does not remove anything itself).
  const save = (id: string) => { $files = $files.map((f) => (f.id === id ? { ...f, dirty: false } : f)); toast("Kaydedildi") }
  const close = (id: string) => { $files = $files.filter((f) => f.id !== id) }
  // Adds an unsaved, empty file and makes it the active tab.
  const add = () => {
    const id = `yeni-${$count}`
    $files = [...$files, { id, name: `adsız-${$count}.ts`, text: "", dirty: true }]
    $count++
    $active = id
  }
  // label: the accessible name of the tab list. bind:value keeps the active id in $active. onClose is called by the close
  // mark and the Delete key. labels: the close mark's tooltip and the "changed" dot's accessible name. actions: content at
  // the end of the tab bar, outside the tab list (here the "new file" button). tabs as a function: it is read again when
  // $files changes.
  return <Tabs label="Açık dosyalar" bind:value={$active} onClose={close} labels={{ close: "Dosyayı kapat", dirty: "kaydedilmedi" }}
    actions={<IconButton icon={plus} label="Yeni dosya" size="sm" on:click={add} />}
    tabs={() => $files.map((f) => ({
      // Per tab: id and label; icon; closable shows the close mark; dirty (a function) shows the "changed" dot; content
      // (a function) builds the panel only when the tab is active.
      id: f.id, label: f.name, icon: fileText, closable: true, dirty: () => dirty(f.id),
      content: () => <div sx={{ flex: "col", gap: 2 }}>
        <code sx={{ text: "mono" }}>{f.text || "// boş dosya"}</code>
        {() => (dirty(f.id) ? <Button size="sm" on:click={() => save(f.id)}>Kaydet</Button> : <span sx={{ text: "sm", color: "muted" }}>Kaydedildi</span>)}
      </div>,
    }))} />
}
