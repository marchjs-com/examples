import { Tabs, Tab, IconButton } from "march/ui"
import { animate } from "march/motion"
import { home, users, creditCard, edit, eye } from "march/icons"

// Tabs'ın bütün özellikleri: tabs (id, label, badge, disabled, hidden, icon, title, closable, dirty, content), value,
// onChange, setValue (bind:value), query, class, children (<Tab>), panel, actions, indicator, motion (hazır ve kendi
// işlevin), label, variant, activation, onClose, closeIcon, labels (close, dirty), tabProps
export function TabsLab() {
  let $tab = "home"
  let $size = "md"
  let $team = 3
  let $showDraft = false
  let $closed: string[] = []
  // kendi panel hareketin: yeni sekme sağdaysa sağdan, soldaysa soldan büyüyerek gelir
  const swing = (panel: HTMLElement, dir: 1 | -1) => animate(panel, [{ opacity: 0, transform: `translateX(${dir * 16}px) scale(.96)` }, { opacity: 1, transform: "none" }], { duration: 240 })
  return <div sx={{ flex: "col", gap: 3 }}>
    <Tabs class="lab-tabs" label="Lab sekmeleri" value={$tab} onChange={(id: string) => $tab = id} activation="manual" motion="fade"
      onClose={(id: string) => $closed = [...$closed, id]} closeIcon="✕" labels={{ close: "Sekmeyi kapat", dirty: "kaydedilmedi" }}
      tabProps={(t: { id: string }) => ({ "data-lab": t.id })}
      actions={<IconButton icon={eye} label={$showDraft ? "Taslağı gizle" : "Taslağı göster"} size="sm" pressed={$showDraft} on:click={() => $showDraft = !$showDraft} />}
      tabs={[
        { id: "home", label: "Özet", icon: home, content: () => <p>Seçili: {$tab}</p> },
        { id: "team", label: "Ekip", icon: users, badge: () => $team, content: () => <p>Seçili: {$tab} · {$team} kişi</p> },
        { id: "billing", label: "Ödeme", icon: creditCard, disabled: true, title: "Planınızda yok", content: "Ödeme" },
        { id: "draft", label: "Taslak", icon: edit, hidden: () => !$showDraft || $closed.includes("draft"), closable: true, dirty: true, content: () => <p>Seçili: {$tab}</p> },
      ]} />
    <Tabs class="lab-tabs2" label="Boyut" variant="pill" indicator={false} panel={false} bind:value={$size} tabs={[
      { id: "sm", label: "Küçük" }, { id: "md", label: "Orta" }, { id: "lg", label: "Büyük" },
    ]} />
    <span sx={{ text: "sm", color: "muted" }}>Boyut: {$size}</span>
    <Tabs class="lab-tabs3" label="Alt çizgisiz" indicator={false} query="lab-sekme" motion={swing}>
      <Tab id="first" label="Birinci">Birinci panel</Tab>
      <Tab id="second" label="İkinci">İkinci panel</Tab>
      <Tab id="third" label="Üçüncü" title="Son sekme">Üçüncü panel</Tab>
    </Tabs>
  </div>
}
