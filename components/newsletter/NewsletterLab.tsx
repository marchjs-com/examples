import { Newsletter } from "march/landing"
import { Toggle, Card } from "march/ui"
import { heart, Icon } from "march/icons"

// Newsletter'ın bütün özellikleri bir arada: gönderme (onSubmit: başarı ya da hata), başlık, açıklama, yer tutucu,
// düğme metni, not, teşekkür satırı, düzen, kendi metinler (labels), onay simgesi, hareket ve sınıf
export function NewsletterLab() {
  let $stacked = false
  let $fail = false
  let $motion = false
  let $ownIcon = false
  let $count = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Alt alta" bind:value={$stacked} />
        <Toggle label="Sunucu hatası" bind:value={$fail} />
        <Toggle label="Hareket" bind:value={$motion} />
        <Toggle label="Kalp simgesi" bind:value={$ownIcon} />
      </div>
      <p sx={{ color: "muted" }}>{$count} abone</p>
    </Card>
    {() => {
      // sinyaller burada okunur: değişince form yeniden çizilir
      const stacked = $stacked, fail = $fail, motion = $motion, ownIcon = $ownIcon
      return <Newsletter class="lab-nl" layout={stacked ? "stacked" : "inline"} motion={motion}
        title="Haberdar ol" lead="Ayda bir e-posta." placeholder="adın@ornek.com" button="Kaydol"
        note="İstediğin an ayrılabilirsin." done="Görüşmek üzere!"
        doneIcon={ownIcon ? <Icon of={heart} /> as Node : true}
        labels={{ email: "E-posta adresin", invalid: "Geçerli bir adres yaz.", error: "Bir sorun çıktı." }}
        onSubmit={() => { if (fail) throw new Error(""); $count++ }} />
    }}
  </div>
}
