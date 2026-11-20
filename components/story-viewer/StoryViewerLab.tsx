import { StoryViewer, Button, Badge, type StoryGroup } from "march/ui"

// StoryViewer'ın bütün özellikleri: açık / kapalı, gruplar (kendi süresi olan hikâye), başlangıç grubu, varsayılan süre,
// görüldü / yanıt / beğeni olayları ve beğeni durumu, ilerleme çubukları, avatar, zaman, duraklat, kapat, oklar,
// "gönderildi" notu, kendi metinler (ekran okuyucu durumu dahil) ve sınıf
// fotoğraflar: 2×2 piksellik PNG'ler (dört rengi tarayıcı yumuşakça karıştırır)
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOQ1Y7Ktl/AwC9h+mCBFQAYjgQDFgLe2AAAAABJRU5ErkJggg==",
  coffee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4+PDYiWkZDF1RNl46cgA28QYTKX6a1AAAAABJRU5ErkJggg==",
  sunset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4vznmf3Y0wyHHKm+tbAAzQwYxpZcJIQAAAABJRU5ErkJggg==",
}
const GROUPS: StoryGroup[] = [
  { id: "u1", name: "Ece", items: [
    { id: "e1", src: PHOTOS.sunset, alt: "Gün batımı", caption: "Tepede gün batımı", time: new Date(Date.now() - 30 * 60_000) },
    { id: "e2", src: PHOTOS.sea, alt: "Deniz", duration: 9000 },
  ] },
  { id: "u2", name: "Can", items: [{ id: "c1", src: PHOTOS.city, alt: "Şehir", caption: "Gece turu" }] },
  { id: "u3", name: "Deniz", items: [{ id: "d1", src: PHOTOS.coffee, alt: "Sahil", caption: "Kahve molası" }] },
]

// açık başlar (Özellikler her seçeneği hemen gösterir); testler startOpen={false} ile kapalı çizer
export function StoryViewerLab(props: { startOpen?: boolean }) {
  let $open = props.startOpen ?? true
  let $start: string | number = 0
  let $seen: string[] = []
  let $liked = new Set<string>()
  let $log = "-"
  const show = (start: string | number) => { $start = start; $open = true }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
    <Button size="sm" on:click={() => show(0)}>Baştan aç</Button>
    <Button size="sm" variant="ghost" on:click={() => show("u2")}>Can'dan aç</Button>
    <Badge tone="primary">{$log}</Badge>
    <span sx={{ text: "xs", color: "muted" }}>{`görülen: ${$seen.join(", ") || "-"}`}</span>
    <StoryViewer class="lab-stories" open={() => $open} onClose={() => { $open = false; $log = "kapandı" }}
      groups={GROUPS} start={() => $start} duration={4000}
      onSeen={(_, s) => { if (!$seen.includes(s.id)) $seen = [...$seen, s.id] }}
      onReply={(g, _, text) => $log = `${g.name}: ${text}`}
      onLike={(_, s, on) => { const n = new Set($liked); on ? n.add(s.id) : n.delete(s.id); $liked = n; $log = on ? "beğenildi" : "beğeni geri alındı" }}
      liked={(_, s) => $liked.has(s.id)}
      progress avatar time pauseButton closeButton arrows sentNote
      labels={{ dialog: "Hikâyeler", play: "Oynat", pause: "Durdur", close: "Hikâyeyi kapat", previous: "Önceki hikâye", next: "Sonraki hikâye",
        like: "Hikâyeyi beğen", send: "Yolla", sent: "İletildi ✓",
        reply: (g) => `${g.name} kişisine yanıt`, replyPlaceholder: (g) => `${g.name} için bir şey yaz…`,
        status: (g, i, n) => `${g.name}: ${i + 1}. hikâye / ${n}` }} />
  </div>
}
