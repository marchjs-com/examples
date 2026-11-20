import { Checkbox, Card } from "march/ui"
import { star, heart, users } from "march/icons"

// Checkbox'un bütün özellikleri bir arada: görünüm (variant), boyut, köşe (shape), kendi ikonu, animasyonsuz,
// açıklama (hint), children ile etiket, bind:value ve onChange, kısmi (indeterminate), devre dışı, salt okunur,
// zorunlu, geçersiz + describedby, etiketsiz kutu (aria-label / ariaLabel / labelledby), id, name, class,
// onClick ve tabIndex, odak olayları (onFocus / onBlur), koyu zemin
const variants = ["classic", "soft", "chip", "card", "toggle"] as const
const sizes = ["sm", "md", "lg"] as const
const shapes = ["square", "rounded", "circle"] as const

// bir sıra kutu ve üstünde adı: yan yana, sığmazsa alt satıra
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 3 }}>{props.children}</div>
</div>

export function CheckboxLab() {
  let $agree = false
  let $last = "—"
  let $news = true
  let $clicks = 0
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Görünüm">{variants.map((v) => <Checkbox variant={v} label={`Görünüm: ${v}`} value={v !== "classic"} />)}</Row>
    <Row title="Boyut">{sizes.map((s) => <Checkbox size={s} label={`Boyut: ${s}`} value={true} />)}</Row>
    <Row title="Köşe">{shapes.map((sh) => <Checkbox shape={sh} label={`Köşe: ${sh}`} value={true} />)}</Row>
    <Row title="İkon ve hareket">
      <Checkbox icon={star} m:color="brand-gold" label="Yıldızlı" value={true} />
      <Checkbox icon={heart} m:color="brand-pink" label="Favori" />
      <Checkbox animate={false} label="Animasyonsuz" />
      <Checkbox variant="card" icon={users} label="Ekip planı" hint="10 kişiye kadar" />
    </Row>
    <Row title="Değer">
      <Checkbox bind:value={$agree} required label="Koşulları kabul ediyorum"
        onChange={(v: boolean) => $last = v ? "işaretlendi" : "kaldırıldı"} />
      <span>Onay: {$agree ? "evet" : "hayır"} · son: {$last}</span>
      <Checkbox bind:value={$news} hint="Haftada bir e-posta">Bültene abone ol</Checkbox>
      <span>Bülten: {$news ? "açık" : "kapalı"}</span>
    </Row>
    <Row title="Durum">
      <Checkbox indeterminate value={true} label="Bazı dosyalar seçili" />
      <Checkbox disabled label="Devre dışı" />
      <Checkbox readonly value={true} label="Salt okunur" />
      <Checkbox invalid describedby="kvkk-error" label="KVKK metnini okudum" />
      <span id="kvkk-error" sx={{ text: "xs", color: "danger" }}>Bu onay zorunlu</span>
    </Row>
    <Row title="Etiketsiz kutu ve kimlik">
      <Checkbox aria-label="Satırı seç" id="row-1" name="rows" class="lab-row" tabIndex={0} onClick={() => $clicks++} />
      <span>Tıklama: {$clicks}</span>
      <Checkbox ariaLabel="Tümünü seç" />
      <span id="lab-caption">Başlığa bağlı kutu</span>
      <Checkbox labelledby="lab-caption" />
    </Row>
    <Row title="Odak">
      <Checkbox label="Odakla beni" onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} />
      <span>Odak: {$focus}</span>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Checkbox variant="toggle" m:color="brand-purple" label="Karanlık mod" value={true} />
        <Checkbox variant="soft" label="Koyuda yumuşak" value={true} />
      </Row>
    </Card>
  </div>
}
