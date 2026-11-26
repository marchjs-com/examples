// EventSignup: the real-life Wizard example.
//
// What it shows: registering for an event in three steps: personal details (laid out in a grid), the ticket choice with a
// check against the number of seats left, and a summary before the form is sent. After sending, a success Alert
// repeats what was registered.
// When to use this pattern: longer sign-up or checkout forms. Splitting them into steps keeps each screen short; the
// extra `validate` of a step is the place for rules that depend on several fields or on data outside the form.
import { useForm, Alert } from "march/ui"
import { Wizard } from "march/components/wizard"

// A made-up number of free seats; the ticket step refuses a bigger group.
const SEATS_LEFT = 4

export function EventSignup() {
  // The confirmation text shown after the form is sent (a signal).
  let $sent = ""
  // The form: five fields with their types (text, email, pick, int with min / max, textarea), labels and defaults.
  // onSubmit runs after the last step passes validation, with all the values.
  const form = useForm({
    name: { type: "text", label: "Ad soyad", required: true },
    email: { type: "email", label: "E-posta", required: true },
    ticket: { type: "pick", label: "Bilet", options: ["Standart", "Öğrenci", "Destekçi"], default: "Standart" },
    count: { type: "int", label: "Kişi sayısı", min: 1, max: 10, default: 1 },
    note: { type: "textarea", label: "Not (isteğe bağlı)" },
  }, {}, { onSubmit: (v) => { $sent = `${v.name}, ${v.count} kişilik ${v.ticket} biletin ${v.email} adresine gönderildi.` } })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Wizard props used here:
        - form: the form above. layout="grid" with cols={2} lays the fields of a step out in two columns (the default
          is a single stack).
        - submitLabel: the label of the last step's button. m:color: a common prop, the colour token of the component.
        - steps: each has a title, an optional description and the `fields` it shows. A step checks its own fields
          before Next. Step two also has `validate(values)`: it returns an object of field errors (here on `count`) or
          null when all is fine, so the error shows under that field and the wizard stays on the step.
        - the last step has no fields: `render(form)` draws your own content instead (a summary). The values are read
          inside functions so the lines stay current.
        Accessibility: the stage list marks the current step with aria-current="step", moving to a step focuses its
        heading, and step-level errors are announced as alerts. */}
    <Wizard form={form} layout="grid" cols={2} submitLabel="Kaydımı tamamla" m:color="brand-blue"
      steps={[
        { title: "Bilgiler", description: "Biletin bu adrese gelir", fields: ["name", "email"] },
        { title: "Bilet", fields: ["ticket", "count", "note"],
          validate: (v) => (Number(v.count) > SEATS_LEFT ? { count: `Yalnız ${SEATS_LEFT} yer kaldı` } : null) },
        { title: "Özet", render: (f) => <ul sx={{ flex: "col", gap: 1 }}>
          <li>{() => `Ad: ${f.values.name}`}</li>
          <li>{() => `E-posta: ${f.values.email}`}</li>
          <li>{() => `Bilet: ${f.values.count} × ${f.values.ticket}`}</li>
        </ul> },
      ]} />
    {/* Shown only after submit; Alert with tone="success" is the confirmation. */}
    {$sent ? <Alert tone="success" title="Kayıt alındı">{$sent}</Alert> : null}
  </div>
}
