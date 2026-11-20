import { StatusBar } from "march/ui"
import { gitBranch, alertTriangle } from "march/icons"

// düzenleyici durum çubuğu: dal, hatalar, imleç satırı; kaydet düğmesi durumu değiştirir
export function EditorStatus() {
  let $saving = false
  let $line = 1
  return <StatusBar label="Editör durumu" items={[
    { id: "branch", icon: gitBranch, text: "main", priority: 5 },
    { id: "problems", icon: alertTriangle, text: "0 hata", priority: 3 },
    { id: "pos", side: "end", text: () => `Sa ${$line}`, title: "Sonraki satır", onSelect: () => $line++, priority: 4 },
    { id: "save", side: "end", text: () => ($saving ? "Kaydediliyor…" : "Kaydet"), tone: () => ($saving ? "busy" : "success"), onSelect: () => { $saving = true; setTimeout(() => $saving = false, 800) }, live: true, priority: 9 },
  ]} />
}
