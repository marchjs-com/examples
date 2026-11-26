// OptionListLab: the full-featured OptionList example; it uses every prop at least once.
//
// OptionList is a list of choices inside a panel: a radio group by default, a listbox (one or many values) or a menu of
// commands. Props shown here: options (icon, hint, trailing, group, disabled), bind:value / value + setValue, onPick,
// multiple, mode (radio, listbox, menu), keysFrom and active (a text field drives the list), keys={false} (the owner
// handles keys), overflow, label, id, check (a tick, none, your own icon, a function), columns, size, inline, empty,
// renderOption and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// OptionListLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { OptionList, Card, Badge, Kbd, TextInput } from "march/ui"
import { signal } from "march"
import { sun, moon, monitor, star, copy, pin, trash, heart } from "march/icons"

// Options of the single-choice list. Fields worth copying: icon (lead of the row), hint (small second line), group
// (rows with the same group follow one heading), trailing (a node at the end of the row, here a Badge) and
// disabled (visible but cannot be chosen).
const themes = [
  { value: "light", label: "Açık", icon: sun, hint: "Gündüz için", group: "Hazır" },
  { value: "dark", label: "Koyu", icon: moon, hint: "Gözü yormaz", group: "Hazır" },
  { value: "system", label: "Sistem", icon: monitor, hint: "Cihazı izler", group: "Hazır", trailing: <Badge tone="info">yeni</Badge> },
  { value: "contrast", label: "Yüksek karşıtlık, çok uzun bir etiketle", icon: star, hint: "Yakında", group: "Kendi", disabled: true },
]
// Commands for the menu: a keyboard shortcut as the trailing part, and a hint under a label.
const actions = [
  { value: "copy", label: "Kopyala", icon: copy, trailing: <Kbd>Ctrl C</Kbd> },
  { value: "pin", label: "Sabitle", icon: pin },
  { value: "delete", label: "Sil", icon: trash, hint: "Geri alınamaz" },
]
const tags = ["tasarım", "ürün", "yayın", "destek"].map((t) => ({ value: t, label: t }))

// One section of the Lab: a small muted heading and the example under it. Plain composition, no OptionList feature.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function OptionListLab() {
  // Reactive state of the examples, plus the text field element and two signals for the highlighted row (see below).
  let $theme = "dark"
  let $tags = ["ürün"]
  let $did = "—"
  let $q = ""
  let input: HTMLInputElement | undefined
  // `active` takes a signal holding the index of the highlighted row, so code outside the list can read or set it.
  const hi = signal(0)
  const driven = signal(1)
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Tek seçim (radio), gruplar, ikon, açıklama, sondaki parça, devre dışı, uzun etiket, id">
      {/* Single choice (mode "radio" is the default): a radiogroup of radio rows with aria-checked. One Tab stop;
          the arrow keys move and step over disabled rows, Enter or Space chooses.
          - bind:value: two-way binding of the chosen value. label: the accessible name of the list.
          - id: the rows get ids "<id>-<index>". class: a class on the root for CSS or tests.
          - overflow="wrap": a long label wraps (the default cuts it with an ellipsis). */}
      <OptionList bind:value={$theme} options={themes} label="Tema" id="lab-theme" class="lab-theme" overflow="wrap" />
      <span>{`Tema: ${$theme}`}</span>
    </Section>
    <Section title="Çoklu seçim (listbox), iki sütun, küçük boy, kendi işaretin">
      {/* multiple: a listbox where several values can be chosen (aria-multiselectable); the value is an array.
          value + setValue is the same as bind:value written out: it shows the value and receives every change.
          columns={2}: a two-column grid. size="sm": smaller rows. check={heart}: your own icon as the tick. */}
      <OptionList multiple options={tags} value={$tags} setValue={(v: string[]) => { $tags = v }} columns={2} size="sm" check={heart} label="Etiketler" />
      <span>{`Etiketler: ${$tags.join(", ") || "—"}`}</span>
    </Section>
    <Section title="Komut menüsü (menu), açıklama yanda, onPick">
      {/* mode="menu" without a value: the rows are commands (menuitem) and nothing stays chosen; onPick gets the value
          of the picked row (click, Enter or Space). inline: the hint sits beside the label instead of under it. */}
      <OptionList mode="menu" options={actions} inline onPick={(v: string) => { $did = v }} label="İşlemler" />
      <span>{`Son işlem: ${$did}`}</span>
    </Section>
    <Section title="Alanın tuşlarıyla (keysFrom + active), boş liste metni, işaretsiz">
      {/* A text field drives the list: keysFrom points at the field, so focus stays in the field while its arrow keys
          and Enter move and choose in the list (the field gets aria-controls and aria-activedescendant).
          - active={hi}: the signal that holds the highlighted row (shown below).
          - options as a function: the list is re-filtered whenever the text changes.
          - check={false}: no tick on the chosen row. empty: the text shown when no option is left. */}
      <TextInput bind:value={$q} aria-label="Tema ara" placeholder="Tema ara" ref={(el: HTMLInputElement) => { input = el }} />
      <OptionList keysFrom={() => input} active={hi} options={() => themes.filter((t) => t.label.toLowerCase().includes($q.toLowerCase()))}
        bind:value={$theme} check={false} empty="Eşleşen tema yok" label="Arama sonuçları" />
      <span>{`Vurgulanan: ${hi()}`}</span>
    </Section>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Section title="Sahibi yönetir (keys={false}), kendi satır çizimi (renderOption), fonksiyon işaret">
        {/* keys={false}: the list installs no key listener; the owner of the list handles the keys (as a Combobox does)
            and moves the highlight through `active`. Here nothing moves it, so the highlight stays on index 1.
            - check as a function: returns the node used as the tick.
            - renderOption(option, state): draws the inside of a row yourself; state.active() and state.selected() tell
              whether the row is highlighted or chosen, so the row can show that (here an arrow and a text). */}
        <OptionList keys={false} active={driven} options={themes.slice(0, 3)} value={$theme} label="Koyu tema listesi" id="lab-driven"
          check={() => <span>✓</span>}
          renderOption={(o: { label: unknown }, st: { active: () => boolean; selected: () => boolean }) => <span sx={{ flex: "row", gap: 2 }}>{o.label as string}{st.active() ? " ←" : ""}{st.selected() ? " (seçili)" : ""}</span>} />
      </Section>
    </Card>
  </div>
}
