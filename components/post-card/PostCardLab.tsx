// PostCardLab: the full-featured PostCard example; it uses every prop at least once.
//
// Props shown here: post (as an accessor), onLike / onComment / onShare / onOpenMedia / onAuthor, menu, variant,
// clamp, doubleTapLike, labels, avatar, time, verifiedIcon / placeIcon / commentIcon / shareIcon / menuIcon,
// bigHeart, likeColor, viewAll and class; below it a plain second card on a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PostCardLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { PostCard, Card, Segmented, type Post } from "march/ui"
import { zap, send, settings, star, mapPin } from "march/icons"

// Tiny 2x2 PNG data URIs standing in for photos.
const PHOTOS = {
  city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOQ1Y7Ktl/AwC9h+mCBFQAYjgQDFgLe2AAAAABJRU5ErkJggg==",
  coffee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4+PDYiWkZDF1RNl46cgA28QYTKX6a1AAAAABJRU5ErkJggg==",
}

export function PostCardLab() {
  // The post as one signal; every action replaces the object.
  let $post: Post = {
    id: "lab", author: { name: "Fotoğraf Atölyesi", handle: "foto.atolye", verified: true }, time: new Date(2026, 10, 18, 9, 5),
    place: "Kadıköy", likes: 41, comments: 8, shares: 2,
    text: "Bu hafta analog banyo yaptık. Sonuçlar beklediğimizden iyi çıktı; karanlık oda turu cumartesi yine var, yer ayırtmayı unutmayın. Ekipman bizden, film sizden.",
    media: [{ src: PHOTOS.city, alt: "Gece şehir" }, { src: PHOTOS.coffee, alt: "Kahve" }],
  }
  // The last action as text, so you can see each callback fire.
  let $log = "-"
  // The look of the first card ("card" or "flat"), chosen with the Segmented control below.
  let $variant = "card"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* bind:value keeps $variant in step with the choice. */}
      <Segmented aria-label="Görünüm" options={[{ value: "card", label: "Kart" }, { value: "flat", label: "Düz" }]} bind:value={$variant} />
      <span sx={{ text: "sm", color: "muted" }}>{$log}</span>
    </div>
    {/* The first card uses every prop:
        - post / variant as accessors (functions), so the card reads the latest value; variant: "card" frame or "flat".
        - clamp={2}: fold the text after two lines (a "more" button unfolds it; 0 never folds).
        - doubleTapLike: a double tap on a photo likes the post with the big heart.
        - onLike(on, post) updates the post optimistically; onComment, onShare, onOpenMedia(index) and onAuthor(post)
          are
          the other callbacks (the author becomes a button when onAuthor is given); menu adds items to the "..." menu.
        - labels: every text the card writes itself; functions get the count.
        - avatar, time: show the avatar; time can be a function that formats the date your way.
        - verifiedIcon, placeIcon, commentIcon, shareIcon, menuIcon: your own marks instead of the built-in ones.
        - bigHeart: the node shown on a double tap; likeColor: the colour token of a liked heart; viewAll: the line
          "View all N comments"; class: on the article, used by the tests. */}
    <PostCard class="lab-post" post={() => $post} variant={() => $variant as "card"} clamp={2} doubleTapLike
      onLike={(on, p) => { $post = { ...p, liked: on, likes: p.likes + (on ? 1 : -1) }; $log = on ? "beğenildi" : "beğeni geri alındı" }}
      onComment={() => $log = "yorumlar"} onShare={() => { $post = { ...$post, shares: ($post.shares ?? 0) + 1 }; $log = "paylaşıldı" }}
      onOpenMedia={(i) => $log = `fotoğraf ${i + 1}`} onAuthor={(p) => $log = `yazar: ${p.author.name}`}
      menu={[{ label: "Kaydet", icon: star, onSelect: () => $log = "kaydedildi" }]}
      labels={{ like: "Beğen", more: "devamı", options: "Gönderi seçenekleri", viewAll: (n) => `${n} yorumun hepsi`, comments: (n) => `${n} yorum`, share: (n) => `${n} paylaşım` }}
      avatar time={(t) => new Date(t).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
      verifiedIcon="✔" placeIcon={mapPin} commentIcon={zap} shareIcon={send} menuIcon={settings}
      bigHeart={<span sx={{ text: "2xl" }}>💜</span>} likeColor="brand-purple" viewAll />
    {/* A second card on a dark surface (m:theme="night" works on every component). Everything optional is switched
        off here: flat look, no avatar, no time, no "view all" line, no verified mark, no big heart. */}
    <Card m:theme="night">
      <PostCard post={{ id: "plain", author: { name: "Kitap Kulübü" }, time: Date.now() - 3_600_000, text: "Ayın kitabı oylamada.", likes: 5 }}
        variant="flat" avatar={false} time={false} viewAll={false} verifiedIcon={false} bigHeart={false} />
    </Card>
  </div>
}
