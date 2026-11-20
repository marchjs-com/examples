import { Button, Form } from "march/ui"
import { plus, heart, download, refresh, arrowRight, send, trash } from "march/icons"

// Button'un bütün özellikleri bir arada: varyant, boyut, kalınlık, hap biçim, iki ikon, aç / kapa,
// yükleniyor (halka, kendi işaretin, ikon kalır), devre dışı, bağlantı, form içinde submit ve tam genişlik
const variants = ["primary", "secondary", "ghost", "danger", "dark", "link"] as const
const sizes = ["sm", "md", "lg"] as const
const weights = ["light", "regular", "medium", "strong"] as const

// bir sıra düğme: yan yana, sığmazsa alt satıra
const Row = (props: { children?: unknown }) => <div sx={{ flex: ["row", "wrap"], gap: 2 }}>{props.children}</div>

export function ButtonLab() {
  let $liked = false
  let $busy = false
  let $sent = 0
  const run = () => { $busy = true; setTimeout(() => { $busy = false }, 1500) }
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row>{variants.map((v) => <Button variant={v} icon={plus}>{v}</Button>)}</Row>
    <Row>{sizes.map((s) => <Button size={s} shape="pill" iconEnd={arrowRight}>{s}</Button>)}</Row>
    <Row>{weights.map((w) => <Button weight={w}>{w}</Button>)}</Row>
    <Row>
      <Button icon={heart} pressed={$liked} on:click={() => $liked = !$liked}>{$liked ? "Beğenildi" : "Beğen"}</Button>
      <Button variant="primary" icon={download} loading={$busy} on:click={run}>İndir</Button>
      <Button icon={send} loading={$busy} spinner={refresh}>Kendi işaretim</Button>
      <Button icon={send} loading={$busy} spinner={false}>İkon kalır</Button>
      <Button variant="danger" icon={trash} disabled>Silinemez</Button>
    </Row>
    <Row>
      <Button href="https://github.com" variant="ghost" iconEnd={arrowRight}>Dış bağlantı</Button>
      <Button href="mailto:merhaba@example.com" variant="link">E-posta gönder</Button>
    </Row>
    <Form actions={false} onSubmit={() => { $sent++ }}>
      <Button type="submit" variant="dark" block>Gönder ({$sent})</Button>
    </Form>
  </div>
}
