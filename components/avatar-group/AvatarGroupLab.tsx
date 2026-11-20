import { AvatarGroup } from "march/ui"

// AvatarGroup'un özellikleri: names (ad ya da { name, src }), max, size, label (metin ya da işlev), more (false ya da
// kendi içeriğin), spacing, color, shape, class
export function AvatarGroupLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <AvatarGroup class="lab-more" names={["A B", "C D", "E F", "G H", "I J"]} max={2} label="Ekip" />
    <AvatarGroup class="lab-nomore" names={["A B", "C D", "E F"]} max={1} more={false} shape="square" size="lg" color="neutral" />
    <AvatarGroup class="lab-gap" names={[{ name: "Deniz", src: "/media/social/sea.svg" }, "Elif"]} spacing="gap" />
  </div>
}
