import { useForm, Button, Badge, Card } from "march/ui"
import { Wizard, type WizardApi } from "march/components/wizard"

// Wizard'ın bütün özellikleri: şema ve başlangıç değerleri, adım başına alanlar ve ek doğrulama (alan hatası ya da
// adım mesajı), kendi gövdesi olan bir özet adımı, ızgara düzen, anında hata (validateOn), adım olayı (onStep),
// dışarıdan gezinme (onReady), kendi metinler, sınıf; altta var olan bir formla (form) parçaları kapalı ikinci sihirbaz
export function WizardLab() {
  let $step = 0
  let $done = ""
  let $invited = ""
  let api: WizardApi | undefined
  // march/ui'de schema() yok: useForm bir alan tanımından şemayı kurar, Wizard'a o şema verilir
  const shop = useForm({
    shop: { type: "text", label: "Mağaza adı", required: true },
    city: { type: "text", label: "Şehir" },
    plan: { type: "pick", label: "Paket", options: ["Başlangıç", "Pro"] },
    seats: { type: "int", label: "Kişi", min: 1, max: 50 },
  }).schema
  const invite = useForm({ email: { type: "email", label: "Davet e-postası", required: true } }, {},
    { onSubmit: (v) => { $invited = `${v.email} davet edildi` } })
  return <div sx={{ flex: "col", gap: 3 }}>
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
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Badge tone="primary">{`Adım ${$step + 1}`}</Badge>
      <Button size="sm" variant="ghost" on:click={() => api?.go(2)}>Özete atla</Button>
      <span sx={{ color: "success" }}>{$done}</span>
    </div>
    <Card m:theme="night">
      <Wizard form={invite} stepper={false} progress={false} count={false} backButton={false} submitLabel="Davet gönder"
        steps={[{ title: "Ekip arkadaşını davet et", fields: ["email"] }]} />
      <span sx={{ color: "brand-gold" }}>{$invited}</span>
    </Card>
  </div>
}
