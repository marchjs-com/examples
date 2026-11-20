import { PostCard, type Post } from "march/ui"

// bir kedinin gönderisi: fotoğrafa çift dokununca büyük kalp yerine pati çıkar, beğeni turuncu olur
const SUNSET = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mP4WSz2xmMmQ43VWzlpbwAsKgV3rhVt4wAAAABJRU5ErkJggg=="

export function CatPost() {
  let $post: Post = {
    id: "cat", author: { name: "Pamuk 🐈", handle: "pamuk.kedi" }, time: new Date(Date.now() - 7 * 60_000),
    text: "Güneşli pencere kenarı benim. Tartışmaya kapalıdır. 😼", media: [{ src: SUNSET, alt: "Pencerede gün batımı" }],
    likes: 99, comments: 12,
  }
  return <PostCard post={$post} bigHeart={<span sx={{ text: "2xl" }}>🐾</span>} likeColor="brand-orange"
    onLike={(on) => $post = { ...$post, liked: on, likes: $post.likes + (on ? 1 : -1) }} />
}
