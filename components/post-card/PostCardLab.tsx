import { PostCard, Card, Segmented, type Post } from "march/ui"
import { zap, send, settings, star, mapPin } from "march/icons"

// PostCard'ın bütün özellikleri: gönderi (erişimci), beğen / yorum / paylaş / fotoğraf / yazar olayları, ⋯ menüsü,
// görünüm, metin satırı (clamp), çift dokunuşla beğeni, kendi metinler, avatar, kendi zaman biçimi, kendi ikonlar,
// büyük kalp, beğeni rengi, "tüm yorumlar" satırı ve sınıf; altta koyu zeminde sade bir ikinci kart
// fotoğraflar: 2×2 piksellik PNG'ler (dört rengi tarayıcı yumuşakça karıştırır)
const PHOTOS = {
  city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOQ1Y7Ktl/AwC9h+mCBFQAYjgQDFgLe2AAAAABJRU5ErkJggg==",
  coffee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4+PDYiWkZDF1RNl46cgA28QYTKX6a1AAAAABJRU5ErkJggg==",
}

export function PostCardLab() {
  let $post: Post = {
    id: "lab", author: { name: "Fotoğraf Atölyesi", handle: "foto.atolye", verified: true }, time: new Date(2026, 10, 18, 9, 5),
    place: "Kadıköy", likes: 41, comments: 8, shares: 2,
    text: "Bu hafta analog banyo yaptık. Sonuçlar beklediğimizden iyi çıktı; karanlık oda turu cumartesi yine var, yer ayırtmayı unutmayın. Ekipman bizden, film sizden.",
    media: [{ src: PHOTOS.city, alt: "Gece şehir" }, { src: PHOTOS.coffee, alt: "Kahve" }],
  }
  let $log = "-"
  let $variant = "card"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Segmented aria-label="Görünüm" options={[{ value: "card", label: "Kart" }, { value: "flat", label: "Düz" }]} bind:value={$variant} />
      <span sx={{ text: "sm", color: "muted" }}>{$log}</span>
    </div>
    <PostCard class="lab-post" post={() => $post} variant={() => $variant as "card"} clamp={2} doubleTapLike
      onLike={(on, p) => { $post = { ...p, liked: on, likes: p.likes + (on ? 1 : -1) }; $log = on ? "beğenildi" : "beğeni geri alındı" }}
      onComment={() => $log = "yorumlar"} onShare={() => { $post = { ...$post, shares: ($post.shares ?? 0) + 1 }; $log = "paylaşıldı" }}
      onOpenMedia={(i) => $log = `fotoğraf ${i + 1}`} onAuthor={(p) => $log = `yazar: ${p.author.name}`}
      menu={[{ label: "Kaydet", icon: star, onSelect: () => $log = "kaydedildi" }]}
      labels={{ like: "Beğen", more: "devamı", options: "Gönderi seçenekleri", viewAll: (n) => `${n} yorumun hepsi`, comments: (n) => `${n} yorum`, share: (n) => `${n} paylaşım` }}
      avatar time={(t) => new Date(t).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
      verifiedIcon="✔" placeIcon={mapPin} commentIcon={zap} shareIcon={send} menuIcon={settings}
      bigHeart={<span sx={{ text: "2xl" }}>💜</span>} likeColor="brand-purple" viewAll />
    <Card m:theme="night">
      <PostCard post={{ id: "plain", author: { name: "Kitap Kulübü" }, time: Date.now() - 3_600_000, text: "Ayın kitabı oylamada.", likes: 5 }}
        variant="flat" avatar={false} time={false} viewAll={false} verifiedIcon={false} bigHeart={false} />
    </Card>
  </div>
}
