import { ProfileHeader, toast, type FollowState } from "march/ui"
import { link, flag } from "march/icons"

// bir kulübün profil sayfasının üstü: takip et (sayaç birlikte değişir), mesaj, istatistik listeleri, hikâyeler ve
// ⋯ menüsünde bağlantıyı kopyala ve bildir
const SEA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mOw2PuDb+lLBlm/Gz+LxQAthgZP+C/XcgAAAABJRU5ErkJggg=="
const LISTS = { posts: "Gönderiler", followers: "Takipçiler", following: "Takip edilenler" }

export function ClubProfile() {
  let $follow: FollowState = "follow"
  return <ProfileHeader follow={$follow} onFollow={(s) => { $follow = s; if (s === "following") toast("Kulübü takip ediyorsun") }}
    onMessage={() => toast("Sohbet açılır")} onStat={(w) => toast(`${LISTS[w]} listesi açılır`)} onAvatar={() => toast("Hikâyeler açılır")}
    menu={[{ label: "Bağlantıyı kopyala", icon: link, onSelect: () => toast("Kopyalandı") }, { label: "Bildir", icon: flag, danger: true, onSelect: () => toast("Bildirildi") }]}
    user={{ name: "HADİ Koşu Kulübü", handle: "hadi.kosu", verified: true, story: "new", cover: SEA,
      bio: "Her pazar sabahı sahilde koşuyoruz. Tempo grupları, yeni başlayanlar için yürüyüş ve dönüşte kahve ☕",
      posts: 248, followers: 986, following: 186 }} />
}
