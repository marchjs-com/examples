import { StatusBar } from "march/ui"
import { bell } from "march/icons"
import { moreHorizontal } from "march/icons/lucide"

// StatusBar'ın özellikleri: items (id, text, icon, side, tone, title, onSelect, command, priority, live), label,
// moreLabel, moreIcon, overflow, dot (kendi işaretin), pulse, class
export function StatusBarLab() {
  let $count = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* overflow: sığmayan öğeler (önce düşük priority) "Daha fazla" menüsüne taşınır; false: taşınmaz */}
    <StatusBar class="lab-bar" label="Durum" moreLabel="Daha fazla" moreIcon={moreHorizontal} pulse={false} overflow
      dot={(tone: () => string) => <b>{() => (tone() === "busy" ? "◌" : "◆")}</b>}
      items={[
        { id: "count", text: () => `${$count} tık`, title: "Say", onSelect: () => $count++ },
        { id: "bell", side: "end", icon: bell, text: "2", title: "Bildirimler", tone: "busy", priority: 2 },
        { id: "ok", side: "end", text: "Hazır", tone: "success", live: true },
      ]} />
  </div>
}
