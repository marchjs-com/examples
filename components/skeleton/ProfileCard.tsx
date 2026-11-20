import { Skeleton, Card, Avatar } from "march/ui"

// bir profil kartı yüklenirken: avatarın yerinde daire, adın ve biyografinin yerinde satırlar; veri gelince düzen zıplamaz
export function ProfileCard() {
  let $user: { name: string; bio: string } | null = null
  setTimeout(() => { $user = { name: "Ayşe Yılmaz", bio: "Ürün tasarımcısı · İstanbul · kahve ve bisiklet" } }, 1500)
  return <Card>
    {() => $user
      ? <div sx={{ flex: ["row", "center"], gap: 3 }}>
          <Avatar name={$user.name} size="lg" />
          <div sx={{ flex: "col", gap: 1 }}><b>{$user.name}</b><span sx={{ color: "muted" }}>{$user.bio}</span></div>
        </div>
      : <div sx={{ flex: ["row", "center"], gap: 3 }}>
          <Skeleton shape="circle" height="lg" />
          <div sx={{ flex: "col", gap: 1, w: "full" }}><Skeleton lines={2} label="Profil yükleniyor" /></div>
        </div>}
  </Card>
}
