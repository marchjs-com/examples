// CardLab: the full-featured Card example; it uses every prop at least once.
//
// Props shown here: title, subtitle, actions (a list of nodes), footer, as, flush, plain (live), class, the body
// (children) and your own HTML attributes (id, aria-label...), which go to the root element.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CardLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Card, Button, Toggle } from "march/ui"
import { edit, trash } from "march/icons"

export function CardLab() {
  // Whether the first card is drawn without a frame, and how many times Sil was pressed (reactive state).
  let $plain = false
  let $removed = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Toggle label="Çerçevesiz" bind:value={$plain} />
    {/* The first card, with everything:
        - as="article": the root element (the default is a section); use article for a post or a product.
        - class and id: added to the root like on any element, so CSS or a test can find the card.
        - title (a heading, so the card is reachable with heading navigation) and subtitle: the header text.
        - plain as a function stays live: no frame (background, border, radius, shadow) while it is true.
        - actions: nodes shown in the header; here two small Buttons (a danger one counts presses).
        - footer: the row at the bottom; a function child inside keeps the counter text live.
        - The children are the body. */}
    <Card class="lab-card" id="lab-card" as="article" title="Başlık" subtitle="Alt başlık" plain={() => $plain}
      actions={[<Button size="sm" icon={edit}>Düzenle</Button>, <Button size="sm" variant="danger" icon={trash} on:click={() => $removed++}>Sil</Button>]}
      footer={<span>{() => `Silme sayısı: ${$removed}`}</span>}>
      Kartın gövdesi: istediğiniz her şey.
    </Card>
    {/* flush removes the body padding, for content that should touch the edges (tables, lists). aria-label is an
        ordinary attribute: it goes to the root element. */}
    <Card flush title="Kenar boşluksuz (flush)" aria-label="Liste kartı">
      <ul sx={{ m: 0 }}><li>Birinci satır</li><li>İkinci satır</li></ul>
    </Card>
    {/* m:theme="night" (a common prop) shows the card on a dark surface. With no title, subtitle or actions there is
        no header: only the body. */}
    <Card m:theme="night" as="div">Başlıksız, koyu zemin: yalnız gövde.</Card>
  </div>
}
