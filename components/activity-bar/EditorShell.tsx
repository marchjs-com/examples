import { ActivityBar, Card, Button, toast } from "march/ui"
import { files, search, gitBranch, settings, send } from "march/icons"

// bir kod editörünün kenarı: simge çubuğu yan paneli değiştirir; etkin simgeye yeniden basınca panel kapanır.
// Kaynak denetimindeki rozet bekleyen değişiklik sayısı; Gönder onları sıfırlar
const FILES = ["App.tsx", "router.ts", "theme.css"]

// yan panelin bir görünümü: başlık ve içerik
const Side = (props: { title: string; children?: unknown }) => <Card title={props.title}>{props.children}</Card>

export function EditorShell() {
  let $view: string | null = "files"
  let $changes = 3
  return <div sx={{ flex: "row", gap: 2 }}>
    <ActivityBar label="Editör görünümleri" controls="editor-side" value={$view} onChange={(id: string) => $view = id} items={[
      { id: "files", label: "Dosyalar", icon: files },
      { id: "search", label: "Ara", icon: search },
      { id: "git", label: "Kaynak denetimi", icon: gitBranch, badge: () => $changes },
      { id: "settings", label: "Ayarlar", icon: settings, position: "end", onSelect: () => toast("Ayarlar açıldı") },
    ]} />
    <div id="editor-side" role="tabpanel" sx={{ flex: "grow" }}>
      {() => $view === "files" ? <Side title="Dosyalar">{FILES.map((f) => <div sx={{ p: 1 }}>📄 {f}</div>)}</Side>
        : $view === "search" ? <Side title="Ara"><span sx={{ color: "muted" }}>Projede bir sözcük ara…</span></Side>
        : $view === "git" ? <Side title="Kaynak denetimi">
            <div sx={{ flex: "col", gap: 2 }}>
              <span>{$changes ? `${$changes} değişiklik gönderilmeyi bekliyor` : "Her şey gönderildi"}</span>
              <Button size="sm" variant="primary" icon={send} disabled={!$changes} on:click={() => { $changes = 0; toast("Değişiklikler gönderildi") }}>Gönder</Button>
            </div>
          </Side>
        : <span sx={{ color: "muted" }}>Yan panel kapalı: bir simgeye bas.</span>}
    </div>
  </div>
}
