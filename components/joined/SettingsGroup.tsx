import { Joined, ListRow, Toggle } from "march/ui"
import { bell, moon, globe } from "march/icons"

// ayarlar grubu: satırlar alt alta, aralarında ince çizgi, bütünün tek çerçevesi
export function SettingsGroup() {
  let $notify = true
  let $dark = false
  return <Joined radius={3}>
    <ListRow icon={bell} title="Bildirimler" trail={<Toggle label="Bildirimler" bind:value={$notify} />} />
    <ListRow icon={moon} title="Koyu tema" trail={<Toggle label="Koyu tema" bind:value={$dark} />} />
    <ListRow icon={globe} title="Dil" subtitle="Türkçe" />
  </Joined>
}
