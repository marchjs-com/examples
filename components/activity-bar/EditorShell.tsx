// EditorShell: the real-life ActivityBar example.
//
// It models the edge of a code editor: a vertical icon rail that switches the side panel. Pressing the active icon
// again collapses the panel (the default `collapsible` behaviour), and the badge on "Kaynak denetimi" shows the number
// of pending changes; the send button clears them. Use this pattern for any app with a few top-level views that
// share one content area (IDEs, admin tools, mail clients).
import { ActivityBar, Card, Button, toast } from "march/ui"
import { files, search, gitBranch, settings, send } from "march/icons"

// The file names shown in the "Dosyalar" view. A constant outside the component: it never changes, so it needs no state.
const FILES = ["App.tsx", "router.ts", "theme.css"]

// One view of the side panel: a Card with a title around whatever the view shows. A tiny local component keeps the
// three views below short and identical in structure.
const Side = (props: { title: string; children?: unknown }) => <Card title={props.title}>{props.children}</Card>

export function EditorShell() {
  // $view is the selected view id; null means the bar collapsed the panel. $changes is the pending-change count.
  let $view: string | null = "files"
  let $changes = 3
  return <div sx={{ flex: "row", gap: 2 }}>
    {/* The rail. `controls="editor-side"` links every tab to the panel below (aria-controls), `label` names the
        tablist for screen readers, and value/onChange bind the selection to $view.
        - badge as a function (() => $changes) stays live, so the number follows the count and shows nothing once the
          changes are sent.
        - position: "end" + onSelect makes "Ayarlar" an action pinned to the bottom: it fires a toast and is never
          selected, so it does not replace the panel. */}
    <ActivityBar label="Editör görünümleri" controls="editor-side" value={$view} onChange={(id: string) => $view = id} items={[
      { id: "files", label: "Dosyalar", icon: files },
      { id: "search", label: "Ara", icon: search },
      { id: "git", label: "Kaynak denetimi", icon: gitBranch, badge: () => $changes },
      { id: "settings", label: "Ayarlar", icon: settings, position: "end", onSelect: () => toast("Ayarlar açıldı") },
    ]} />
    {/* The panel (id matches `controls`). The function child redraws it whenever $view changes. The last branch is
        the "collapsed" state: when the bar sets $view to null, the user gets a hint instead of an empty area. */}
    <div id="editor-side" role="tabpanel" sx={{ flex: "grow" }}>
      {() => $view === "files" ? <Side title="Dosyalar">{FILES.map((f) => <div sx={{ p: 1 }}>📄 {f}</div>)}</Side>
        : $view === "search" ? <Side title="Ara"><span sx={{ color: "muted" }}>Projede bir sözcük ara…</span></Side>
        : $view === "git" ? <Side title="Kaynak denetimi">
            <div sx={{ flex: "col", gap: 2 }}>
              <span>{$changes ? `${$changes} değişiklik gönderilmeyi bekliyor` : "Her şey gönderildi"}</span>
              {/* Disabled when there is nothing to send, so the button cannot be pressed with an empty list. */}
              <Button size="sm" variant="primary" icon={send} disabled={!$changes} on:click={() => { $changes = 0; toast("Değişiklikler gönderildi") }}>Gönder</Button>
            </div>
          </Side>
        : <span sx={{ color: "muted" }}>Yan panel kapalı: bir simgeye bas.</span>}
    </div>
  </div>
}
