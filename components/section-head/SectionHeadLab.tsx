import { SectionHead } from "march/landing"
import { Segmented, Toggle, Badge, Card, Button } from "march/ui"
import { arrowRight, play } from "march/icons"

// SectionHead'in bütün özellikleri bir arada: üst etiket (kendi düğümün) ve bağlantısı, başlık, başlık öğesi ve kimliği,
// açıklama, eylemler (nesne ve kendi düğümün; ikon, varyant, tıklama, bağlantı), not, hiza, ölçek, genişlik, giriş
// hareketi, sınıf ve içerik (children)
export function SectionHeadLab() {
  let $size: "sm" | "md" | "lg" | "xl" = "md"
  let $align: "start" | "center" | "end" = "center"
  let $full = false
  let $h1 = false
  let $likes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Ölçek" options={["sm", "md", "lg", "xl"]} bind:value={$size} />
        <Segmented aria-label="Hiza" options={[{ value: "start", label: "baş" }, { value: "center", label: "orta" }, { value: "end", label: "son" }]} bind:value={$align} />
        <Toggle label="Tam genişlik" bind:value={$full} />
        <Toggle label="Sayfa başlığı (h1)" bind:value={$h1} />
      </div>
    </Card>
    {() => {
      // Reveal yazdığı sınıfları bir kez okur: değerler burada okunur, değişince baş yeniden çizilir
      const h1 = $h1, size = $size, align = $align, full = $full
      return <SectionHead class="lab-head" eyebrow={<Badge tone="primary">Yeni</Badge>} eyebrowHref="#yenilikler"
        title={() => `Ekibinle birlikte üret (${$likes})`} as={h1 ? "h1" : "h3"} titleId="lab-head-title"
        lead="Planla, yaz, yayınla: hepsi aynı yerde."
        actions={[
          { label: "Beğen", icon: play, onClick: () => $likes++ },
          { label: "Belgeler", href: "#belgeler", iconEnd: arrowRight, variant: "ghost" },
          <Button variant="link" href="#iletisim" class="lab-own-action">Bize yaz</Button> as Node,
        ]}
        note="14 gün ücretsiz · kart gerekmez"
        align={align} size={size} width={full ? "full" : "text"}
        reveal={{ effect: "up", stagger: 60 }}>
        <small class="lab-extra">2.400 ekip kullanıyor</small>
      </SectionHead>
    }}
  </div>
}
