import { CommandPalette, PaletteButton, Card, toast } from "march/ui"
import { bot, users, settings, globe } from "march/icons"

// CommandPalette'in bütün özellikleri: ask (niyet araması) + askDelay + askIcon, kendi komutları, sonuç sınırı,
// yer tutucu, kısayol, onRun, kendi metinleri (labels), kendi tuş ipucu (hint), kendi boş durumu (empty: ask yokken görünür), sınıf
const commands = [
  { id: "lab.team", title: "Ekip sayfası", group: "Gezinti", icon: users, run: () => {} },
  { id: "lab.settings", title: "Ayarları aç", group: "Gezinti", icon: settings, shortcut: "mod+,", run: () => {} },
  { id: "lab.site", title: "Siteyi yayınla", group: "Eylem", icon: globe, keywords: "deploy yayın", run: () => {} },
  { id: "lab.more1", title: "Rapor indir", group: "Eylem", run: () => {} },
  { id: "lab.more2", title: "Rapor paylaş", group: "Eylem", run: () => {} },
]
// sahte bir yapay zekâ: "ayar" geçen her soruya Ayarları aç'ı önerir
const ask = async (q: string) => ({ results: q.includes("ayar") ? [{ id: "lab.settings", reason: "Ayarlar burada" }] : [] })

export function CommandPaletteLab() {
  let $last = "henüz yok"
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <PaletteButton label="Laboratuvar paleti" shortcut="mod+shift+l" />
      <span sx={{ text: "sm", color: "muted" }}>Son çalışan: {$last}</span>
    </div>
    <CommandPalette
      ask={ask}
      askDelay={300}
      askIcon={bot}
      placeholder="Bir şey yaz: ayar, rapor, ekip…"
      shortcut="mod+shift+l"
      limit={4}
      commands={commands}
      onRun={(e: { title: string }) => { $last = e.title; toast(`Çalıştı: ${e.title}`) }}
      labels={{ dialog: "Laboratuvar paleti", search: "Laboratuvarda ara", results: "Bulunanlar", suggested: "Asistan öneriyor", asking: "Asistan düşünüyor…", askFailed: "Asistan yanıt vermedi", ask: (q: string) => `Asistana sor: ${q}` }}
      hint={<span>↑ ↓ gez · Enter çalıştır · Esc kapat</span>}
      empty={<span>Burada böyle bir şey yok</span>}
      class="lab-palette"
    />
  </Card>
}
