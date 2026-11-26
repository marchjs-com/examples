// SlashMenu: the real-life OptionList example.
//
// The "/" menu of a writing editor: type to filter the blocks, focus stays in the field (keysFrom), and the arrow keys
// and Enter insert a block. Use this pattern for suggestions under any field: the field keeps the caret and the list is
// only a passenger, driven by the field's own keys.
import { OptionList, SearchBox, Card, Kbd } from "march/ui"
import { heading, list, quote, code, image, minus } from "march/icons"

// Blocks that can be inserted. `group` makes the headings ("Metin" and "Ekle"), `trailing` shows a keyboard hint at the
// end of a row (a Kbd), `hint` is the small second line.
const blocks = [
  { value: "h2", label: "Başlık", icon: heading, hint: "Bölüm başlığı", trailing: <Kbd>#</Kbd>, group: "Metin" },
  { value: "ul", label: "Madde listesi", icon: list, hint: "Noktalı liste", trailing: <Kbd>-</Kbd>, group: "Metin" },
  { value: "quote", label: "Alıntı", icon: quote, hint: "Vurgulu alıntı", group: "Metin" },
  { value: "code", label: "Kod bloğu", icon: code, hint: "Renkli kod", group: "Ekle" },
  { value: "img", label: "Görsel", icon: image, hint: "Yükle ya da bağla", group: "Ekle" },
  { value: "hr", label: "Ayırıcı", icon: minus, hint: "Yatay çizgi", group: "Ekle" },
]

export function SlashMenu() {
  // The typed text, the "document" (the labels of the inserted blocks) and the field's element (filled by inputRef).
  let $q = ""
  let $doc: string[] = ["Başlık"]
  let input: HTMLInputElement | undefined
  // The matching blocks; toLocaleLowerCase("tr") keeps Turkish letters correct when comparing.
  const found = () => blocks.filter((b) => b.label.toLocaleLowerCase("tr").includes($q.toLocaleLowerCase("tr")))
  // Insert the picked block into the document and clear the field.
  const add = (v: string) => { $doc = [...$doc, blocks.find((b) => b.value === v)?.label ?? v]; $q = "" }
  return <Card title="Blok ekle">
    {/* The field. debounce={0}: filter on every keystroke (no waiting). inputRef hands the real <input> element to the
        code above, which passes it to the list. */}
    <SearchBox size="sm" debounce={0} bind:value={$q} placeholder="/ yazın… (↑ ↓ Enter)" inputRef={(el: HTMLInputElement) => { input = el }} />
    {/* - keysFrom: the list is driven by that field: its ↑ ↓ and Enter move and choose while the focus stays in the
          field (the field gets aria-controls and aria-activedescendant, the highlighted row scrolls into view).
        - options as a function: the list shrinks as you type. onPick: runs on Enter or a click on a row.
        - check={false}: no tick (this is a command list, nothing stays chosen). size="sm": compact rows.
        - empty: the text when nothing matches. label: the accessible name of the list. */}
    <OptionList keysFrom={() => input} options={found} onPick={add} check={false} size="sm" empty="Böyle bir blok yok" label="Bloklar" />
    <p sx={{ text: "sm", color: "muted" }}>{`Belge: ${$doc.join(" · ")}`}</p>
  </Card>
}
