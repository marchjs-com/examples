// SearchBoxLab: the full-featured SearchBox example; it uses every prop at least once.
//
// Props shown here: bind:value, debounce, onInput / onSearch / onEnter, shortcut and shortcutHint, size, variant
// ("plain" = no border), icon and clear (off, or your own icon), clearLabel, label, the combobox props (controls,
// activeDescendant, expanded, onKeyDown), disabled, id, class, inputClass and inputRef.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SearchBoxLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SearchBox, Card, ListRow } from "march/ui"
import { Icon, filter, trash } from "march/icons"

const FRUITS = ["elma", "armut", "erik", "incir", "kiraz", "karpuz"]

// A small titled group, so each of the four demos below has a caption.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function SearchBoxLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. Here they show what each
  // callback received: $q is bound to the first box, $typed / $searched / $entered are the three callbacks, $refTag
  // proves inputRef ran; $fruitQ, $active and $picked drive the combobox; $filterQ belongs to the third box.
  let $q = ""
  let $typed = ""
  let $searched = ""
  let $entered = ""
  let $fruitQ = ""
  let $active = -1
  let $picked = ""
  let $filterQ = ""
  let $refTag = ""
  // A derived value (const $name): the fruits that contain the typed text, recomputed whenever $fruitQ changes.
  const $fruits = FRUITS.filter((f) => f.includes($fruitQ))
  // Keyboard handling for the combobox. SearchBox calls onKeyDown first; the arrow keys are not handled by the box
  // itself, so this function moves the highlight and Enter picks the highlighted fruit. preventDefault() stops the
  // caret from jumping and (for Enter) skips the box's own Enter handling.
  const keys = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); $active = Math.min($active + 1, $fruits.length - 1) }
    else if (e.key === "ArrowUp") { e.preventDefault(); $active = Math.max($active - 1, 0) }
    else if (e.key === "Enter" && $active >= 0) { e.preventDefault(); $picked = $fruits[$active] ?? "" }
  }
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Gecikmeli değer (debounce 800), onInput, onSearch, onEnter, kısayol Ctrl K">
      {/* The callbacks and their timing:
          - bind:value={$q}: two-way binding; the value is written after the debounce.
          - debounce={800}: wait 800 ms after the last key (the default is 250; 0 means no delay).
          - onInput: every keystroke, before the debounce. onSearch: the debounced text (and at once on Enter and on
            clear). onEnter: the Enter key.
          - shortcut="mod+k": focuses the box from anywhere with Ctrl+K (Cmd+K on a Mac); `true` would mean "/". The
            key is shown as a hint at the end of the box.
          - label / placeholder: the accessible name and the hint text. id: the input's id.
          - class: goes on the root (the role="search" wrapper); inputClass on the input element itself.
          - inputRef: receives the input element; here only its tag name is read to prove it ran. */}
      <SearchBox bind:value={$q} debounce={800} onInput={(x: string) => $typed = x} onSearch={(x: string) => $searched = x}
        onEnter={(x: string) => $entered = x} shortcut="mod+k" label="Ürün ara" placeholder="Ürün, marka…"
        id="lab-search" class="lab-search" inputClass="lab-search-input" inputRef={(el: HTMLInputElement) => $refTag = el.tagName} />
      <span>Yazılan: {$typed} · aranan: {$searched} · Enter: {$entered} · ref: {$refTag}</span>
    </Section>
    <Section title="Combobox: ok tuşları listede gezer, Enter seçer">
      {/* Combobox mode: the box filters a list that lives elsewhere.
          - controls="lab-fruits": the id of that list (the input gets role="combobox" and aria-controls).
          - activeDescendant: the id of the highlighted option ("" when none), so screen readers announce it while
            focus stays in the input.
          - expanded: whether the list is currently shown (here: only when something matches).
          - onKeyDown={keys}: the arrow keys and Enter are handled by the function above.
          - debounce={0}: the list follows every keystroke. onInput resets the highlight. */}
      <SearchBox bind:value={$fruitQ} debounce={0} onInput={() => $active = -1} label="Meyve seç"
        placeholder="Meyve ara…" controls="lab-fruits" activeDescendant={$active >= 0 ? `lab-fruit-${$active}` : ""} expanded={$fruits.length > 0} onKeyDown={keys} />
      {/* The list the box controls: a listbox whose rows are options. Their ids match the pattern used in
          activeDescendant, `selected` marks the highlighted one, and a click selects with the mouse. */}
      <div id="lab-fruits" role="listbox" aria-label="Meyveler" sx={{ flex: "col" }}>
        {$fruits.map((f, i) => <ListRow as="div" size="sm" id={`lab-fruit-${i}`} role="option" title={f} selected={i === $active}
          onClick={() => { $active = i; $picked = f }} />)}
      </div>
      <span>Seçilen: {$picked || "—"}</span>
    </Section>
    <Section title="Kendi ikonu ve temizle ikonu, küçük boy">
      {/* Replacing parts:
          - size="sm": the smaller box.
          - icon={<Icon …/>}: your own leading icon instead of the magnifier. clear={<Icon …/>}: your own icon in the
            clear button; clearLabel is that button's accessible name.
          - shortcut="/" with shortcutHint={false}: the "/" key still focuses the box but no key hint is drawn. */}
      <SearchBox bind:value={$filterQ} debounce={0} size="sm" icon={<Icon of={filter} />} clear={<Icon of={trash} />}
        clearLabel="Süzgeci temizle" placeholder="Süz…" label="Sipariş süz" shortcut="/" shortcutHint={false} />
      <span>Süzgeç: {$filterQ || "boş"}</span>
    </Section>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <Section title="Kenarsız, ikonsuz, temizlesiz; devre dışı">
        {/* variant="plain": no border or ring, for a box inside a panel that draws the frame (a command palette).
            icon={false} and clear={false} switch those parts off. disabled: the input cannot be used. */}
        <SearchBox variant="plain" icon={false} clear={false} placeholder="Komut yaz…" label="Komut" />
        <SearchBox disabled placeholder="Arama kapalı" label="Kapalı arama" />
      </Section>
    </Card>
  </div>
}
