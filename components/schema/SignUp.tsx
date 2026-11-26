// SignUp: the real-life Form example.
//
// What it shows: a sign-up form with the behaviour a real one needs: rules per field, fields that appear only for one
// plan, a submit that takes time (the button shows its loading state) and a server error that lands under the field
// it belongs to. Try an e-mail that ends with "@taken.com" to see the server error.
// When to use this pattern: any form that talks to a server. Keep the rules in the schema and the server call in
// onSubmit; the Form handles the busy state and the error display.
import { Form, Card, toast } from "march/ui"
import { schema } from "march/schema"

// One entry per field:
// - required, max, min: the rules of a field (seats must stay between 2 and 500).
// - autocomplete: the browser hint, so password managers and autofill fill the right fields.
// - help: hint text under the field.
// - plan: a two-option pick drawn as segmented buttons; its default is "team".
// - when: a function of the current values; the field is only drawn while it returns true. Here
//   `seats` and `budget` belong to the team plan only, so choosing the free plan makes them disappear.
// - money with currency: an amount field in that currency.
const SignUpForm = schema({
  name: { type: "text", label: "Ad soyad", required: true, max: 60, autocomplete: "name" },
  email: { type: "email", label: "E-posta", required: true },
  password: { type: "password", label: "Parola", required: true, min: 10, autocomplete: "new-password", help: "En az 10 karakter" },
  plan: { type: "pick", label: "Plan", options: [{ value: "free", label: "Ücretsiz" }, { value: "team", label: "Ekip" }], default: "team", control: "segmented" },
  seats: { type: "int", label: "Koltuk", min: 2, max: 500, default: 5, when: (v: Record<string, unknown>) => v.plan === "team" },
  budget: { type: "money", label: "Aylık bütçe", currency: "TRY", when: (v: Record<string, unknown>) => v.plan === "team" },
  newsletter: { type: "bool", label: "Ürün haberlerini gönder", control: "switch" },
})

export function SignUp() {
  // Card frames the form and gives it a title.
  return <Card title="Hesap oluştur">
    {/* layout="grid" cols={2}: the fields sit in two columns. submitLabel is the submit button's text.
        onSubmit may be async: while its promise is pending the Form is busy (the submit button shows its loading
        state), and it runs only when the schema rules pass. If it throws an error that carries `fieldErrors`, the
        message is shown under that field (here email) instead of as a general error; this is how a server's
        "already registered" answer reaches the right place. The setTimeout only imitates a slow server. */}
    <Form schema={SignUpForm} layout="grid" cols={2} submitLabel="Hesap oluştur"
      onSubmit={async (v: Record<string, unknown>) => {
        await new Promise((r) => setTimeout(r, 700))
        if (String(v.email).endsWith("@taken.com")) throw Object.assign(new Error("Reddedildi"), { fieldErrors: { email: "Bu adres zaten kayıtlı" } })
        toast(`Hoş geldin, ${v.name}!`, { kind: "success" })
      }} />
  </Card>
}
