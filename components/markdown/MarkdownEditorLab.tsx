import { MarkdownEditor, Card, Badge } from "march/ui"
import { bold, italic, link } from "march/icons"

// MarkdownEditor'ün bütün özellikleri: değer ve onChange, satır sayısı, yer tutucu, ilk görünüm ve sunulan görünümler,
// eski preview biçimi, kendi araçları ve ikonları, sözdizimi ipucu, kendi metinleri (sözcük, dakika dahil),
// eşzamanlı kaydırma, istatistik, bölme payı, sınıf, salt okunur
const START = "## Toplantı\n\n**Perşembe** 10:00, _ana ofis_.\n\n- [x] Salon\n- [ ] Sunum"

export function MarkdownEditorLab() {
  let $md = START
  let $edits = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Badge tone="neutral">{`${$edits} düzenleme`}</Badge>
    <MarkdownEditor value={$md} onChange={(v) => { $md = v; $edits++ }} rows={6} placeholder="Notları yazın…"
      view="write" views={["write", "split", "preview", "rich"]} split={0.6} syncScroll={false} class="lab-md"
      toolbar={["h2", "bold", "italic", "|", "link", "task", "codeblock"]} icons={{ bold, italic, link, h2: "H" }}
      labels={{ write: "Yaz", preview: "Oku", split: "Yan yana", rich: "Biçimli", view: "Görünüm", formatting: "Biçim",
        source: "Kaynak", resize: "Bölmeyi taşı", hint: "**kalın**, _eğik_, - liste",
        tools: { bold: "Kalın", italic: "Eğik", link: "Bağlantı", h2: "Başlık", task: "Görev", codeblock: "Kod bloğu" },
        words: (n) => `${n} sözcük`, minutes: (n) => `${n} dk okuma` }} />
    <Card m:theme="night">
      <div sx={{ flex: "col", gap: 2 }}>
        <span sx={{ text: "xs", color: "muted" }}>Eski preview="split", araçsız, ipucusuz, istatistiksiz, salt okunur</span>
        <MarkdownEditor value={$md} preview="split" views={["write", "split"]} toolbar={false} hint={false} stats={false} syncScroll readonly
          rows={4} aria-label="Salt okunur kopya" />
      </div>
    </Card>
  </div>
}
