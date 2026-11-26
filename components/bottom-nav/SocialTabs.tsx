// SocialTabs: the real-life BottomNav example.
//
// The bottom bar of a social app: an unread-chat count, a "something new" dot on the profile, and a Create button in
// the middle that opens a menu (a long press runs the main action directly). The menu opens inside a phone-sized frame
// (OverlayScope), not over the whole page. Use this pattern for the main navigation of a mobile-style app.
import { BottomNav, OverlayScope, toast } from "march/ui"
import { home, compass, message, user, image, film, radio } from "march/icons"

export function SocialTabs() {
  // The active tab, the unread chat count and whether the profile has news (reactive state).
  let $tab = "home"
  let $unread = 4
  let $news = true
  // The page title for each tab. Opening a tab also "reads" what it holds: the chat tab clears its count and the
  // profile tab clears its dot.
  const titles: Record<string, string> = { home: "Akış", explore: "Keşfet", chat: "Sohbet", me: "Profil" }
  const open = (id: string) => { $tab = id; if (id === "chat") $unread = 0; if (id === "me") $news = false }
  // A phone-sized frame (a fixed block size, a small width): the bar and the menu live inside it. OverlayScope keeps
  // the Create menu, which is a layer above the page, within this box.
  return <div sx={{ w: "sm", flex: "col" }} style={{ "block-size": "26rem" }}>
    <OverlayScope sx={{ flex: ["col", "between", "grow"], p: 2, gap: 3, radius: 4, shadow: 2 }}>
      <h3 sx={{ text: ["lg", "center"] }}>{titles[$tab]}</h3>
      {/* value + onChange: the active tab (open also clears the badges).
          onCreate: runs on a long press of the Create button, because createActions is set (a normal press opens the
          menu). createTitle names the menu. createActions: the menu entries; `desc` is a second line of text, and
          `run` is an entry's own handler. onAction then receives the chosen id (after `run`), so here it only
          handles the entries that have no `run`.
          Items: badge as a function stays live (0 hides it), dot as a function shows or hides the "new" mark.
          The menu is a role="menu": focus moves into it, arrow keys move, Escape closes it and returns focus to the
          Create button. */}
      <BottomNav value={$tab} onChange={open} onCreate={() => toast("Yeni gönderi")} createTitle="Oluştur"
        createActions={[
          { id: "post", label: "Gönderi", icon: image, run: () => toast("Gönderi taslağı açıldı") },
          { id: "story", label: "Hikâye", icon: film, desc: "24 saat görünür" },
          { id: "live", label: "Canlı yayın", icon: radio, desc: "Takipçilerine bildirim gider" },
        ]}
        onAction={(id) => { if (id !== "post") toast(`${id === "story" ? "Hikâye" : "Canlı yayın"} başlıyor`) }}
        items={[
          { id: "home", label: "Akış", icon: home },
          { id: "explore", label: "Keşfet", icon: compass },
          { id: "chat", label: "Sohbet", icon: message, badge: () => $unread },
          { id: "me", label: "Profil", icon: user, dot: () => $news },
        ]} />
    </OverlayScope>
  </div>
}
