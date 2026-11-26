// StoryRingLab: the full-featured StoryRing example.
//
// What it shows: every StoryRing option across two rings: name, src, state, size, label, add, loading, onClick,
// ariaLabel, addIcon, avatar and class. The first is a clickable ring with a photo, a label and its own accessible
// name; the second is a non-clickable ring with no story state, our own avatar and a camera badge.
//
// Animation: while `loading` is true the ring turns on March's motion engine, so the global speed, "Stop all" and the
// visitor's reduced-motion preference apply. It is set to false here, so nothing moves.
// Accessibility: with `onClick` the ring is a button named by `ariaLabel` (without it: the name and the state); without
// `onClick` it is an image (role="img"). The ring and the badge are decoration.
import { StoryRing, Avatar } from "march/ui"
import { camera } from "march/icons/lucide"

export function StoryRingLab() {
  // Reactive state: how many times the clickable ring was pressed.
  let $clicks = 0
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    {/* name: initials and the accessible name when there is no ariaLabel. src: the photo. state: "new" is the colourful
        ring (the others are "seen", "close" and "none"). size: "lg" is 88 px. label: the text under the ring. ariaLabel
        replaces the default accessible name. loading: turns the ring (off here). onClick makes the ring a button. */}
    <StoryRing class="lab-btn" name="Elif" src="/media/social/sunset.svg" state="new" size="lg" label="elif" ariaLabel="Elif'in hikâyesi"
      loading={false} onClick={() => $clicks++} />
    {/* addIcon: your own icon in the "+" badge (here a camera). state="none" has no ring; add shows the badge; avatar
        replaces what is drawn inside the ring with our own node (here an Avatar). Without onClick this ring is an image. */}
    <StoryRing class="lab-img" name="Can" state="none" add addIcon={camera} avatar={<Avatar name="Can" color="brand-blue" />} />
    <span class="lab-clicks">{$clicks}</span>
  </div>
}
