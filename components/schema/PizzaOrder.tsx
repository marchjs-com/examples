// PizzaOrder: the creative-minimal Form example.
//
// What it shows: a whole order form built from one schema. There is no markup for the fields: the Form reads the
// schema and draws a control for each one, so changing the form means editing a line of the schema.
// When to use this pattern: short forms whose fields map onto standard types (a choice, a multi-choice, a switch,
// a note). If you need custom layout between fields, pass your own children to Form instead (see docs/forms.md in the March repository).
import { Form, toast } from "march/ui"
import { schema } from "march/schema"

// Each entry is one field:
// - size: a single choice. options lists the values, `default` preselects "Orta" and control: "segmented" draws it
//   as a row of joined buttons instead of the default control (good for 2-6 short options).
// - toppings: type "multi" lets the user tick several options; the value is an array of the chosen texts.
// - cheese: type "bool" with control: "switch" draws an on/off switch.
// - note: a textarea limited to 120 characters; `help` is the hint text shown under the field.
const Pizza = schema({
  size: { type: "pick", label: "Boy", options: ["Küçük", "Orta", "Büyük"], default: "Orta", control: "segmented" },
  toppings: { type: "multi", label: "Malzemeler", options: ["Mantar", "Zeytin", "Mısır", "Biber", "Sucuk"] },
  cheese: { type: "bool", label: "Ekstra peynir 🧀", control: "switch" },
  note: { type: "textarea", label: "Not", max: 120, help: "Zil bozuk, kapıyı çalın gibi" },
})

export function PizzaOrder() {
  // schema: the fields above. submitLabel: the text of the submit button (the default is "Save").
  // onSubmit gets the values only when every rule passes; here it shows a success toast built from them.
  // `toppings` is an array, so join() turns it into text, and "sade" (plain) is used when nothing was ticked.
  return <Form schema={Pizza} submitLabel="Sipariş ver 🍕"
    onSubmit={(v: Record<string, unknown>) => { toast(`${v.size} pizza yolda! ${(v.toppings as string[]).join(", ") || "sade"}`, { kind: "success" }) }} />
}
