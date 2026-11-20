import { PanelHeader, IconButton, Card } from "march/ui"
import { music } from "march/icons"
import { shuffle } from "march/icons/lucide"

// çalma listesi paneli: koyu zeminde ikonlu başlık, şarkı sayısı, karıştır düğmesi
export function MusicPanel() {
  let $shuffle = false
  return <Card m:theme="night">
    <PanelHeader icon={music} m:color="brand-pink" title="Gece Yolu" subtitle="Çalma listesi" meta={<span>12 şarkı</span>}
      actions={<IconButton icon={shuffle} label="Karıştır" pressed={$shuffle} on:click={() => $shuffle = !$shuffle} />} close={false} />
    <p sx={{ p: 2, text: "sm" }}>{$shuffle ? "Karışık çalıyor" : "Sırayla çalıyor"}</p>
  </Card>
}
