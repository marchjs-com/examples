// PanelHeaderLab: the full-featured PanelHeader example; it uses every prop at least once (except `ref`, see below).
//
// PanelHeader is the bar on top of a panel (a dialog, a drawer, a window, a card, an editor): a lead slot, an icon, the
// title and a second line, free content, a count, the actions and the close button. Every part is optional and can be
// replaced; as="footer" draws the same bar under a panel. Props shown here: as, lead, icon, title, titleAs, titleId,
// subtitle, meta, actions, onClose, close, closeLabel, size, sticky, divider, tone, drag, align, class, partClass.
// `ref` (the root element, to attach a drag behaviour) is not used here.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PanelHeaderLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { PanelHeader, Badge, Button } from "march/ui"
import { settings, minus } from "march/icons"

export function PanelHeaderLab() {
  // How many times a close button was pressed (both headers below count into it).
  let $closed = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The first header uses most props:
        - icon: before the title. title / subtitle: the heading and a second line. titleAs="h2": the title is a real <h2>
          (the default is h3); titleId: its id, so the panel can name itself with aria-labelledby.
        - meta: free content right after the title (here a Badge). actions: free content at the end (here a Button).
        - onClose: shows the close button and is called when it is pressed. closeLabel: its accessible name and tooltip.
        - size="lg": the larger bar. divider: a rule between the bar and the content. tone="muted": the tinted bar of
          editors. sticky: the bar stays at the top while the panel scrolls. align="center": the cross-axis alignment of
          the parts. class: for CSS or tests. */}
    <PanelHeader class="lab-head" icon={settings} title="Ayarlar" titleAs="h2" titleId="lab-title" subtitle="Çalışma alanı" meta={<Badge>3</Badge>}
      actions={<Button size="sm">Kaydet</Button>} onClose={() => $closed++} closeLabel="Paneli kapat" size="lg" divider tone="muted" sticky align="center" />
    {/* partClass: an extra class on inner parts (titles, title, subtitle, meta, actions), for a host component that keeps its own class names */}
    {/* This second header: lead puts a node before everything (a back button, a status dot, a grip). close takes an icon,
        so the close button shows your own icon instead of the cross. drag: the bar is a drag handle (no text selection,
        no touch scrolling). size="sm": the compact bar. */}
    <PanelHeader class="lab-own" partClass={{ titles: "lab-own-titles", title: "lab-own-title" }} lead={<span>☰</span>} title="Kendi kapat ikonum" close={minus} closeLabel="Küçült" onClose={() => $closed++} drag size="sm" />
    {/* as="footer": the same bar drawn as a <footer> under a panel. close={false}: no close button. */}
    <PanelHeader class="lab-foot" as="footer" title="Alt çubuk" close={false} />
    <span class="lab-closed">{$closed} kez kapatıldı</span>
  </div>
}
