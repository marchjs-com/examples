import { useForm, Alert } from "march/ui"
import { Wizard } from "march/components/wizard"

// bir etkinliğe kayıt: kişi bilgileri (ızgara düzen), bilet seçimi (kontenjan denetimi) ve gönderilmeden önce bir özet
const SEATS_LEFT = 4

export function EventSignup() {
  let $sent = ""
  const form = useForm({
    name: { type: "text", label: "Ad soyad", required: true },
    email: { type: "email", label: "E-posta", required: true },
    ticket: { type: "pick", label: "Bilet", options: ["Standart", "Öğrenci", "Destekçi"], default: "Standart" },
    count: { type: "int", label: "Kişi sayısı", min: 1, max: 10, default: 1 },
    note: { type: "textarea", label: "Not (isteğe bağlı)" },
  }, {}, { onSubmit: (v) => { $sent = `${v.name}, ${v.count} kişilik ${v.ticket} biletin ${v.email} adresine gönderildi.` } })
  return <div sx={{ flex: "col", gap: 3 }}>
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
    {$sent ? <Alert tone="success" title="Kayıt alındı">{$sent}</Alert> : null}
  </div>
}
