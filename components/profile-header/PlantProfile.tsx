// PlantProfile: the creative-minimal ProfileHeader example.
//
// What it shows: a house plant's profile. Following it makes the follower count roll up, and the three stats are
// renamed to "Leaf / Fan / Sun" with `labels`. When to use this pattern: the smallest useful profile header, with
// only the follow state and a few renamed texts.
//
// Animation: the follow button's morph and the rolling counts run on the motion engine (reduced motion, global
// speed and "Stop all" apply). Accessibility: a section named "Profile of ..." with the name as its heading.

import { ProfileHeader, type FollowState } from "march/ui"

// A tiny 2x2 PNG data URI used as the cover photo.
const LEAF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mPY/f2C0tE4BrFUE5FgXQAtngULJa1nqAAAAABJRU5ErkJggg=="

export function PlantProfile() {
  // The follow state; onFollow below stores the next one.
  let $follow: FollowState = "follow"
  // - cover="sm": a short cover band (none, sm, md or lg).
  // - user.story: the story state of the avatar ring (here "new").
  // - labels: renames the stats; the keys are posts, followers and following, the values are your texts.
  return <ProfileHeader follow={$follow} onFollow={(s) => $follow = s} cover="sm"
    user={{ name: "Fesleğen 🌿", handle: "feslegen.balkon", cover: LEAF, bio: "Balkonda yaşıyorum. Sabah güneşi severim, akşam sulanırım.",
      posts: 42, followers: 318, following: 1, story: "new" }}
    labels={{ posts: "Yaprak", followers: "Hayran", following: "Güneş" }} />
}
