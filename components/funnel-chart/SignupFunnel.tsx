import { FunnelChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// An app's sign-up funnel: a real-life FunnelChart.
// Pick web or mobile and the stages flow to their new widths; click a stage to read how many came through from the
// previous step and how many left. Use this to find the step that loses the most users, the one worth fixing first.

// Users per stage, per platform. Replace DATA with your analytics rows (any keys, named by x / y below).
const DATA: Record<string, { stage: string; users: number }[]> = {
  web: [{ stage: "Açılış sayfası", users: 48200 }, { stage: "Kayıt formu", users: 12900 }, { stage: "E-posta onayı", users: 8400 }, { stage: "İlk proje", users: 3100 }],
  mobile: [{ stage: "Açılış sayfası", users: 30500 }, { stage: "Kayıt formu", users: 14800 }, { stage: "E-posta onayı", users: 11200 }, { stage: "İlk proje", users: 5600 }],
}

export function SignupFunnel() {
  let $platform = "web"               // bound to the Segmented control
  let $note = "Bir aşamaya tıkla"     // the line under the chart, written by onSelect
  // The Segmented control goes into the Card's `actions` slot, so the platform switch sits in the card header next to
  // the title. `aria-label` names the control for screen readers.
  //
  // FunnelChart props:
  // - data={() => …}: a function reading the signal, so a platform switch redraws the chart.
  // - x="stage" / y="users": the stage name and value keys.
  // - shape="bars": centred bars, each with a faint ghost of the previous stage, so the lost users stay visible.
  // - orientation="horizontal": stages run left to right, which fits a wide card.
  // - format="compact": short numbers (thousands abbreviated) for 48 200-style values.
  // - animate="out": an easing name instead of the default spring, so the bars glide to their new widths without
  //   overshoot, which suits a dashboard. animate={false} makes them jump; { duration: 300, easing: "out", stagger:
  //   50 } gives finer control. Reduced motion is honoured automatically.
  // - onSelect: called on click or Enter with { label, value, share, conversion, dropoff, datum }. The first stage
  //   has no previous step, so its conversion is null: the note says everyone starts there.
  // Keyboard: Tab focuses the chart, ↑ ↓ (or ← →) move between stages, Enter / Space selects, Escape clears.
  return <Card title="Kayıt hunisi" actions={[<Segmented size="sm" bind:value={$platform} aria-label="Platform" options={[{ value: "web", label: "Web" }, { value: "mobile", label: "Mobil" }]} />]}>
    <FunnelChart data={() => DATA[$platform]} x="stage" y="users" shape="bars" orientation="horizontal" format="compact" animate="out"
      title="Kayıt hunisi" height={220}
      onSelect={(p: { label: string; conversion: number | null; dropoff: number | null }) => {
        $note = p.conversion == null ? `${p.label}: herkes buradan başlar` : `${p.label}: önceki adımın %${Math.round(p.conversion * 100)}'i geçti, ${p.dropoff} kişi ayrıldı`
      }} />
    {/* The note line: a function child, so it re-renders when onSelect writes $note. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $note}</p>
  </Card>
}
