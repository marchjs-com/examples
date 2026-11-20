import { PostCard, toast, confirm, type Post } from "march/ui"
import { link, flag, eyeOff } from "march/icons"

// bir kulübün duyurusu: beğeni ve paylaşım sayıları iyimser güncellenir, yorumlar ve fotoğraflar açılır,
// ⋯ menüsünde bağlantıyı kopyala, gizle ve (onaylı) bildir
// fotoğraflar: 2×2 piksellik PNG'ler (dört rengi tarayıcı yumuşakça karıştırır)
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  forest: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOYf7nLvt+fIarWSiVADwAolwTN7JGvOgAAAABJRU5ErkJggg==",
  dawn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGP4f7nrf382w/eVR/qzbwAAPqoIjEiz040AAAAASUVORK5CYII=",
}

export function ClubAnnouncement() {
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
  let $hidden = false
  const patch = (p: Partial<Post>) => { $post = { ...$post, ...p } }
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
