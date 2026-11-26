// FormLab: the full-featured Form example (a form drawn from a schema); it uses nearly every Form prop.
//
// Props shown here: schema, initial, onSubmit, validateOn, onChange, onReady, submitLabel, cancel, cancelLabel,
// requireDirty, confirmLeave, readonly, sections, layout, cols, extraActions, actions and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// FormLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Form, Card, Button } from "march/ui"
import { schema } from "march/schema"

// One schema describes every field once: its type, label and rules. The Form draws a matching control for each field
// (text input, picker, date, colour, textarea, switch) and validates against the same description, so the fields and
// their rules never drift apart.
// - required: true: the field may not be empty.
// - options: the choices of a "pick" field.
// - max: 200 on the textarea: its upper limit.
// - control: "switch": draws the boolean as a switch instead of a checkbox.
const Profile = schema({
  name: { type: "text", label: "Ad", required: true },
  city: { type: "pick", label: "Şehir", options: ["İstanbul", "Ankara", "İzmir"] },
  birthday: { type: "date", label: "Doğum günü" },
  color: { type: "color", label: "Sevdiğin renk" },
  bio: { type: "textarea", label: "Hakkında", max: 200 },
  public: { type: "bool", label: "Profil herkese açık", control: "switch" },
})

export function FormLab() {
  // Plain `let $name` variables are March signals: writing them redraws whatever reads them. Here they make the
  // Form's callbacks visible on screen (what was saved, how often it changed, whether onReady ran, the lock state).
  let $saved = "—"
  let $changes = 0
  let $ready = "hayır"
  let $locked = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The first Form uses every option:
        - schema + initial: the fields, and the values they start with (the test reads "Ece" back from the name field).
        - validateOn="change": validate while typing; the default is "blur" (when a field loses focus), "submit" waits
          for the submit button.
        - onChange: called on every field change with (name, value, values); here it only counts the changes.
        - onReady: called once with the form controller; here it flips the "ready" text.
        - onSubmit: called with the values only when the form is valid; async handlers are allowed too (see SignUp).
        - submitLabel / cancel / cancelLabel: the submit button's text, and a cancel button (cancel = true resets the
          form to its initial values) with its own text.
        - requireDirty: the submit button stays disabled until something changed.
        - confirmLeave: the browser warns before the page is left while there are unsaved changes.
        - readonly={$locked}: makes every field read-only and hides the submit bar; it follows the signal, so the
          "Kilitle" button below turns it on and off.
        - sections: groups of fields with a title, an optional description and an optional `cols` of its own (the
          second section forces a single column).
        - layout="grid" cols={2}: fields in a two-column grid; "stack" would put them in one column.
        - extraActions: extra buttons placed before cancel / submit. They are ordinary components, so this one flips
          $locked.
        - class="lab-form": added to the form element so the test (or your CSS) can find this instance. */}
    <Form class="lab-form" schema={Profile} initial={{ name: "Ece", city: "İzmir" }} validateOn="change"
      onChange={() => { $changes++ }} onReady={() => { $ready = "evet" }}
      onSubmit={(v: Record<string, unknown>) => { $saved = `${v.name} · ${v.city}` }}
      submitLabel="Kaydet" cancel cancelLabel="Vazgeç" requireDirty confirmLeave readonly={$locked}
      sections={[{ title: "Kimlik", fields: ["name", "city", "birthday"] }, { title: "Görünüm", description: "Profilinde gösterilir", fields: ["color", "bio", "public"], cols: 1 }]}
      layout="grid" cols={2}
      extraActions={<Button class="lab-lock" variant="ghost" on:click={() => { $locked = !$locked }}>{$locked ? "Kilidi aç" : "Kilitle"}</Button>} />
    {/* The state line: it reads the three signals, so it redraws as the callbacks above fire. */}
    <p class="lab-state" sx={{ text: "sm", color: "muted" }}>Kaydedilen: {$saved} · değişiklik: {$changes} · hazır: {$ready}</p>
    {/* The second Form shows the minimal switches:
        - the schema is passed inline as a plain object (no schema() call needed for a small form).
        - min: 6 is a minimum rule on the text.
        - actions={false}: no submit / cancel bar at all. Enter inside a text field still submits the form.
        - m:theme="night" on the Card (a common prop that works on every element and component) draws the whole
          subtree in the dark theme. */}
    <Card m:theme="night">
      <Form class="lab-plain" schema={{ code: { type: "text", label: "Davet kodu", required: true, min: 6 } }} actions={false} />
    </Card>
  </div>
}
