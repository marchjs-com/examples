// ClubProfile: the real-life ProfileHeader example.
//
// What it shows: the top of a club's profile page: a cover photo, a verified name, a bio, three stats as buttons, a
// follow button whose state also moves the follower count, a message button and a "..." menu.
// When to use this pattern: the top of any profile page; each callback is where your app opens a list, a chat or
// the stories (here a toast stands in).
//
// Accessibility: a section named after the profile with the name as its heading; the avatar ring, stats, follow and
// message are buttons with names; the cover is decorative. Animation: the follow button's morph and the rolling
// counts run on the motion engine (reduced motion, global speed and "Stop all" apply).

import { ProfileHeader, toast, type FollowState } from "march/ui"
import { link, flag } from "march/icons"

// A tiny 2x2 PNG data URI used as the cover photo (the browser blurs its four pixels softly).
const SEA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mOw2PuDb+lLBlm/Gz+LxQAthgZP+C/XcgAAAABJRU5ErkJggg=="
// Names of the three lists a stat opens; used to build the toast text.
const LISTS = { posts: "Gönderiler", followers: "Takipçiler", following: "Takip edilenler" }

export function ClubProfile() {
  // The follow state ("follow" at first). onFollow gives the next state, and the follower count rolls with it.
  let $follow: FollowState = "follow"
  // - follow / onFollow(state): the FollowButton's state and its change; the header adds you to the follower count
  //   while following.
  // - onMessage, onStat(which), onAvatar: the message button, the stats (giving it makes them buttons) and the
  //   avatar ring (opens the stories); menu: items of the "..." menu (danger styles the report item).
  // - user: name, handle, verified, story (the avatar ring's state), cover (a photo), bio and the three counts.
  return <ProfileHeader follow={$follow} onFollow={(s) => { $follow = s; if (s === "following") toast("Kulübü takip ediyorsun") }}
    onMessage={() => toast("Sohbet açılır")} onStat={(w) => toast(`${LISTS[w]} listesi açılır`)} onAvatar={() => toast("Hikâyeler açılır")}
    menu={[{ label: "Bağlantıyı kopyala", icon: link, onSelect: () => toast("Kopyalandı") }, { label: "Bildir", icon: flag, danger: true, onSelect: () => toast("Bildirildi") }]}
    user={{ name: "HADİ Koşu Kulübü", handle: "hadi.kosu", verified: true, story: "new", cover: SEA,
      bio: "Her pazar sabahı sahilde koşuyoruz. Tempo grupları, yeni başlayanlar için yürüyüş ve dönüşte kahve ☕",
      posts: 248, followers: 986, following: 186 }} />
}
