// CatPost: the creative-minimal PostCard example.
//
// What it shows: one playful post. Double-tapping the photo shows a paw instead of the default heart, and the like
// button turns orange. When to use this pattern: the smallest useful PostCard, where only the look of the like
// (bigHeart, likeColor) is customised.
//
// Animation: the big heart / paw pop and the burst are decorative and run on the motion engine, so reduced motion,
// global speed and "Stop all" apply; `bigHeart={false}` likes the post without any big mark.
// Accessibility: the like button's aria-pressed carries the state; the paw is decorative.

import { PostCard, type Post } from "march/ui"

// A tiny 2x2 PNG as a data URI: the browser blurs its four pixels softly, so no image file is needed.
const SUNSET = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mP4WSz2xmMmQ43VWzlpbwAsKgV3rhVt4wAAAABJRU5ErkJggg=="

export function CatPost() {
  // The post is a signal holding one object. `liked` and `likes` are replaced (never mutated) on every like.
  let $post: Post = {
    id: "cat", author: { name: "Pamuk 🐈", handle: "pamuk.kedi" }, time: new Date(Date.now() - 7 * 60_000),
    text: "Güneşli pencere kenarı benim. Tartışmaya kapalıdır. 😼", media: [{ src: SUNSET, alt: "Pencerede gün batımı" }],
    likes: 99, comments: 12,
  }
  // - post: the data (author, time, text, media with alt text, counters).
  // - bigHeart: the node shown over the photo on a double tap (default: a heart).
  // - likeColor: colour token of the like mark while liked (default brand-pink).
  // - onLike(on): update the post optimistically; `on` is the new liked state, so the count goes up or down by one.
  return <PostCard post={$post} bigHeart={<span sx={{ text: "2xl" }}>🐾</span>} likeColor="brand-orange"
    onLike={(on) => $post = { ...$post, liked: on, likes: $post.likes + (on ? 1 : -1) }} />
}
