// AvatarLab: the full-featured Avatar example; it uses every prop at least once.
//
// Props shown here: name, src, size, text, icon, color, shape, label, decorative, loading, class and children.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// AvatarLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Avatar, Badge } from "march/ui"
import { user } from "march/icons"

export function AvatarLab() {
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    {/* Name only: no image, so the initials ("EA") are drawn on a colour taken from the name (the same person always
        gets the same colour). The name is also the accessible name. size goes from xs to xl. */}
    <Avatar class="lab-initials" name="Elif Arslan" size="xl" />
    {/* text replaces the initials with ready text; color picks one fixed theme colour; shape="square" instead of the
        round default. */}
    <Avatar class="lab-text" text="?" color="brand-orange" shape="square" size="lg" />
    {/* icon is drawn when there is no image; with no name, `label` gives the accessible name. */}
    <Avatar class="lab-icon" icon={user} label="Bilinmeyen kişi" color="neutral" />
    {/* src is the picture (if it fails to load, the initials appear); loading="lazy" delays loading until needed. */}
    <Avatar class="lab-src" name="Deniz" src="/media/social/sea.svg" loading="lazy" size="sm" />
    {/* decorative hides the avatar from screen readers: use it when the name is written right beside it. */}
    <Avatar class="lab-deco" name="Süs" decorative size="xs" />
    {/* Children replace the image / initials with your own content (here a Badge). */}
    <Avatar class="lab-kids" name="Can Demir"><Badge>3</Badge></Avatar>
  </div>
}
