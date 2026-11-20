import { ProfileHeader, type FollowState } from "march/ui"

// bir saksı bitkisinin profili: takip edince takipçi sayısı döner; istatistikler "Yaprak / Hayran / Güneş"
const LEAF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mPY/f2C0tE4BrFUE5FgXQAtngULJa1nqAAAAABJRU5ErkJggg=="

export function PlantProfile() {
  let $follow: FollowState = "follow"
  return <ProfileHeader follow={$follow} onFollow={(s) => $follow = s} cover="sm"
    user={{ name: "Fesleğen 🌿", handle: "feslegen.balkon", cover: LEAF, bio: "Balkonda yaşıyorum. Sabah güneşi severim, akşam sulanırım.",
      posts: 42, followers: 318, following: 1, story: "new" }}
    labels={{ posts: "Yaprak", followers: "Hayran", following: "Güneş" }} />
}
