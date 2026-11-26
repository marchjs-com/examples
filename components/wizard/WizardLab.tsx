// WizardLab: the full-featured Wizard example; it uses every prop at least once.
//
// Props shown here: schema and initial values, fields per step, extra validation (a field error or a step message), a
// summary step with its own body (render), grid layout, validateOn, onStep, onReady (navigating from outside), your own
// texts (labels), submitLabel, class, m:color; and, below, a second wizard built on an existing form (form) with the
// parts turned off (stepper, progress, count, backButton).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// WizardLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { useForm, Button, Badge, Card } from "march/ui"
import { Wizard, type WizardApi } from "march/components/wizard"

export function WizardLab() {
  // Signals: the current step index, the result texts. `api` holds the handle that onReady gives us ({ index, next,
  // back, go }); it is a plain variable because nothing needs to redraw when it is set.
  let $step = 0
  let $done = ""
  let $invited = ""
  let api: WizardApi | undefined
  // There is no schema() helper in march/ui: useForm builds a form from a field definition, and its `.schema` is what the
  // first Wizard receives (so the Wizard builds its own form from that schema).
  const shop = useForm({
    shop: { type: "text", label: "Mağaza adı", required: true },
    city: { type: "text", label: "Şehir" },
    plan: { type: "pick", label: "Paket", options: ["Başlangıç", "Pro"] },
    seats: { type: "int", label: "Kişi", min: 1, max: 50 },
  }).schema
  // A second, ready-made form for the wizard in the dark card; its onSubmit runs when that wizard finishes.
  const invite = useForm({ email: { type: "email", label: "Davet e-postası", required: true } }, {},
    { onSubmit: (v) => { $invited = `${v.email} davet edildi` } })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The first Wizard, in groups:
        - schema / initial: the whole form's schema and the starting values.
        - validateOn="change": a field shows its error as soon as it changes (the default is "blur"; "submit" waits
          for Next / Finish).
        - layout="grid" with cols={2}: two columns of fields per step. class: an extra class on the form.
        - submitLabel: the label of the last step's button. m:color: a common prop, the colour token of the component.
        - labels: your own texts for the buttons, for the title of a step that has none, and for the count text; the
          functions get a 0-based index.
        - onStep(i): called when the step changes. onReady(form, api): called once, gives you { index, next, back, go }
          to move the wizard from outside (the "skip to summary" button below uses go).
        - onSubmit(values): runs after the last step validates.
        - steps: the first has a title, a description, its `fields` and `validate(values)` that returns an object of
          field errors (shown under that field). The second has no title (the labels.step text is used) and its
          validate returns a plain text: a step-level message. The third has no fields: `render(form)` draws your own
          summary, reading the values inside functions so it stays current. */}
    <Wizard schema={shop} initial={{ city: "İzmir", plan: "Pro", seats: 3 }} validateOn="change" layout="grid" cols={2}
      class="lab-wizard" submitLabel="Mağazayı aç" m:color="brand-purple"
      labels={{ back: "← Geri", next: "İleri →", step: (i) => `Bölüm ${i + 1}`, count: (i, n) => `${i + 1} / ${n}` }}
      onStep={(i) => $step = i} onReady={(_, a) => { api = a }}
      onSubmit={(v) => { $done = `${v.shop} açıldı (${v.plan}, ${v.seats} kişi)` }}
      steps={[
        { title: "Mağaza", description: "Adı ve şehri", fields: ["shop", "city"],
          validate: (v) => (v.shop === "test" ? { shop: "Bu ad ayrılmış" } : null) },
        { fields: ["plan", "seats"],
          validate: (v) => (v.plan === "Başlangıç" && Number(v.seats) > 5 ? "Başlangıç paketi en çok 5 kişilik" : null) },
        { title: "Özet", render: (f) => <p sx={{ text: "lg" }}>{() => `${f.values.shop} · ${f.values.city} · ${f.values.plan}`}</p> },
      ]} />
    {/* Outside the wizard: the current step number (from onStep) and a button that jumps to step index 2 with the api
        from onReady. The result text appears after onSubmit. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Badge tone="primary">{`Adım ${$step + 1}`}</Badge>
      <Button size="sm" variant="ghost" on:click={() => api?.go(2)}>Özete atla</Button>
      <span sx={{ color: "success" }}>{$done}</span>
    </div>
    {/* m:theme="night" is a common prop (every component takes it): the card and everything in it use the dark theme.
        The second Wizard uses an existing form (form={invite}) and turns the parts off: stepper (the stage list),
        progress (the bar), count (the "step 1 of 1" text) and backButton, which suits a single-step flow. */}
    <Card m:theme="night">
      <Wizard form={invite} stepper={false} progress={false} count={false} backButton={false} submitLabel="Davet gönder"
        steps={[{ title: "Ekip arkadaşını davet et", fields: ["email"] }]} />
      <span sx={{ color: "brand-gold" }}>{$invited}</span>
    </Card>
  </div>
}
