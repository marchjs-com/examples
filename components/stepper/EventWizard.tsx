// EventWizard: the real-life Stepper example.
//
// What it shows: a four-step wizard for creating an event: name, day, who can join, and a summary. The panels hold real
// form controls, the summary panel reads what was entered and updates live, and the button of the last step publishes
// the event (it shows a toast and flips a badge from draft to published).
// When to use this pattern: a short multi-step form where the user may go back, and where each step is a small panel.
// The state ($step and the fields) stays in your component; Stepper only draws the steps and the panels.
//
// Animation: the highlight stretches from the old step to the new one, and the panels morph into each other (the old
// one blurs away, the new one arrives). It runs on March's motion engine, so the global speed, "Stop all" and the
// visitor's reduced-motion preference apply (with reduced motion the highlight jumps and panels switch at once).
// Pass `morph={false}` to turn the morph off for one Stepper (see StepperLab).
// Accessibility: the steps are a list with aria-current="step" (buttons here, because of onSelect); the panel frame is a
// polite live region named "Step n of m" (its text can be changed with `labels.step`); Back / Next are real buttons.
import { Stepper, TextInput, Segmented, Toggle, Badge, Card, toast } from "march/ui"

// The steps: a title and a short description under it. (`icon` is optional; none are used here.)
const STEPS = [
  { title: "Bilgiler", description: "Ad" },
  { title: "Zaman", description: "Gün" },
  { title: "Katılım", description: "Kimler" },
  { title: "Özet", description: "Yayınla" },
]

export function EventWizard() {
  // Reactive state: the current step and the values of the form. All of it lives here, outside the Stepper.
  let $step = 0
  let $title = "Moda sahili koşusu"
  let $day = "Cumartesi"
  let $open = true
  let $published = false
  // One panel per step, in the same order as STEPS. They are built here and passed to the Stepper. The panels read
  // the state ($title, $day, $open) inside JSX, so the summary panel always shows what was just entered.
  const panels = [
    <div sx={{ flex: "col", gap: 1 }}><span sx={{ text: "sm", color: "muted" }}>Etkinliğin adı</span><TextInput bind:value={$title} aria-label="Etkinliğin adı" /></div>,
    <div sx={{ flex: "col", gap: 1 }}><span sx={{ text: "sm", color: "muted" }}>Hangi gün?</span><Segmented options={["Cuma", "Cumartesi", "Pazar"]} bind:value={$day} /></div>,
    <Toggle bind:value={$open} label="Herkese açık (kapalıysa yalnız davetliler)" />,
    <div sx={{ flex: "col", gap: 1 }}>
      <span sx={{ text: "bold" }}>{$title}</span>
      <span>{$day + " · " + ($open ? "herkese açık" : "yalnız davetliler")}</span>
    </div>,
  ]
  // Runs when the last step's button is pressed: marks the event as published and shows a toast.
  const publish = () => { $published = true; toast("Etkinlik yayınlandı") }
  // Card's `actions` slot holds the badge, which shows the draft / published state.
  return <Card title="Yeni etkinlik" actions={<Badge tone={$published ? "success" : "neutral"}>{$published ? "Yayında" : "Taslak"}</Badge>}>
    {/* steps and current: the list and the active index. onSelect receives the index of a clicked step and of the
        Back / Next buttons, so it is where the state is changed. panels: the content per step (these morph into each
        other). m:color tints the highlight and the active step with one colour token. labels replaces the button texts;
        finishLabel and onFinish belong to the last step's button. counter is the text between Back and Next, here
        a function that counts the steps left (it receives the index and the number of steps); the last step says so. */}
    <Stepper steps={STEPS} current={$step} onSelect={(i: number) => $step = i} panels={panels} m:color="brand-green"
      labels={{ back: "Geri", next: "Devam" }} finishLabel="Yayınla" onFinish={publish}
      counter={(i: number, n: number) => (n - i - 1 ? `${n - i - 1} adım kaldı` : "son adım")} />
  </Card>
}
