import { ProfileHeader, Button, Badge, Card, type FollowState, type ProfileUser } from "march/ui"
import { send, settings, star, badgeCheck } from "march/icons"

// ProfileHeader'ın bütün özellikleri: profil (erişimci), kendi profilim (self), takip durumu ve onFollow, mesaj,
// düzenle, istatistik ve avatar olayları, ⋯ menüsü, kapak boyu, kendi metinler, istatistik seçimi, kendi ikonlar,
// mesaj düğmesi rengi ve sınıf; altta koyu zeminde sade bir ikinci başlık
const DAWN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mP4+6zr9yQbhuXdvwz1GgE6ZgdD1tcTigAAAABJRU5ErkJggg=="

export function ProfileHeaderLab() {
  let $self = false
  let $follow: FollowState = "follow"
  let $cover: "sm" | "md" | "lg" | "none" = "md"
  let $log = "-"
  const user = (): ProfileUser => ({ name: "Ece Yıldız", handle: "ece", verified: true, story: "seen", cover: DAWN, private: false,
    bio: "Fotoğraf, bisiklet ve iyi kahve.", posts: 57, followers: 1204, following: 310 })
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $self = !$self}>{$self ? "Başkasının profili" : "Kendi profilim"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $cover = $cover === "md" ? "lg" : $cover === "lg" ? "none" : "md"}>{`Kapak: ${$cover}`}</Button>
      <Badge tone="primary">{$log}</Badge>
    </div>
    <ProfileHeader class="lab-profile" user={user} self={() => $self} follow={() => $follow} cover={() => $cover}
      onFollow={(s) => { $follow = s; $log = `takip: ${s}` }} onMessage={() => $log = "mesaj"} onEdit={() => $log = "düzenle"}
      onStat={(w) => $log = `liste: ${w}`} onAvatar={() => $log = "hikâyeler"}
      menu={[{ label: "Profili paylaş", icon: star, onSelect: () => $log = "paylaşıldı" }]}
      labels={{ profile: (n) => `${n} profili`, edit: "Profili düzenle", message: "Mesaj at", more: "Daha fazla", verified: "Onaylı",
        posts: "Gönderi", followers: "Takipçi", following: "Takip" }}
      stats={["followers", "posts"]} verifiedIcon={badgeCheck} messageIcon={send} menuIcon={settings} messageColor="brand-blue" />
    <Card m:theme="night">
      <ProfileHeader user={{ name: "Gizli Hesap", private: true }} cover="none" stats={false} verifiedIcon={false} messageIcon={false} onMessage={() => $log = "gizli hesaba mesaj"} />
    </Card>
  </div>
}
