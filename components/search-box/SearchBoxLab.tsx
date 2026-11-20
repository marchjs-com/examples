import { SearchBox, Card, ListRow } from "march/ui"
import { Icon, filter, trash } from "march/icons"

// SearchBox'ın bütün özellikleri bir arada: bağlı değer (bind:value), gecikme (debounce), onInput / onSearch / onEnter,
// kısayol ve ipucu (shortcut, shortcutHint), boyut, kenarsız görünüm, ikon ve temizle düğmesi (kapalı ya da kendi
// ikonun, clearLabel), erişilebilir ad (label), combobox kipi (controls, activeDescendant, expanded, onKeyDown),
// devre dışı, id, sınıf, inputClass ve inputRef
const FRUITS = ["elma", "armut", "erik", "incir", "kiraz", "karpuz"]

const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function SearchBoxLab() {
  let $q = ""
  let $typed = ""
  let $searched = ""
  let $entered = ""
  let $fruitQ = ""
  let $active = -1
  let $picked = ""
  let $filterQ = ""
  let $refTag = ""
  const $fruits = FRUITS.filter((f) => f.includes($fruitQ))
  const keys = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); $active = Math.min($active + 1, $fruits.length - 1) }
    else if (e.key === "ArrowUp") { e.preventDefault(); $active = Math.max($active - 1, 0) }
    else if (e.key === "Enter" && $active >= 0) { e.preventDefault(); $picked = $fruits[$active] ?? "" }
  }
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Gecikmeli değer (debounce 800), onInput, onSearch, onEnter, kısayol Ctrl K">
      <SearchBox bind:value={$q} debounce={800} onInput={(x: string) => $typed = x} onSearch={(x: string) => $searched = x}
        onEnter={(x: string) => $entered = x} shortcut="mod+k" label="Ürün ara" placeholder="Ürün, marka…"
        id="lab-search" class="lab-search" inputClass="lab-search-input" inputRef={(el: HTMLInputElement) => $refTag = el.tagName} />
      <span>Yazılan: {$typed} · aranan: {$searched} · Enter: {$entered} · ref: {$refTag}</span>
    </Section>
    <Section title="Combobox: ok tuşları listede gezer, Enter seçer">
      <SearchBox bind:value={$fruitQ} debounce={0} onInput={() => $active = -1} label="Meyve seç"
        placeholder="Meyve ara…" controls="lab-fruits" activeDescendant={$active >= 0 ? `lab-fruit-${$active}` : ""} expanded={$fruits.length > 0} onKeyDown={keys} />
      <div id="lab-fruits" role="listbox" aria-label="Meyveler" sx={{ flex: "col" }}>
        {$fruits.map((f, i) => <ListRow as="div" size="sm" id={`lab-fruit-${i}`} role="option" title={f} selected={i === $active}
          onClick={() => { $active = i; $picked = f }} />)}
      </div>
      <span>Seçilen: {$picked || "—"}</span>
    </Section>
    <Section title="Kendi ikonu ve temizle ikonu, küçük boy">
      <SearchBox bind:value={$filterQ} debounce={0} size="sm" icon={<Icon of={filter} />} clear={<Icon of={trash} />}
        clearLabel="Süzgeci temizle" placeholder="Süz…" label="Sipariş süz" shortcut="/" shortcutHint={false} />
      <span>Süzgeç: {$filterQ || "boş"}</span>
    </Section>
    <Card m:theme="night">
      <Section title="Kenarsız, ikonsuz, temizlesiz; devre dışı">
        <SearchBox variant="plain" icon={false} clear={false} placeholder="Komut yaz…" label="Komut" />
        <SearchBox disabled placeholder="Arama kapalı" label="Kapalı arama" />
      </Section>
    </Card>
  </div>
}
