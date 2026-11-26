// PeriodNavLab: the full-featured PeriodNav example; it uses every prop at least once.
//
// PeriodNav is the small group that a calendar steps its period with: previous, today, next. Without a title the buttons
// are one joined control; with a `title` the period's name sits between the arrows. Props shown here: onPrev, onNext,
// onToday, today (your own text, or false for none), title (or children), labels (group, previous, today, next), prevIcon,
// nextIcon, arrows, prevDisabled, nextDisabled, rtl, attached, size, partClass, class and the common colour prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PeriodNavLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { PeriodNav, Card } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

const now = new Date()
// The month name for an offset from the current month, formatted in Turkish.
const monthName = (offset: number) => new Intl.DateTimeFormat("tr", { month: "long", year: "numeric" }).format(new Date(now.getFullYear(), now.getMonth() + offset, 1))

// One example of the Lab: its name on the left and the navigation on the right. Plain composition, no PeriodNav feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: ["row", "between"], gap: 3 }}>
  <span sx={{ text: "sm", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PeriodNavLab() {
  // Reactive state: a position per example (week and month offsets from now, a page number, and a step counter).
  let $week = 0
  let $month = 0
  let $page = 1
  let $rtl = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title={`Bitişik, küçük (hafta ${$week >= 0 ? "+" : ""}${$week})`}>
      {/* Without a title the three buttons (previous, today, next) are one joined control. `attached` writes that out;
          size="sm": smaller arrows. onToday shows the today button and runs on it. labels: the accessible name of the
          group (group) and the texts / names of the buttons; the arrows are icon buttons, so their labels matter. */}
      <PeriodNav onPrev={() => $week--} onNext={() => $week++} onToday={() => $week = 0} attached size="sm"
        labels={{ group: "Hafta seçici", previous: "Önceki hafta", today: "Bu hafta", next: "Sonraki hafta" }} />
    </Row>
    <Row title="Başlıklı, kendi ikonlar ve bugün metni, turuncu">
      {/* With a `title` (a function, so it is read live) the period's name sits between the arrows and the today button
          follows. today: your own button text. prevIcon / nextIcon: your own arrow content (drawn as given, so there is no
          automatic swap in right-to-left text). m:color: the colour token (a common prop). class: for CSS or tests.
          partClass: an extra class on a part (prev, next, today, title), for a host that keeps its own class names.
          labels can also be functions (previous, next here), for a name that is computed. */}
      <PeriodNav title={() => monthName($month)} onPrev={() => $month--} onNext={() => $month++} onToday={() => $month = 0}
        today="● Şimdi" prevIcon={arrowLeft} nextIcon={arrowRight} m:color="brand-orange" class="lab-month"
        partClass={{ prev: "lab-prev", next: "lab-next", today: "lab-today", title: "lab-title" }}
        labels={{ group: "Ay seçici", previous: () => "Önceki ay", next: () => "Sonraki ay" }} />
    </Row>
    <Row title="Sınırlı, başlık children, bugün yok (today={false})">
      {/* The title as children (a function child is live). today={false}: no today button. attached={false}: the buttons
          are separate instead of joined. prevDisabled / nextDisabled: turn the arrow off on the first and last period. */}
      <PeriodNav onPrev={() => $page--} onNext={() => $page++} onToday={() => $page = 1} today={false} attached={false}
        prevDisabled={$page <= 1} nextDisabled={$page >= 3} labels={{ group: "Sayfa seçici", previous: "Geri sayfa", next: "İleri sayfa" }}>
        {() => `Sayfa ${$page} / 3`}
      </PeriodNav>
    </Row>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Row title="Sağdan sola (rtl) ve oksuz (arrows={false})">
        {/* rtl: lays out for right-to-left text: the default chevrons swap, while "previous" stays first in reading
            order (by default it follows the direction of the app). arrows={false}: no arrows, only the title and the
            today button. */}
        <PeriodNav title="RTL" rtl onPrev={() => $rtl--} onNext={() => $rtl++} labels={{ group: "Sağdan sola" }} />
        <PeriodNav title={() => `Adım ${$rtl}`} arrows={false} onPrev={() => {}} onNext={() => {}} onToday={() => $rtl = 0}
          labels={{ group: "Oksuz dönem", today: "Sıfırla" }} />
      </Row>
    </Card>
  </div>
}
