import { Form, Card, toast } from "march/ui"
import { schema } from "march/schema"

// kayıt formu: koşullu alanlar (plan = ekip), canlı doğrulama, gönderimde yükleniyor; sunucu hatası alanın altına düşer
// (deneyin: e-posta "...@taken.com" ile bitsin)
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
  return <Card title="Hesap oluştur">
    <Form schema={SignUpForm} layout="grid" cols={2} submitLabel="Hesap oluştur"
      onSubmit={async (v: Record<string, unknown>) => {
        await new Promise((r) => setTimeout(r, 700))
        if (String(v.email).endsWith("@taken.com")) throw Object.assign(new Error("Reddedildi"), { fieldErrors: { email: "Bu adres zaten kayıtlı" } })
        toast(`Hoş geldin, ${v.name}!`, { kind: "success" })
      }} />
  </Card>
}
