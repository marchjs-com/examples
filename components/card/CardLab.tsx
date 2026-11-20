import { Card, Button, Toggle } from "march/ui"
import { edit, trash } from "march/icons"

// Card'ın bütün özellikleri bir arada: title, subtitle, actions (düğüm dizisi), footer, as, flush, plain (canlı),
// class, gövde (children) ve kendi HTML öznitelikleri (id, aria-label…)
export function CardLab() {
  let $plain = false
  let $removed = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Toggle label="Çerçevesiz" bind:value={$plain} />
    <Card class="lab-card" id="lab-card" as="article" title="Başlık" subtitle="Alt başlık" plain={() => $plain}
      actions={[<Button size="sm" icon={edit}>Düzenle</Button>, <Button size="sm" variant="danger" icon={trash} on:click={() => $removed++}>Sil</Button>]}
      footer={<span>{() => `Silme sayısı: ${$removed}`}</span>}>
      Kartın gövdesi: istediğiniz her şey.
    </Card>
    <Card flush title="Kenar boşluksuz (flush)" aria-label="Liste kartı">
      <ul sx={{ m: 0 }}><li>Birinci satır</li><li>İkinci satır</li></ul>
    </Card>
    <Card m:theme="night" as="div">Başlıksız, koyu zemin: yalnız gövde.</Card>
  </div>
}
