import { SectionTimeline, Progress } from "march/ui"

// bir blog yazısı: yanında bölüm başına bir nokta (okunan renkli, geçilenler açık); imleç yaklaşınca adlar açılır,
// üstte okuma ilerlemesi, altta okunan bölümün adı
const chapters = [
  { title: "Neden sinyaller?", text: "Bileşen bir kez çalışır; değişen yalnızca değerin bağlı olduğu düğümdür." },
  { title: "İlk sayaç", text: "let $count = 0 yazmak yeter: okuyan her yer kendiliğinden güncellenir." },
  { title: "Türetilmiş değerler", text: "const $double = $count * 2 bir computed olur; bağımlılık listesi yok." },
  { title: "Efektler", text: "effect() okuduğu sinyaller değişince yeniden çalışır, sahibi gidince temizlenir." },
  { title: "Listeler", text: "<For> anahtarlı çizer: bir satır değişince yalnız o satır yenilenir." },
  { title: "Sonuç", text: "Yeniden çizim yok, kural yok, yalnızca değerler ve bağlar." },
]

export function ArticleReader() {
  let $read = -1
  let box: HTMLElement | undefined
  const items = chapters.map((c, i) => ({ label: c.title, target: () => box?.querySelector(`[data-ch="${i}"]`) ?? null }))
  // kayan kutunun yüksekliği style nesnesiyle (sx'te yükseklik yok)
  return <div sx={{ flex: "col", gap: 2 }}>
    <Progress value={Math.round((($read + 1) / chapters.length) * 100)} label="Okuma ilerlemesi" />
    <div sx={{ flex: "row", gap: 3 }}>
      <div sx={{ flex: "grow" }}>
        <div ref={(el: HTMLElement) => box = el} style={{ "block-size": "16rem", overflow: "auto" }}>
          {chapters.map((c, i) => <article data-ch={String(i)} sx={{ py: 4 }}>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <p sx={{ color: "muted" }}>Okumaya devam et, zaman çizelgesi seni izliyor.</p>
          </article>)}
        </div>
      </div>
      <SectionTimeline items={items} root={() => box} intro offset={0} labels={{ group: "Yazının bölümleri" }} onChange={(i: number) => $read = i} />
    </div>
    <span sx={{ text: "sm", color: "muted" }}>{$read < 0 ? "Henüz başlamadın" : `Okunan: ${chapters[$read].title} (${$read + 1} / ${chapters.length})`}</span>
  </div>
}
