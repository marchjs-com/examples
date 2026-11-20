import { PropertyGrid, Toolbar, Button, type PropertyGridApi } from "march/ui"

// PropertyGrid'in bütün özellikleri: satırlar (kendi denetimi, açıklama, anahtar kelime, ad, yer tutucu, adım, birim,
// salt okunur, gizli, doğrulama), value + setValue + onChange, saved, onSave, ad, history (burada ızgaranın kendi küçük
// yığını: uygulamanın geri alma kaydına yazmaz), dirty (false: "kaydedilmedi" kaydına yazmaz), id, grup sırası, arama, yerleşim, api, başlık / satır /
// alt çubuk düğmeleri, değişiklik işaretleri, grup araçları, açık grupların saklanması, başta açık gruplar, metinler, sınıf.
const Faces = (p: { value?: unknown; setValue?: (v: unknown) => void }) => <div role="group" sx={{ flex: "row", gap: 1 }}>
  {["🙂", "🚀", "🌙"].map((e) => <Button size="sm" variant="ghost" pressed={p.value === e} on:click={() => p.setValue?.(e)}>{e}</Button>)}
</div>

const ROWS = [
  { key: "name", label: "Ad", group: "Kimlik", placeholder: "Proje adı", keywords: "başlık isim", name: "project-name", description: "Listelerde görünür" },
  { key: "icon", label: "Simge", group: "Kimlik", control: Faces },
  { key: "id", label: "Kimlik", group: "Kimlik", readonly: true },
  { key: "budget", label: "Bütçe", type: "number" as const, unit: "₺", step: 500, min: 0, group: "Plan", validate: (v: unknown) => (Number(v) > 10000 ? "En çok 10 000 ₺" : null) },
  { key: "public", label: "Herkese açık", type: "switch" as const, group: "Plan" },
  { key: "link", label: "Paylaşım bağlantısı", group: "Plan", hidden: (v: Record<string, unknown>) => !v.public },
]

// history: yalnız bu ızgaranın geri alma yığını (push, undo / redo, adım adları); başlıktaki Geri al / Yinele onu kullanır
type Step = { label: string; undo: () => void; redo: () => void }
function ownHistory() {
  let $past: Step[] = []
  let $future: Step[] = []
  return {
    push: (s: Step) => { $past = [s, ...$past]; $future = [] },
    undo: () => { const [s, ...rest] = $past; if (s) { s.undo(); $past = rest; $future = [s, ...$future] } },
    redo: () => { const [s, ...rest] = $future; if (s) { s.redo(); $future = rest; $past = [s, ...$past] } },
    canUndo: () => $past.length > 0, canRedo: () => $future.length > 0,
    past: () => $past.map((s) => s.label), future: () => $future.map((s) => s.label),
    markSaved: () => {},
  }
}

export function PropertyGridLab() {
  let $value: Record<string, unknown> = { name: "Mars", icon: "🚀", id: "p-42", budget: 4000, public: false, link: "marchjs.com/p/42" }
  let $saved: Record<string, unknown> = { ...$value }
  let $edits = 0
  let grid: PropertyGridApi | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <Toolbar label="Lab düğmeleri">
      <Button size="sm" variant="secondary" on:click={() => grid?.revert()}>Geri dön (api)</Button>
      <Button size="sm" variant="secondary" on:click={() => grid?.focus("budget")}>Bütçeye git</Button>
      <span sx={{ text: "sm" }}>düzenleme: {$edits} · kayıtlı ad: {String($saved.name)}</span>
    </Toolbar>
    <PropertyGrid
      properties={ROWS}
      value={$value}
      setValue={(v) => $value = v}
      onChange={() => $edits++}
      saved={$saved}
      onSave={(v) => { $saved = { ...v } }}
      label="Proje ayarları"
      history={ownHistory() as never}
      dirty={false}
      id="lab-project"
      groups={["Plan", "Kimlik"]}
      search
      layout="auto"
      api={(a) => grid = a}
      historyButtons
      resetButtons
      changeMarks
      footer
      groupTools
      persist="lab-pg"
      openGroups={["Plan", "Kimlik"]}
      labels={{ search: "Ayar ara", save: "Kaydet", revert: "Vazgeç", noChanges: "Değişiklik yok", unsaved: (n) => `${n} kaydedilmemiş`, changed: "değişti", empty: "Satır yok", noMatch: (q) => `"${q}" bulunamadı`, openAll: "Hepsini aç", closeAll: "Hepsini kapat" }}
      class="lab-pg"
    />
  </div>
}
