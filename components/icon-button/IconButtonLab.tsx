import { IconButton, Badge, Card } from "march/ui"
import { heart, star, bell, plus, send, arrowUp, x, globe, settings, info, trash } from "march/icons"

// IconButton'un bütün özellikleri bir arada: boyut, varyant, yuvarlak biçim, aç / kapa, koyu zemin (inverse),
// bağlantı (href), kendi ipucun ya da hiç (title), yalnız aria-label, sınıf, renk ve içerik (köşede bir sayı rozeti)
const sizes = ["xs", "sm", "md", "lg"] as const
const variants = [undefined, "danger", "solid", "raised"] as const

// bir sıra düğme ve üstünde adı: yan yana, sığmazsa alt satıra
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 2 }}>{props.children}</div>
</div>

export function IconButtonLab() {
  let $liked = false
  let $starred = true
  let $unread = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Boyut">{sizes.map((s) => <IconButton icon={plus} label={`Ekle (${s})`} size={s} />)}</Row>
    <Row title="Varyant">{variants.map((v) => <IconButton icon={send} label={`Gönder (${v ?? "düz"})`} variant={v} />)}</Row>
    <Row title="Yuvarlak">{variants.map((v) => <IconButton icon={arrowUp} label={`Başa dön (${v ?? "düz"})`} variant={v} shape="round" />)}</Row>
    <Row title="Aç / kapa">
      <IconButton icon={heart} label={$liked ? "Beğenildi" : "Beğen"} pressed={$liked} on:click={() => $liked = !$liked} />
      <IconButton icon={star} label="Yıldızla" m:color="brand-gold" pressed={$starred} on:click={() => $starred = !$starred} />
    </Row>
    <Row title="İçerik">
      <IconButton icon={bell} label={`Bildirimler (${$unread})`} on:click={() => $unread = 0}>
        <Badge count={$unread} />
      </IconButton>
      <IconButton label="Yeni bildirim" variant="raised" on:click={() => $unread++}>+1</IconButton>
    </Row>
    <Row title="İpucu">
      <IconButton icon={info} label="Bilgi" title="Kendi ipucum: sürüm 0.2.0" />
      <IconButton icon={settings} label="Ayarlar" title={false} />
      <IconButton icon={trash} aria-label="Çöp kutusu" class="lab-trash" />
    </Row>
    <Row title="Bağlantı">
      <IconButton icon={globe} label="March sitesi" href="https://marchjs.com" target="_blank" rel="noopener" m:color="brand-blue" variant="solid" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <IconButton icon={x} label="Kapat" inverse />
        <IconButton icon={heart} label="Koyuda beğen" inverse pressed={$liked} on:click={() => $liked = !$liked} />
        <IconButton icon={arrowUp} label="Koyuda yukarı" inverse variant="raised" shape="round" />
      </Row>
    </Card>
  </div>
}
