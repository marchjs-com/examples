// AvatarGroupLab: the full-featured AvatarGroup example; it uses every prop at least once.
//
// Props shown here: names (a name or { name, src }), max, size, label (text or a function), more (false or your own
// content), spacing, color, shape and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// AvatarGroupLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { AvatarGroup } from "march/ui"

export function AvatarGroupLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Overflow: five names but max={2}, so two avatars show and the rest collapse into a "+3" bubble. `label` is the
        group's accessible name for screen readers. class="lab-more" lets CSS or a test find this instance. */}
    <AvatarGroup class="lab-more" names={["A B", "C D", "E F", "G H", "I J"]} max={2} label="Ekip" />
    {/* more={false} hides the overflow bubble. shape="square", size="lg" and color="neutral" restyle every avatar in
        the group; initials are taken from the names. */}
    <AvatarGroup class="lab-nomore" names={["A B", "C D", "E F"]} max={1} more={false} shape="square" size="lg" color="neutral" />
    {/* names may mix plain strings and { name, src } objects (an image with the name as fallback). spacing="gap"
        puts the avatars next to each other with a gap instead of overlapping. */}
    <AvatarGroup class="lab-gap" names={[{ name: "Deniz", src: "/media/social/sea.svg" }, "Elif"]} spacing="gap" />
  </div>
}
