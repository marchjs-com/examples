import { Form, Card, Button } from "march/ui"
import { schema } from "march/schema"

// Form'un bütün özellikleri: schema, initial, onSubmit, validateOn, onChange, submitLabel, cancel, cancelLabel,
// sections, actions, confirmLeave, requireDirty, readonly, onReady, extraActions, layout, cols, class
const Profile = schema({
  name: { type: "text", label: "Ad", required: true },
  city: { type: "pick", label: "Şehir", options: ["İstanbul", "Ankara", "İzmir"] },
  birthday: { type: "date", label: "Doğum günü" },
  color: { type: "color", label: "Sevdiğin renk" },
  bio: { type: "textarea", label: "Hakkında", max: 200 },
  public: { type: "bool", label: "Profil herkese açık", control: "switch" },
})

export function FormLab() {
  let $saved = "—"
  let $changes = 0
  let $ready = "hayır"
  let $locked = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Form class="lab-form" schema={Profile} initial={{ name: "Ece", city: "İzmir" }} validateOn="change"
      onChange={() => { $changes++ }} onReady={() => { $ready = "evet" }}
      onSubmit={(v: Record<string, unknown>) => { $saved = `${v.name} · ${v.city}` }}
      submitLabel="Kaydet" cancel cancelLabel="Vazgeç" requireDirty confirmLeave readonly={$locked}
      sections={[{ title: "Kimlik", fields: ["name", "city", "birthday"] }, { title: "Görünüm", description: "Profilinde gösterilir", fields: ["color", "bio", "public"], cols: 1 }]}
      layout="grid" cols={2}
      extraActions={<Button class="lab-lock" variant="ghost" on:click={() => { $locked = !$locked }}>{$locked ? "Kilidi aç" : "Kilitle"}</Button>} />
    <p class="lab-state" sx={{ text: "sm", color: "muted" }}>Kaydedilen: {$saved} · değişiklik: {$changes} · hazır: {$ready}</p>
    <Card m:theme="night">
      <Form class="lab-plain" schema={{ code: { type: "text", label: "Davet kodu", required: true, min: 6 } }} actions={false} />
    </Card>
  </div>
}
