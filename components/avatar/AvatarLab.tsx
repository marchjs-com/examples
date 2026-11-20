import { Avatar, Badge } from "march/ui"
import { user } from "march/icons"

// Avatar'ın özellikleri: name, src, size, text, icon, color, shape, label, decorative, loading, class ve içerik
export function AvatarLab() {
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
    <Avatar class="lab-initials" name="Elif Arslan" size="xl" />
    <Avatar class="lab-text" text="?" color="brand-orange" shape="square" size="lg" />
    <Avatar class="lab-icon" icon={user} label="Bilinmeyen kişi" color="neutral" />
    <Avatar class="lab-src" name="Deniz" src="/media/social/sea.svg" loading="lazy" size="sm" />
    <Avatar class="lab-deco" name="Süs" decorative size="xs" />
    <Avatar class="lab-kids" name="Can Demir"><Badge>3</Badge></Avatar>
  </div>
}
