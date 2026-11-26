// NotesToolbar: the real-life CommandPalette example.
//
// What it shows: the top bar of a notes app. The app registers its commands (new note, pin, export, delete all) with
// registerCommands while the bar is on screen, and a PaletteButton opens a palette that finds them (also by keywords
// such as "pdf").
// When to use this pattern: commands that exist only while a part of the UI exists. registerCommands returns a function
// that removes them again; passing it to onCleanup unregisters the commands when the component goes away, so the
// palette never lists commands that cannot work any more.
// Keyboard: a command's `shortcut` ("mod" = Ctrl or Command) is shown on its row in the palette.
import { CommandPalette, PaletteButton, registerCommands, Toolbar, Badge, toast } from "march/ui"
import { fileText, download, trash, pin } from "march/icons"
import { onCleanup } from "march"

export function NotesToolbar() {
  let $notes = 2
  let $pinned = false
  // Register the commands and unregister them in onCleanup. `group` is the heading of the row, `keywords` are extra
  // words that find the command, `run` is what Enter does.
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
    {/* The button opens the palette. shortcut={false} on the palette: this bar does not take over the page's global
        Ctrl+K. onRun receives the entry that ran (a toast confirms it). */}
    <PaletteButton label="Komut ara…" />
    <CommandPalette shortcut={false} placeholder="Not komutu ara…" onRun={(e: { title: string }) => toast(`Çalıştı: ${e.title}`)} />
  </Toolbar>
}
