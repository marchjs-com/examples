import { PeriodNav, Card } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

// PeriodNav'ın bütün özellikleri bir arada: onPrev, onNext, onToday, today (kendi metni ya da false), title (ya da
// children), labels (group, previous, today, next), prevIcon, nextIcon, arrows, prevDisabled, nextDisabled, rtl,
// attached, size, partClass, class ve renk (m:color)
const now = new Date()
const monthName = (offset: number) => new Intl.DateTimeFormat("tr", { month: "long", year: "numeric" }).format(new Date(now.getFullYear(), now.getMonth() + offset, 1))

// bir sıra: adı solda, gezinme sağda
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: ["row", "between"], gap: 3 }}>
  <span sx={{ text: "sm", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PeriodNavLab() {
  let $week = 0
  let $month = 0
  let $page = 1
  let $rtl = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title={`Bitişik, küçük (hafta ${$week >= 0 ? "+" : ""}${$week})`}>
      <PeriodNav onPrev={() => $week--} onNext={() => $week++} onToday={() => $week = 0} attached size="sm"
        labels={{ group: "Hafta seçici", previous: "Önceki hafta", today: "Bu hafta", next: "Sonraki hafta" }} />
    </Row>
    <Row title="Başlıklı, kendi ikonlar ve bugün metni, turuncu">
      <PeriodNav title={() => monthName($month)} onPrev={() => $month--} onNext={() => $month++} onToday={() => $month = 0}
        today="● Şimdi" prevIcon={arrowLeft} nextIcon={arrowRight} m:color="brand-orange" class="lab-month"
        partClass={{ prev: "lab-prev", next: "lab-next", today: "lab-today", title: "lab-title" }}
        labels={{ group: "Ay seçici", previous: () => "Önceki ay", next: () => "Sonraki ay" }} />
    </Row>
    <Row title="Sınırlı, başlık children, bugün yok (today={false})">
      <PeriodNav onPrev={() => $page--} onNext={() => $page++} onToday={() => $page = 1} today={false} attached={false}
        prevDisabled={$page <= 1} nextDisabled={$page >= 3} labels={{ group: "Sayfa seçici", previous: "Geri sayfa", next: "İleri sayfa" }}>
        {() => `Sayfa ${$page} / 3`}
      </PeriodNav>
    </Row>
    <Card m:theme="night">
      <Row title="Sağdan sola (rtl) ve oksuz (arrows={false})">
        <PeriodNav title="RTL" rtl onPrev={() => $rtl--} onNext={() => $rtl++} labels={{ group: "Sağdan sola" }} />
        <PeriodNav title={() => `Adım ${$rtl}`} arrows={false} onPrev={() => {}} onNext={() => {}} onToday={() => $rtl = 0}
          labels={{ group: "Oksuz dönem", today: "Sıfırla" }} />
      </Row>
    </Card>
  </div>
}
