import { PanelHeader, Badge, Button } from "march/ui"
import { settings, minus } from "march/icons"

// PanelHeader'ın özellikleri: as, lead, icon, title, titleAs, titleId, subtitle, meta, actions, onClose, close,
// closeLabel, size, sticky, divider, tone, drag, align, class, partClass
export function PanelHeaderLab() {
  let $closed = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <PanelHeader class="lab-head" icon={settings} title="Ayarlar" titleAs="h2" titleId="lab-title" subtitle="Çalışma alanı" meta={<Badge>3</Badge>}
      actions={<Button size="sm">Kaydet</Button>} onClose={() => $closed++} closeLabel="Paneli kapat" size="lg" divider tone="muted" sticky align="center" />
    {/* partClass: kendi sınıf adlarını koruyan bir bileşen için parçalara (titles, title, subtitle, meta, actions) ek sınıf */}
    <PanelHeader class="lab-own" partClass={{ titles: "lab-own-titles", title: "lab-own-title" }} lead={<span>☰</span>} title="Kendi kapat ikonum" close={minus} closeLabel="Küçült" onClose={() => $closed++} drag size="sm" />
    <PanelHeader class="lab-foot" as="footer" title="Alt çubuk" close={false} />
    <span class="lab-closed">{$closed} kez kapatıldı</span>
  </div>
}
