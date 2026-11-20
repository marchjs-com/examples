import { OptionList, SearchBox, Card, Kbd } from "march/ui"
import { heading, list, quote, code, image, minus } from "march/icons"

// bir yazı editörünün "/" menüsü: yazdıkça süzülür, odak alanda kalır (keysFrom), ↑ ↓ ve Enter blok ekler
const blocks = [
  { value: "h2", label: "Başlık", icon: heading, hint: "Bölüm başlığı", trailing: <Kbd>#</Kbd>, group: "Metin" },
  { value: "ul", label: "Madde listesi", icon: list, hint: "Noktalı liste", trailing: <Kbd>-</Kbd>, group: "Metin" },
  { value: "quote", label: "Alıntı", icon: quote, hint: "Vurgulu alıntı", group: "Metin" },
  { value: "code", label: "Kod bloğu", icon: code, hint: "Renkli kod", group: "Ekle" },
  { value: "img", label: "Görsel", icon: image, hint: "Yükle ya da bağla", group: "Ekle" },
  { value: "hr", label: "Ayırıcı", icon: minus, hint: "Yatay çizgi", group: "Ekle" },
]

export function SlashMenu() {
  let $q = ""
  let $doc: string[] = ["Başlık"]
  let input: HTMLInputElement | undefined
  const found = () => blocks.filter((b) => b.label.toLocaleLowerCase("tr").includes($q.toLocaleLowerCase("tr")))
  const add = (v: string) => { $doc = [...$doc, blocks.find((b) => b.value === v)?.label ?? v]; $q = "" }
  return <Card title="Blok ekle">
    <SearchBox size="sm" debounce={0} bind:value={$q} placeholder="/ yazın… (↑ ↓ Enter)" inputRef={(el: HTMLInputElement) => { input = el }} />
    <OptionList keysFrom={() => input} options={found} onPick={add} check={false} size="sm" empty="Böyle bir blok yok" label="Bloklar" />
    <p sx={{ text: "sm", color: "muted" }}>{`Belge: ${$doc.join(" · ")}`}</p>
  </Card>
}
