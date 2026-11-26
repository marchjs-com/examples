// CoffeeWizard: the creative-minimal Wizard example.
//
// What it shows: ordering a coffee in three steps: size, milk and the name to write on the cup. The last step places
// the order and the result is shown under the wizard.
// When to use this pattern: a short form that is easier to answer one question at a time. Define the fields once with
// useForm, then tell Wizard which fields belong to which step.
import { useForm, toast } from "march/ui"
import { Wizard } from "march/components/wizard"

export function CoffeeWizard() {
  // The text of the placed order (a signal).
  let $order = ""
  // useForm (from march/ui) builds a form from a field definition: each field has a type, a label and, optionally,
  // options (for "pick"), a default and `required`. Wizard then shows the fields of this form step by step. The third
  // argument's onSubmit runs after the last step passes validation, with all the values.
  const form = useForm({
    size: { type: "pick", label: "Boy", options: ["Küçük", "Orta", "Büyük"], default: "Orta" },
    milk: { type: "pick", label: "Süt", options: ["Sütsüz", "İnek sütü", "Yulaf sütü"], default: "Yulaf sütü" },
    name: { type: "text", label: "Bardağa yazılacak ad", required: true },
  }, {}, { onSubmit: (v) => { $order = `☕ ${v.name}: ${v.size} boy, ${v.milk}`; toast("Kahven hazırlanıyor") } })
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Wizard props used here:
        - form: the form built above (without it Wizard builds its own from the steps).
        - steps: one entry per step with a `title` (shown in the stage list on top) and the names of the `fields` that
          step shows. A step validates its own fields before Next lets you go on; Back keeps what you typed.
        - submitLabel: the label of the last step's button (the default is "Finish").
        - m:color is a common prop (every component takes it): the colour token of the wizard and everything in it.
        Accessibility: it is a form; the stage list marks the current step (aria-current="step"), and moving to a step
        focuses its heading so screen readers announce it. The wizard has no animation of its own to turn off. */}
    <Wizard form={form} submitLabel="Sipariş ver" m:color="brand-orange"
      steps={[{ title: "Boy", fields: ["size"] }, { title: "Süt", fields: ["milk"] }, { title: "Ad", fields: ["name"] }]} />
    <span sx={{ text: "lg", color: $order ? "brand-orange" : "muted" }}>{$order || "Henüz sipariş yok"}</span>
  </div>
}
