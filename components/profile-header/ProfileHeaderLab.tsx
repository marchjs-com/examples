// ProfileHeaderLab: the full-featured ProfileHeader example; it uses every prop at least once.
//
// Props shown here: user (as an accessor), self, follow and onFollow, onMessage, onEdit, onStat, onAvatar, menu,
// cover, labels, stats, verifiedIcon / messageIcon / menuIcon, messageColor and class; below it a plain second
// header on a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ProfileHeaderLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ProfileHeader, Button, Badge, Card, type FollowState, type ProfileUser } from "march/ui"
import { send, settings, star, badgeCheck } from "march/icons"

// A tiny 2x2 PNG data URI used as the cover photo.
const DAWN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mP4+6zr9yQbhuXdvwz1GgE6ZgdD1tcTigAAAABJRU5ErkJggg=="

export function ProfileHeaderLab() {
  // Whether this is the viewer's own profile (shows Edit instead of follow / message).
  let $self = false
  // The follow state (follow, following, ...), changed by onFollow.
  let $follow: FollowState = "follow"
  // The cover height: none, sm, md or lg.
  let $cover: "sm" | "md" | "lg" | "none" = "md"
  // The last action as text, so you can see each callback fire.
  let $log = "-"
  // The profile data, as a function so it can be handed over as an accessor.
  const user = (): ProfileUser => ({ name: "Ece Yıldız", handle: "ece", verified: true, story: "seen", cover: DAWN, private: false,
    bio: "Fotoğraf, bisiklet ve iyi kahve.", posts: 57, followers: 1204, following: 310 })
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* Buttons of the Lab: toggle self, cycle the cover height, and a badge with the last action. */}
      <Button size="sm" variant="ghost" on:click={() => $self = !$self}>{$self ? "Başkasının profili" : "Kendi profilim"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $cover = $cover === "md" ? "lg" : $cover === "lg" ? "none" : "md"}>{`Kapak: ${$cover}`}</Button>
      <Badge tone="primary">{$log}</Badge>
    </div>
    {/* The first header uses every prop:
        - user, self, follow, cover as accessors, so the header reads the latest values.
        - onFollow(state), onMessage, onEdit, onStat(which), onAvatar: the callbacks; onStat makes the stats buttons and
          onAvatar makes the avatar ring open the stories.
        - menu: items of the "..." menu.
        - labels: every text the header writes itself (profile is a function of the name).
        - stats: which counts to show, in what order; verifiedIcon, messageIcon, menuIcon: your own marks;
          messageColor: colour token of the message button; class: on the section (the tests use it). */}
    <ProfileHeader class="lab-profile" user={user} self={() => $self} follow={() => $follow} cover={() => $cover}
      onFollow={(s) => { $follow = s; $log = `takip: ${s}` }} onMessage={() => $log = "mesaj"} onEdit={() => $log = "düzenle"}
      onStat={(w) => $log = `liste: ${w}`} onAvatar={() => $log = "hikâyeler"}
      menu={[{ label: "Profili paylaş", icon: star, onSelect: () => $log = "paylaşıldı" }]}
      labels={{ profile: (n) => `${n} profili`, edit: "Profili düzenle", message: "Mesaj at", more: "Daha fazla", verified: "Onaylı",
        posts: "Gönderi", followers: "Takipçi", following: "Takip" }}
      stats={["followers", "posts"]} verifiedIcon={badgeCheck} messageIcon={send} menuIcon={settings} messageColor="brand-blue" />
    {/* A plain header on a dark surface (m:theme="night" works on every component): private account, no cover, no
        stats,
        no verified mark and no message icon. */}
    <Card m:theme="night">
      <ProfileHeader user={{ name: "Gizli Hesap", private: true }} cover="none" stats={false} verifiedIcon={false} messageIcon={false} onMessage={() => $log = "gizli hesaba mesaj"} />
    </Card>
  </div>
}
