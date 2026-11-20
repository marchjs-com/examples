import { Pagination, Card } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

// Pagination'ın bütün özellikleri: page (bind:page = page + setPage), pages, onPage, siblings, variant, total, size,
// sizes, onSize, hasPrev, hasNext, onPrev, onNext, info, status, label, labels (previous, next, page, sizes),
// controls, prev, next, gap, class, m:color
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PaginationLab() {
  let $page = 1
  let $last = "—"
  let $mini = 3
  let $rowsPage = 2
  let $size = 20
  let $batch = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Numaralı: kendi adları, metinleri, boşluk işareti, renk">
      <Pagination bind:page={$page} pages={20} siblings={2} onPage={(p: number) => $last = String(p)} prev="‹ Geri" next="İleri ›" gap="·"
        label="Sonuç sayfaları" labels={{ previous: "Önceki sayfa", next: "Sonraki sayfa", page: (n: number) => `Sayfa ${n}` }}
        m:color="brand-blue" class="lab-numbers" />
      <span>{"Son seçilen: " + $last}</span>
    </Row>
    <Row title="Yalnız numaralar (controls ve gap kapalı); total + size ile sayfa sayısı">
      <Pagination bind:page={$mini} pages={5} controls={false} gap={false} class="lab-bare" />
      <Pagination page={3} total={45} size={10} class="lab-total" />
    </Row>
    <Row title="Yalın: aralık metni, sayfa metni, sayfa boyutu">
      <Pagination variant="simple" bind:page={$rowsPage} total={134} size={$size} sizes={[20, 50]} onSize={(n: number) => { $size = n; $rowsPage = 1 }}
        info={(r: { from: number; to: number; total: number }) => `${r.from}–${r.to} / ${r.total} satır`} status={(p: number, n: number) => `Sayfa ${p} / ${n}`}
        labels={{ previous: "Önceki", next: "Sonraki", sizes: "Satır sayısı" }} class="lab-simple" />
    </Row>
    <Card m:theme="night">
      <Row title="İmleç kipi: sayfa sayısı bilinmiyor">
        <Pagination variant="simple" hasPrev={$batch > 1} hasNext={$batch < 4} onPrev={() => $batch--} onNext={() => $batch++}
          prev={arrowLeft} next={arrowRight} labels={{ previous: "Daha yeni", next: "Daha eski" }} class="lab-cursor" />
        <span>{"Yığın " + $batch}</span>
      </Row>
    </Card>
  </div>
}
