import { Tabs, IconButton, Button, toast } from "march/ui"
import { plus, fileText } from "march/icons"

// bir editörün açık dosyaları: kaydedilmemiş olanda nokta, her sekmede kapatma işareti (Delete tuşu da kapatır),
// şeridin sonunda yeni dosya düğmesi; seçili sekme bind:value ile $active'te
interface OpenFile { id: string; name: string; text: string; dirty: boolean }

export function FileTabs() {
  let $files: OpenFile[] = [
    { id: "app", name: "App.tsx", text: "export function App() { return <Home /> }", dirty: false },
    { id: "router", name: "router.ts", text: "export const routes = { \"/\": Home, \"/ayarlar\": Settings }", dirty: true },
    { id: "theme", name: "theme.css", text: ":root { --m-radius-3: 12px; }", dirty: false },
  ]
  let $active = "app"
  let $count = 1
  const dirty = (id: string) => $files.find((f) => f.id === id)?.dirty ?? false
  const save = (id: string) => { $files = $files.map((f) => (f.id === id ? { ...f, dirty: false } : f)); toast("Kaydedildi") }
  const close = (id: string) => { $files = $files.filter((f) => f.id !== id) }
  const add = () => {
    const id = `yeni-${$count}`
    $files = [...$files, { id, name: `adsız-${$count}.ts`, text: "", dirty: true }]
    $count++
    $active = id
  }
  return <Tabs label="Açık dosyalar" bind:value={$active} onClose={close} labels={{ close: "Dosyayı kapat", dirty: "kaydedilmedi" }}
    actions={<IconButton icon={plus} label="Yeni dosya" size="sm" on:click={add} />}
    tabs={() => $files.map((f) => ({
      id: f.id, label: f.name, icon: fileText, closable: true, dirty: () => dirty(f.id),
      content: () => <div sx={{ flex: "col", gap: 2 }}>
        <code sx={{ text: "mono" }}>{f.text || "// boş dosya"}</code>
        {() => (dirty(f.id) ? <Button size="sm" on:click={() => save(f.id)}>Kaydet</Button> : <span sx={{ text: "sm", color: "muted" }}>Kaydedildi</span>)}
      </div>,
    }))} />
}
