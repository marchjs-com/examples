// ButtonLab: the full-featured Button example; it uses every prop at least once.
//
// Props shown here: variant, size, weight, shape (pill), icon and iconEnd, pressed (a toggle), loading with spinner
// (the ring, your own mark, or none so the icon stays), disabled, href (a link styled as a button), type="submit"
// inside a Form, and block (full width).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ButtonLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Button, Form } from "march/ui"
import { plus, heart, download, refresh, arrowRight, send, trash } from "march/icons"

// The value lists of the three style props, so each combination can be drawn with a loop.
const variants = ["primary", "secondary", "ghost", "danger", "dark", "link"] as const
const sizes = ["sm", "md", "lg"] as const
const weights = ["light", "regular", "medium", "strong"] as const

// A row of buttons: side by side, wrapping to the next line when they do not fit.
const Row = (props: { children?: unknown }) => <div sx={{ flex: ["row", "wrap"], gap: 2 }}>{props.children}</div>

export function ButtonLab() {
  // Whether the like toggle is on, whether a fake job is running (it drives the loading buttons) and how many times the form
  // was submitted. Plain `let $x` variables are reactive state.
  let $liked = false
  let $busy = false
  let $sent = 0
  // Starts the fake job: busy for 1.5 seconds.
  const run = () => { $busy = true; setTimeout(() => { $busy = false }, 1500) }
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* variant: the six looks. primary is the theme's filled orange, secondary the default, ghost has no fill, danger
        is for destructive actions, dark an ink fill, link reads as text and flows inline. `icon` is the leading icon. */}
    <Row>{variants.map((v) => <Button variant={v} icon={plus}>{v}</Button>)}</Row>
    {/* size: sm, md or lg (the icons follow it). shape="pill" rounds the ends fully. iconEnd is the trailing icon. */}
    <Row>{sizes.map((s) => <Button size={s} shape="pill" iconEnd={arrowRight}>{s}</Button>)}</Row>
    {/* weight: the label's font weight in the theme's font. */}
    <Row>{weights.map((w) => <Button weight={w}>{w}</Button>)}</Row>
    <Row>
      {/* pressed turns a button into a toggle: it gets aria-pressed (screen readers hear on / off) and a pressed look.
          Pass the state, flip it in on:click. */}
      <Button icon={heart} pressed={$liked} on:click={() => $liked = !$liked}>{$liked ? "Beğenildi" : "Beğen"}</Button>
      {/* loading locks the button, sets aria-busy and shows a spinner in place of the icon. The spinner is motion: it
          follows reduced motion and the global speed / "Stop all" settings. */}
      <Button variant="primary" icon={download} loading={$busy} on:click={run}>İndir</Button>
      {/* spinner={refresh}: your own busy mark (an icon turns). spinner={false}: no spinner, the icon stays and the
          button is only locked. */}
      <Button icon={send} loading={$busy} spinner={refresh}>Kendi işaretim</Button>
      <Button icon={send} loading={$busy} spinner={false}>İkon kalır</Button>
      {/* disabled: a real disabled button, so it cannot be pressed or reached by keyboard. */}
      <Button variant="danger" icon={trash} disabled>Silinemez</Button>
    </Row>
    <Row>
      {/* href renders a link styled as a button: an external address (https://, mailto:) is a plain link, an in-app
          path would be a router link. */}
      <Button href="https://github.com" variant="ghost" iconEnd={arrowRight}>Dış bağlantı</Button>
      <Button href="mailto:merhaba@example.com" variant="link">E-posta gönder</Button>
    </Row>
    {/* type="submit" inside a Form submits it (Enter in a field does the same); block makes the button full width.
        actions={false} stops the Form from drawing its own buttons, so this one is the only submit button. */}
    <Form actions={false} onSubmit={() => { $sent++ }}>
      <Button type="submit" variant="dark" block>Gönder ({$sent})</Button>
    </Form>
  </div>
}
