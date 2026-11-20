import { LinkCard, Avatar, Button, Card } from "march/ui"
import { Icon, star, gitBranch, sparkles, chevronRight } from "march/icons"

// LinkCard'ın bütün özellikleri bir arada: href (kartın tamamı bağlantı), title (canlı), description, icon, tone, color
// (tona baskın), lead (karo yerine kendi düğümün), meta (canlı), arrow (true, false ya da kendi işaretin), class ve
// öteki öznitelikler (id, data-*); bağlantılar vitrinin gerçek sayfalarına gider
export function LinkCardLab() {
  let $stars = 41
  let $renamed = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => $stars++}>Yıldız ver</Button>
      <Button size="sm" variant="ghost" on:click={() => $renamed = !$renamed}>Başlığı değiştir</Button>
    </div>
    <LinkCard href="/data/table" icon={star} tone="warn" title="Tablo" description="10.000 satır, sıralama, seçim"
      meta={`★ ${$stars}`} class="lab-table" data-kind="veri" />
    <LinkCard href="/data/tree" icon={gitBranch} color="brand-purple" title={$renamed ? "Ağaç görünümü" : "Ağaç"}
      description="Ok tuşlarıyla gezinme" arrow={false} class="lab-noarrow" id="agac" />
    <LinkCard href="/buttons/button" lead={<Avatar name="March Düğme" size="md" decorative />} title="Düğme"
      description="Kendi baş düğümü (lead) ve kendi ok işareti" arrow={<Icon of={chevronRight} /> as Node} class="lab-lead" />
    <Card m:theme="night">
      <LinkCard href="/buttons/icon-button" icon={sparkles} tone="pink" title="İkon düğmesi" meta="yeni" class="lab-night" />
    </Card>
  </div>
}
