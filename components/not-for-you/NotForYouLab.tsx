import { NotForYou } from "march/landing"
import { Segmented, Toggle, Card } from "march/ui"

// NotForYou'nun bütün özellikleri bir arada: satırlar (metin, açıklama, olumlu yanı), kimin için olduğu, iki başlık,
// işaretleme, kendi sonuç metnin, kartlar / liste, onCheck, kart etiketi, iki ipucu, kendi işaretlerin ve sınıf
const ITEMS = [
  { text: "Gece yarısı kod yazmayı sevmiyorsun", detail: "Topluluk en çok gece canlı.", instead: "Gece kuşusun: canlı yayınlar tam saatinde." },
  { text: "Yalnız çalışmak istiyorsun", detail: "Her proje bir ekiple yapılır.", instead: "Ekip işini seviyorsun." },
  { text: "Hazır cevap arıyorsun", detail: "Burada soru sorulur, birlikte bulunur.", instead: "Kendin bulmaktan keyif alıyorsun." },
]
const MARKS = { not: "🙅", marked: "🎉", for: "👍" }

export function NotForYouLab() {
  let $variant: "cards" | "list" = "cards"
  let $own = false
  let $marked: number[] = []
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={[{ value: "cards", label: "kartlar" }, { value: "list", label: "liste" }]} bind:value={$variant} />
        <Toggle label="Kendi işaretlerim" bind:value={$own} />
      </div>
    </Card>
    {() => { const variant = $variant, own = $own; return <NotForYou class="lab-nfy" variant={variant} check items={ITEMS}
      forYou={[{ text: "Birlikte öğrenmeyi seviyorsun", detail: "Haftalık eşli programlama." }]}
      title="Kulübe göre değilsin, eğer…" forYouTitle="Kulüp seni bekliyor, eğer…"
      verdict={(n: number, total: number) => (n === total ? "Hoş geldin, kulüp senin!" : `${n} / ${total} çizildi`)}
      onCheck={(m: number[]) => $marked = m}
      meLabel="Bu benim" hint="Değil mi? Dokun" markedHint="Değilmişsin"
      mark={own ? (state: keyof typeof MARKS) => MARKS[state] : true} /> }}
    <p sx={{ color: "muted" }} class="lab-marked">Çizilenler: {$marked.join(", ") || "yok"}</p>
  </div>
}
