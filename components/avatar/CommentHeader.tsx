// CommentHeader: the real-life Avatar example.
//
// Three authors of a comment thread, one per case an Avatar has to handle: a user with a picture, a user whose picture
// fails to load (the initials appear instead), and a guest with no name (an icon). Use this pattern for comment lists,
// activity feeds and message headers.
import { Avatar } from "march/ui"

import { user } from "march/icons"

// One comment line: the avatar, then the author's name and the text. Taking the avatar as a prop keeps the three
// cases below identical in layout.
const Row = (props: { avatar: unknown; name: string; text: string }) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
  {props.avatar}<div><strong>{props.name}</strong><p sx={{ text: "sm", color: "muted" }}>{props.text}</p></div>
</div>

export function CommentHeader() {
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. name + src: the picture is shown; the name stays as the accessible name and the fallback. */}
    <Row avatar={<Avatar name="Fotoğraf Atölyesi" src="/media/social/sunset.svg" />} name="Fotoğraf Atölyesi" text="Harika bir kare!" />
    {/* 2. The src does not exist on purpose: a failed load falls back to the initials, so the layout never shows a
        broken-image icon. */}
    <Row avatar={<Avatar name="Kitap Kulübü" src="/olmayan.jpg" />} name="Kitap Kulübü" text="Resim yüklenemedi: baş harfler görünür" />
    {/* 3. A guest has no name: an icon with an explicit `label` for screen readers and a neutral colour. */}
    <Row avatar={<Avatar icon={user} label="Misafir" color="neutral" />} name="Misafir" text="Giriş yapmadan yorum" />
  </div>
}
