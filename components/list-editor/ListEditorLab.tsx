import { ListEditor } from "march/ui"
import { chevronUp, chevronDown, trash } from "march/icons"

// ListEditor'un bütün özellikleri bir arada: bağlı değer (bind:value) ve onChange, en fazla (max), yinelenenler (unique),
// yer tutucu ve Ekle metni, erişilebilir adlar (labels), kendi ikonların (icons), sıralama / kaldırma / ekleme
// kapatma (sortable, removable, addable), salt okunur, devre dışı, geçersiz (invalid + describedby), labelledby,
// odak kaybı (onBlur), id ve sınıf
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ListEditorLab() {
  let $drinks = ["kahve", "çay", "su"]
  let $queue = ["Ali"]
  let $full = ["pazartesi", "salı", "çarşamba"]
  let $changes = 0
  let $blurs = 0
  const $empty = $drinks.length === 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Bağlı değer, onChange, kendi ad ve ikonlar">
      <span id="lab-drinks">İçecekler</span>
      <ListEditor bind:value={$drinks} onChange={() => $changes++} onBlur={() => $blurs++} labelledby="lab-drinks"
        id="lab-drink-input" class="lab-drinks" placeholder="İçecek ekle" addLabel="Ekle"
        labels={{ item: (n: number) => `${n}. içecek`, moveUp: "Yukarı taşı", moveDown: "Aşağı taşı", remove: "Listeden çıkar" }}
        icons={{ up: chevronUp, down: chevronDown, remove: trash }}
        invalid={$empty} describedby={$empty ? "lab-drinks-error" : undefined} />
      <span id="lab-drinks-error" sx={{ text: "sm", color: "danger" }}>{$empty ? "En az bir içecek gerekli" : ""}</span>
      <span>Liste: {$drinks.join(" · ")}</span>
      <span sx={{ text: "sm", color: "muted" }}>Değişiklik: {$changes} · odak kaybı: {$blurs}</span>
    </Section>
    <Section title="Yinelenenlere izin (unique={false}), sıralama yok">
      <ListEditor bind:value={$queue} unique={false} sortable={false} placeholder="Sıraya ad yaz" addLabel="Yine de ekle" />
      <span>Sıra: {$queue.join(" · ")}</span>
    </Section>
    <Section title="En fazla 3 (max), kaldırma düğmesi yok">
      <ListEditor bind:value={$full} max={3} removable={false} placeholder="Gün ekle" addLabel="Dolu" />
    </Section>
    <Section title="Yalnız düzenleme (addable={false}), salt okunur, devre dışı">
      <ListEditor value={["ilk", "ikinci"]} addable={false} labels={{ item: (n: number) => `Sabit satır ${n}` }} />
      <ListEditor value={["arşiv"]} readonly labels={{ item: () => "Salt okunur satır" }} />
      <ListEditor value={["kilitli"]} disabled placeholder="Kilitli liste" />
    </Section>
  </div>
}
