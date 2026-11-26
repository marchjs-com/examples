// ActivityBarLab: the full-featured ActivityBar example; it uses every prop at least once.
//
// Props shown here: items (id, label, short, icon, badge, position, shortcut, onSelect, children), value, onChange,
// collapsible, orientation, controls, label, indicator, motion, tooltips, showLabels, glass, subItems, subValue,
// onSubSelect, class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ActivityBarLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ActivityBar, Button } from "march/ui"
import { files, search, gitBranch, settings, fileText, clock, star, inbox, send, edit } from "march/icons"

export function ActivityBarLab() {
  // The selected view id (null means "nothing selected": the side panel is collapsed), the selected sub page, a badge
  // count, how often the action item ran, the selected mailbox and the orientation switch of the second bar.
  // Plain `let $x` variables are reactive state: every place that reads one redraws when it changes.
  let $view: string | null = "files"
  let $page = "open"
  let $hits = 7
  let $opened = 0
  let $box = "in"
  let $flat = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: "row", gap: 3 }}>
      {/* The first ActivityBar is a vertical icon rail, as in a code editor:
          - class="lab-ab": added to the root so your CSS or a test can find this instance.
          - m:color="brand-green": common prop; sets the colour token of the bar and everything inside it.
          - label: the accessible name of the tablist (screen readers announce it).
          - controls="lab-side": the id of the panel the bar switches; it becomes aria-controls on the tabs. The
            panel below carries that id and role="tabpanel".
          - motion="fade": how the selection indicator moves between items (the motion engine still honours reduced
            motion and the global speed / "Stop all" settings; indicator={false} on the second bar turns it off).
          - glass: frosted, translucent surface.
          - showLabels: draws the text under each icon (uses the item's `short` label when it has one).
          - tooltips={false}: no hover tooltips, since the labels are already visible.
          - subItems, subValue, onSubSelect: show the selected item's `children` as a second row; subValue says which
            child is current and onSubSelect reports a press on one.
          - value + onChange: controlled selection; here they are bound to the reactive $view.
          Items: `short` is the compact label, `badge` is a number or a function (a function stays live: the count
          follows $hits), `shortcut` documents a key combination (aria-keyshortcuts), and `position: "end"` pushes an
          item to the far end of the bar; with `onSelect` it acts as a button (opens settings) instead of a view. */}
      <ActivityBar class="lab-ab" m:color="brand-green" label="Lab görünümleri" controls="lab-side" motion="fade" glass
        showLabels tooltips={false} subItems subValue={$page} onSubSelect={(child: { id: string }) => $page = child.id}
        value={$view} onChange={(id: string) => $view = id} items={[
          { id: "files", label: "Dosyalar", short: "Dosya", icon: files, children: [
            { id: "open", label: "Açık dosyalar", short: "Açık", icon: fileText },
            { id: "recent", label: "Son kullanılanlar", short: "Son", icon: clock },
            { id: "starred", label: "Yıldızlılar", short: "Yıldız", icon: star },
          ] },
          { id: "search", label: "Ara", icon: search, badge: () => $hits },
          { id: "git", label: "Kaynak denetimi", short: "Kaynak", icon: gitBranch, shortcut: "mod+shift+g" },
          { id: "settings", label: "Ayarlar", icon: settings, position: "end", onSelect: () => $opened++ },
        ]} />
      {/* The panel the bar controls. Its id must match `controls`; role="tabpanel" tells assistive technology it is
          the content of the selected tab. It shows the selected view, or a hint when the bar collapsed it. */}
      <div id="lab-side" role="tabpanel" sx={{ flex: "col", gap: 1 }}>
        <strong>{$view ? `${$view} görünümü` : "Yan görünüm kapalı"}</strong>
        <span sx={{ text: "sm", color: "muted" }}>Alt sayfa: {$page} · Ayarlar {$opened} kez açıldı</span>
        <Button size="sm" variant="ghost" on:click={() => $hits = 0}>Sonuçları temizle</Button>
      </div>
    </div>
    <div sx={{ flex: "col", gap: 2 }}>
      {/* The second ActivityBar shows the "off" switches:
          - collapsible={false}: pressing the active item again keeps it selected (a plain segmented choice).
          - indicator={false}: no sliding selection mark.
          - orientation as a function: re-evaluated on every change, so the button below can flip the bar between
            horizontal and vertical live. A plain string ("horizontal") would be fixed.
          - onChange: `id ?? $box` keeps the old value if the bar ever reports null. */}
      <ActivityBar class="lab-ab2" label="Posta kutuları" collapsible={false} indicator={false} orientation={() => ($flat ? "horizontal" : "vertical")}
        value={$box} onChange={(id: string) => $box = id ?? $box} items={[
          { id: "in", label: "Gelen", icon: inbox, badge: 2 },
          { id: "out", label: "Giden", icon: send },
          { id: "draft", label: "Taslaklar", icon: edit },
        ]} />
      <Button size="sm" variant="ghost" on:click={() => $flat = !$flat}>Çubuğu döndür</Button>
    </div>
  </div>
}
