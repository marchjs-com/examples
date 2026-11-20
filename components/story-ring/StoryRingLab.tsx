import { StoryRing, Avatar } from "march/ui"
import { camera } from "march/icons/lucide"

// StoryRing'in özellikleri: name, src, state, size, label, add, loading, onClick, ariaLabel, addIcon, avatar, class
export function StoryRingLab() {
  let $clicks = 0
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <StoryRing class="lab-btn" name="Elif" src="/media/social/sunset.svg" state="new" size="lg" label="elif" ariaLabel="Elif'in hikâyesi"
      loading={false} onClick={() => $clicks++} />
    {/* addIcon: + rozetinde kendi ikonun (burada kamera) */}
    <StoryRing class="lab-img" name="Can" state="none" add addIcon={camera} avatar={<Avatar name="Can" color="brand-blue" />} />
    <span class="lab-clicks">{$clicks}</span>
  </div>
}
