// TabsLab: the full-featured Tabs example.
//
// What it shows: every Tabs option: tabs as data (id, label, badge, disabled, hidden, icon, title, closable, dirty,
// content), value, onChange and setValue (bind:value), query, class, <Tab> children, panel, actions, indicator, motion (a
// built-in name or your own function), label, variant, activation, onClose, closeIcon, labels (close, dirty) and tabProps.
// Three Tabs: the first with most options, the second a bare "pill" strip, the third built from <Tab> children.
// Use it as a catalogue: copy the prop you need.
//
// Animation: by default the panel rises in once. `motion` picks "none", "fade", "rise" or "slide", or your own function
// (the third Tabs uses `swing`, defined below, which receives the panel element and the direction). `indicator={false}`
// removes the underline of the active tab. Under reduced motion the panel switches without motion.
// Accessibility: role="tablist" with role="tab" buttons and one role="tabpanel" labelled by the active tab. Only the active
// tab is a Tab stop; the arrow keys, Home and End move between tabs (mirrored in RTL), and with activation="manual" they only
// move focus while Enter / Space select. Disabled tabs are skipped; the close mark is hidden from assistive technology, so
// the Delete key is the keyboard way to close a closable tab.
import { Tabs, Tab, IconButton } from "march/ui"
import { animate } from "march/motion"
import { home, users, creditCard, edit, eye } from "march/icons"

export function TabsLab() {
  // Reactive state: the active tab of the first Tabs, the size chosen in the second, the badge number, whether the hidden
  // draft tab is shown, and the ids of the tabs the user closed.
  let $tab = "home"
  let $size = "md"
  let $team = 3
  let $showDraft = false
  let $closed: string[] = []
  // Your own panel motion: a function that gets the panel element and the direction (1 or -1, from which side the new tab
  // is). The panel grows in from that side, using the motion engine's animate().
  const swing = (panel: HTMLElement, dir: 1 | -1) => animate(panel, [{ opacity: 0, transform: `translateX(${dir * 16}px) scale(.96)` }, { opacity: 1, transform: "none" }], { duration: 240 })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* First Tabs. value + onChange: controlled (the id of the chosen tab). activation="manual": the arrow keys only move
        focus. motion="fade": a built-in panel motion. onClose is called by the close mark of a closable tab and by Delete;
        we only record it and hide the tab. closeIcon is our own mark. labels: the close mark's tooltip and the accessible
        name of the "changed" dot. tabProps adds attributes to each tab button (the tests use data-lab). actions: content at
        the end of the bar, outside the tab list (a button toggling the hidden tab). */}
    <Tabs class="lab-tabs" label="Lab sekmeleri" value={$tab} onChange={(id: string) => $tab = id} activation="manual" motion="fade"
      onClose={(id: string) => $closed = [...$closed, id]} closeIcon="✕" labels={{ close: "Sekmeyi kapat", dirty: "kaydedilmedi" }}
      tabProps={(t: { id: string }) => ({ "data-lab": t.id })}
      actions={<IconButton icon={eye} label={$showDraft ? "Taslağı gizle" : "Taslağı göster"} size="sm" pressed={$showDraft} on:click={() => $showDraft = !$showDraft} />}
      tabs={[
        // id and label are required; icon sits before the label; content is a function (built when the tab is active).
        { id: "home", label: "Özet", icon: home, content: () => <p>Seçili: {$tab}</p> },
        // badge shows a count in the tab (a function keeps it live).
        { id: "team", label: "Ekip", icon: users, badge: () => $team, content: () => <p>Seçili: {$tab} · {$team} kişi</p> },
        // disabled makes the tab unavailable; title is its tooltip (here the reason). content may also be plain text.
        { id: "billing", label: "Ödeme", icon: creditCard, disabled: true, title: "Planınızda yok", content: "Ödeme" },
        // hidden (a function) hides the tab; closable shows the close mark; dirty shows the "changed" dot.
        { id: "draft", label: "Taslak", icon: edit, hidden: () => !$showDraft || $closed.includes("draft"), closable: true, dirty: true, content: () => <p>Seçili: {$tab}</p> },
      ]} />
    {/* Second Tabs. variant="pill": a rounded switch. indicator={false}: no underline. panel={false}: only the strip is
        drawn (the panel would live elsewhere). bind:value keeps the choice in $size. */}
    <Tabs class="lab-tabs2" label="Boyut" variant="pill" indicator={false} panel={false} bind:value={$size} tabs={[
      { id: "sm", label: "Küçük" }, { id: "md", label: "Orta" }, { id: "lg", label: "Büyük" },
    ]} />
    <span sx={{ text: "sm", color: "muted" }}>Boyut: {$size}</span>
    {/* Third Tabs, written with <Tab> children instead of a `tabs` array: each <Tab> has an id, a label and its panel as
        children. query keeps the active tab in the URL (?lab-sekme=id), so a reload or a shared link opens it. motion
        takes our own function here. */}
    <Tabs class="lab-tabs3" label="Alt çizgisiz" indicator={false} query="lab-sekme" motion={swing}>
      <Tab id="first" label="Birinci">Birinci panel</Tab>
      <Tab id="second" label="İkinci">İkinci panel</Tab>
      <Tab id="third" label="Üçüncü" title="Son sekme">Üçüncü panel</Tab>
    </Tabs>
  </div>
}
