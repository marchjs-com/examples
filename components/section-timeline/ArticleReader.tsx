// ArticleReader: the real-life SectionTimeline example.
//
// What it shows: a blog post in a scrolling box with a column of dots beside it, one dot per chapter. The chapter being
// read is in full colour, chapters behind it are light, and pressing a dot scrolls to its chapter. Above the text a
// Progress bar shows how many chapters have been reached, and below it a line names the chapter being read.
// When to use this pattern: long articles, documentation and guides. This one scrolls inside a box (`root`); without
// `root` the timeline follows the page itself.
import { SectionTimeline, Progress } from "march/ui"

// The chapters of the article: a title and a short text each. A real page would load them from a CMS.
const chapters = [
  { title: "Neden sinyaller?", text: "Bileşen bir kez çalışır; değişen yalnızca değerin bağlı olduğu düğümdür." },
  { title: "İlk sayaç", text: "let $count = 0 yazmak yeter: okuyan her yer kendiliğinden güncellenir." },
  { title: "Türetilmiş değerler", text: "const $double = $count * 2 bir computed olur; bağımlılık listesi yok." },
  { title: "Efektler", text: "effect() okuduğu sinyaller değişince yeniden çalışır, sahibi gidince temizlenir." },
  { title: "Listeler", text: "<For> anahtarlı çizer: bir satır değişince yalnız o satır yenilenir." },
  { title: "Sonuç", text: "Yeniden çizim yok, kural yok, yalnızca değerler ve bağlar." },
]

export function ArticleReader() {
  // `let $read` is a March signal: onChange writes it, and the Progress bar and the status line redraw. It is -1 until
  // the reader reaches the first chapter (the same value onChange reports before the first section).
  let $read = -1
  // The scrolling box; the ref below fills it in once it exists.
  let box: HTMLElement | undefined
  // The timeline items: a label (the name shown beside the dot) and a `target`. The target is a function that looks the
  // section up when needed and returns null while it is not there, so it is safe before the first draw.
  const items = chapters.map((c, i) => ({ label: c.title, target: () => box?.querySelector(`[data-ch="${i}"]`) ?? null }))
  // The scrolling box's height is set with a style object, because sx has no height token.
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
      {/* SectionTimeline options used here:
          - items: the sections in page order.
          - root={() => box}: the box that scrolls (the default is the page).
          - intro: when the reader first reaches the first section, the magnifier sweeps once over the dots so a newcomer
            sees the names. It does not run under reduced motion.
          - offset={0}: room kept above a section when scrolling to it; the default 80 px is meant for a sticky top bar,
            and this box has none.
          - labels={{ group }}: the accessible name of the navigation (the default is a translated "Sections").
          - onChange(index): the section being read changed; here it feeds the progress bar and the status line.
          Accessibility: it is a nav with a list of buttons; the section being read has aria-current="location" and is
          the one tab stop, and the arrow keys, Home and End move between the dots. Under reduced motion the magnifier
          comes and goes at once and scrolling is not smooth. */}
      <SectionTimeline items={items} root={() => box} intro offset={0} labels={{ group: "Yazının bölümleri" }} onChange={(i: number) => $read = i} />
    </div>
    <span sx={{ text: "sm", color: "muted" }}>{$read < 0 ? "Henüz başlamadın" : `Okunan: ${chapters[$read].title} (${$read + 1} / ${chapters.length})`}</span>
  </div>
}
