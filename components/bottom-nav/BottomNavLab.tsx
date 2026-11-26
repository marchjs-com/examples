// BottomNavLab: the full-featured BottomNav example; it uses every prop at least once.
//
// Props shown here: items (id, label, icon, activeIcon, badge, dot, color, href), value, onChange, the Create button
// (onCreate, createIcon, createLabel, ring), the Create menu (createActions, createMenu, createTitle, createHandle,
// onAction), bubble, motion, labels, variant, tint, label and class. The buttons above the bar change the live ones.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BottomNavLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { BottomNav, OverlayScope, Button, Badge } from "march/ui"
import { home, compass, calendar, bell, user, sparkles, image, film, radio, barChart } from "march/icons"

// The three looks of the Create menu: round buttons on an arc, pills above the button, or a list from the bottom.
const LOOKS = ["fan", "stack", "sheet"] as const

export function BottomNavLab() {
  // The active tab id, the alert count, the index of the menu look, and two switches (flat bar, quiet bar), plus a
  // log line the callbacks write to. Plain `let $x` variables are reactive state.
  let $tab = "home"
  let $alerts = 120
  let $look = 0
  let $flat = false
  let $quiet = false
  let $log = "-"
  // OverlayScope keeps the Create menu (a layer above the page) inside this box instead of the whole screen, which is
  // what you want in a demo or a phone preview.
  return <OverlayScope sx={{ flex: "col", gap: 3, p: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $look = ($look + 1) % LOOKS.length}>{`Menü: ${LOOKS[$look]}`}</Button>
      <Button size="sm" variant="ghost" on:click={() => $flat = !$flat}>{$flat ? "Yüzen" : "Düz"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $quiet = !$quiet}>{$quiet ? "Sesli" : "Sade"}</Button>
      <Badge tone="primary">{`Sekme: ${$tab}`}</Badge>
      <span sx={{ text: "xs", color: "muted" }}>{$log}</span>
    </div>
    {/* The bar:
        - class="lab-bnav": added to the root. label: the name of the navigation landmark for screen readers.
        - value (a function, so it stays live) + onChange: the active tab; the alerts tab also clears its badge.
        - onCreate: the Create button's action. With a menu (createActions) it runs on a long press instead.
        - createLabel / createIcon: the Create button's accessible name and its icon. ring: the colours of the ring
          that turns around it (ring={false} would remove it).
        - createActions: the menu entries { id, label, icon, desc, color, badge, disabled, run }. `disabled` greys one
          out; `run` is that entry's own handler (it runs before onAction). onAction gets the id of the chosen entry.
        - createMenu: "fan", "stack" or "sheet" (a function here, so the button above switches it live).
          createTitle: the menu's name, used as the heading of the sheet; createHandle={false} hides the grab handle.
        - bubble / motion / labels / variant / tint are given as functions so the buttons above flip them
          live (the quiet and flat buttons): bubble is the coloured bubble behind the active tab, motion={false} switches off the bar's own
          animation (the bubble slide, the icon pop, the turning ring and the menu fly-out; when it is on, it follows
          reduced motion and the global speed / "Stop all" settings), labels hides the text under the icons (they stay
          the accessible names), variant is "floating" or "flat" (edge to edge), tint is "brand" (each tab its own
          colour) or "accent" (one colour).
        Items: activeIcon replaces the icon of the active tab; badge is a count (a function stays live; 0 hides it and
        120 reads "99+"); dot is a small "something new" mark; color tints the tab; href makes a tab a real link. */}
    <BottomNav class="lab-bnav" label="Laboratuvar sekmeleri" value={() => $tab} onChange={(id) => { $tab = id; if (id === "alerts") $alerts = 0 }}
      onCreate={() => $log = "onCreate (uzun basış)"} createLabel="Yeni ekle" createIcon={sparkles} ring={["brand-pink", "brand-gold", "#22c55e"]}
      createActions={[
        { id: "post", label: "Gönderi", icon: image, desc: "Fotoğraf ya da yazı", color: "brand-orange" },
        { id: "story", label: "Hikâye", icon: film, badge: "yeni" },
        { id: "live", label: "Canlı", icon: radio, disabled: true },
        { id: "poll", label: "Anket", icon: barChart, run: () => $log = "anketin kendi run'ı" },
      ]}
      createMenu={() => LOOKS[$look]} createTitle="Ne paylaşalım?" createHandle={false} onAction={(id) => $log = `onAction: ${id}`}
      bubble={() => !$quiet} motion={() => !$quiet} labels={() => !$quiet} variant={() => ($flat ? "flat" : "floating")} tint={() => ($quiet ? "accent" : "brand")}
      items={[
        { id: "home", label: "Akış", icon: home, color: "brand-blue" },
        { id: "explore", label: "Keşfet", icon: compass, activeIcon: sparkles },
        { id: "events", label: "Takvim", icon: calendar, href: "#takvim" },
        { id: "alerts", label: "Bildirimler", icon: bell, badge: () => $alerts },
        { id: "me", label: "Profil", icon: user, dot: true, color: "brand-purple" },
      ]} />
  </OverlayScope>
}
