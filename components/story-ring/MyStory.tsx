import { StoryRing, Card } from "march/ui"
import { star } from "march/icons"

// kendi hikâyen: + rozeti, basınca yükleniyor halkası
export function MyStory() {
  let $loading = false
  return <Card m:theme="night">
    <StoryRing name="Siz" add addIcon={star} size="lg" label="Hikâyen" loading={$loading} m:color="brand-purple"
      onClick={() => { $loading = true; setTimeout(() => $loading = false, 1200) }} />
  </Card>
}
