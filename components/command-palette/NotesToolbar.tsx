import { CommandPalette, PaletteButton, registerCommands, Toolbar, Badge, toast } from "march/ui"
import { fileText, download, trash, pin } from "march/icons"
import { onCleanup } from "march"

// bir not uygulamasının üst çubuğu: komutlar ekranda olduğu sürece kayıtlı, bileşen kalkınca kayıttan düşer
export function NotesToolbar() {
  let $notes = 2
  let $pinned = false
  onCleanup(registerCommands([
    { id: "notes.new", title: "Yeni not", group: "Notlar", icon: fileText, shortcut: "mod+alt+n", run: () => $notes++ },
    { id: "notes.pin", title: "Notu sabitle / bırak", group: "Notlar", icon: pin, run: () => $pinned = !$pinned },
    { id: "notes.export", title: "Notları dışa aktar", group: "Dosya", icon: download, keywords: "indir pdf yedek", run: () => toast("Notlar indirildi") },
    { id: "notes.clear", title: "Bütün notları sil", group: "Dosya", icon: trash, keywords: "temizle", run: () => $notes = 0 },
  ]))
  return <Toolbar label="Notlar" m:no-select>
    <span sx={{ text: "bold" }}>Notlarım</span>
    <Badge count={$notes} />
    <span sx={{ text: "sm", color: "muted" }}>{$pinned ? "sabitli" : "sabitsiz"}</span>
    <PaletteButton label="Komut ara…" />
    <CommandPalette shortcut={false} placeholder="Not komutu ara…" onRun={(e: { title: string }) => toast(`Çalıştı: ${e.title}`)} />
  </Toolbar>
}
