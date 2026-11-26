// ClubAnnouncement: the real-life PostCard example.
//
// What it shows: a club's announcement as it would appear in a feed: three photos, a verified author and a place,
// counters that update optimistically, and a "..." menu with copy link, hide and (confirmed) report.
// When to use this pattern: a feed item with real actions; every callback is a place where your app talks to its
// data layer (here a toast stands in for it).
//
// Accessibility: the card is an article named after its author; the author, the menu, the counts and "more" are
// buttons, and a photo opens from the keyboard at once. Animation: the like burst is decorative and runs on the
// motion engine (reduced motion, global speed and "Stop all" apply).

import { PostCard, toast, confirm, type Post } from "march/ui"
import { link, flag, eyeOff } from "march/icons"

// Tiny 2x2 PNG data URIs standing in for photos (the browser blurs their four pixels softly).
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  forest: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOYf7nLvt+fIarWSiVADwAolwTN7JGvOgAAAABJRU5ErkJggg==",
  dawn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGP4f7nrf382w/eVR/qzbwAAPqoIjEiz040AAAAASUVORK5CYII=",
}

export function ClubAnnouncement() {
  // The post data in one signal. Counters live in the post, so the card re-renders when it is replaced.
  let $post: Post = {
    id: "run-42", author: { name: "HADİ Koşu Kulübü", handle: "hadi.kosu", verified: true }, time: new Date(Date.now() - 18 * 60_000),
    place: "Sahil yolu", likes: 1284, comments: 46, shares: 12,
    text: "Pazar sabahı sahil koşusu tamamlandı! 🧡 Yeni katılan herkese hoş geldiniz; tempo grubu 6:30'da, yürüyüş grubu 7:00'de buluşuyor. Gelecek hafta rota orman yoluna taşınıyor, ayrıntılar etkinlik sayfasında.",
    media: [
      { src: PHOTOS.sea, alt: "Deniz kıyısı" },
      { src: PHOTOS.forest, alt: "Orman yolu" },
      { src: PHOTOS.dawn, alt: "Şafak" },
    ],
  }
  // Set by the "Hide" menu item; the whole card is then replaced by a short note.
  let $hidden = false
  // Merge changes into the post by replacing the object (signals notice a new object, not an edit).
  const patch = (p: Partial<Post>) => { $post = { ...$post, ...p } }
  // - onLike(on): optimistic update; the count moves by one in the direction of `on`.
  // - onComment / onShare / onOpenMedia / onAuthor: each one is a button on the card (a photo tile, the author name,
  //   the counts); giving the callback is what makes the author a button.
  // - menu: items of the "..." menu; "-" draws a divider and `danger` styles the item; the report item asks for
  //   confirmation first (confirm() resolves to true or false).
  return $hidden ? <p sx={{ color: "muted" }}>Gönderi gizlendi.</p> : <PostCard post={$post}
    onLike={(on) => patch({ liked: on, likes: $post.likes + (on ? 1 : -1) })}
    onComment={() => toast(`${$post.comments} yorum açılır`)}
    onShare={() => { patch({ shares: ($post.shares ?? 0) + 1 }); toast("Bağlantı paylaşıldı") }}
    onOpenMedia={(i) => toast(`${i + 1}. fotoğraf açılır`)}
    onAuthor={() => toast("Kulübün profili açılır")}
    menu={[
      { label: "Bağlantıyı kopyala", icon: link, onSelect: () => toast("Kopyalandı") },
      { label: "Gizle", icon: eyeOff, onSelect: () => $hidden = true },
      "-",
      { label: "Bildir", icon: flag, danger: true, onSelect: async () => { if (await confirm("Bu gönderi bildirilsin mi?")) toast("Bildirildi") } },
    ]} />
}
