import { BottomNav, OverlayScope, toast } from "march/ui"
import { home, compass, message, user, image, film, radio } from "march/icons"

// bir sosyal uygulamanın alt çubuğu: okunmamış sohbet sayısı, profilde yeni şey noktası, ortada Oluştur menüsü
// (uzun basış doğrudan gönderi açar); menü telefon çerçevesinin içinde açılır (OverlayScope)
export function SocialTabs() {
  let $tab = "home"
  let $unread = 4
  let $news = true
  const titles: Record<string, string> = { home: "Akış", explore: "Keşfet", chat: "Sohbet", me: "Profil" }
  const open = (id: string) => { $tab = id; if (id === "chat") $unread = 0; if (id === "me") $news = false }
  // telefon boyunda bir çerçeve: alt çubuk ve menü onun içinde yer alır
  return <div sx={{ w: "sm", flex: "col" }} style={{ "block-size": "26rem" }}>
    <OverlayScope sx={{ flex: ["col", "between", "grow"], p: 2, gap: 3, radius: 4, shadow: 2 }}>
      <h3 sx={{ text: ["lg", "center"] }}>{titles[$tab]}</h3>
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
