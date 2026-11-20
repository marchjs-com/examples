import { KeyValueEditor, CodeView } from "march/ui"
import { trash } from "march/icons"

// KeyValueEditor'un bütün özellikleri bir arada: bağlı değer (bind:value) ve onChange, sayılar (numbers),
// yer tutucular (keyPlaceholder, valuePlaceholder), metinler (labels: key, value, remove, add, duplicate),
// kendi kaldırma ikonun (removeIcon), kaldırma / ekleme kapatma (removable, addable), salt okunur, devre dışı,
// labelledby, odak kaybı (onBlur), id ve sınıf
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function KeyValueEditorLab() {
  let $plans: Record<string, string | number> = { free: 1, team: 10 }
  let $headers: Record<string, string | number> = { Accept: "application/json" }
  let $changes = 0
  let $blurs = 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Sayılar, kendi metinleri ve ikonu, onChange">
      <span id="lab-plans">Plan kotaları</span>
      <KeyValueEditor bind:value={$plans} numbers onChange={() => $changes++} onBlur={() => $blurs++}
        id="lab-plan-key" class="lab-plans" labelledby="lab-plans" keyPlaceholder="ör. pro" valuePlaceholder="ör. 25"
        labels={{ key: "Plan", value: "Koltuk", remove: "Planı sil", add: "Plan ekle", duplicate: "Bu plan zaten var" }}
        removeIcon={trash} />
      <CodeView code={() => JSON.stringify($plans)} lang="json" label="Kota" toolbar={false} />
      <span sx={{ text: "sm", color: "muted" }}>Değişiklik: {$changes} · odak kaybı: {$blurs}</span>
    </Section>
    <Section title="Metin olarak (numbers yok), kaldırma düğmesi yok">
      <KeyValueEditor bind:value={$headers} removable={false} labels={{ key: "Başlık", value: "Başlık değeri", add: "Başlık ekle" }} />
      <CodeView code={() => JSON.stringify($headers)} lang="json" label="Başlıklar" toolbar={false} />
    </Section>
    <Section title="Ekleme yok (addable={false}), salt okunur, devre dışı">
      <KeyValueEditor value={{ "renk": "mavi" }} addable={false} labels={{ key: "Sabit anahtar", value: "Sabit değer" }} />
      <KeyValueEditor value={{ "sürüm": "0.2.0" }} readonly labels={{ key: "Salt okunur anahtar", value: "Salt okunur değer" }} />
      <KeyValueEditor value={{ "bölge": "eu" }} disabled labels={{ key: "Kilitli anahtar", value: "Kilitli değer" }} />
    </Section>
  </div>
}
