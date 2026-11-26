// OverflowTextLab: the full-featured OverflowText example; it uses every prop at least once.
//
// OverflowText is text that scrolls only when it does not fit; text that fits stays put. Props shown here: text, trigger
// (one value or a list), mode (bounce, loop, once), speed, pause, delay, separator (text, a node or false), easing,
// duplicate (true or a number), disabled, fade, play, host, class and other attributes such as data-*. Marquee is the
// endless-ticker preset (trigger "visible" + mode "loop"); it is shown with duplicate and separator.
// Motion: it all runs on the motion engine, so reduced motion stops the movement (the end fades and the full text is in
// the tooltip) and the global speed and "Stop all" apply. `disabled` is the component's own switch to stop scrolling.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// OverflowTextLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { OverflowText, Marquee, Button, Card } from "march/ui"
import { star, Icon } from "march/icons"

const LONG = "Haftalık etkinlik özeti: Kadıköy koşu grubu, Moda sahili buluşması, kitap kulübü ve akşam yemeği"

// One example of the Lab: a small muted title and the example under it. Plain composition, no OverflowText feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function OverflowTextLab() {
  // $still turns scrolling off for one text, $pinned keeps another one scrolling; `box` is the card element that the
  // host example listens to.
  let $still = false
  let $pinned = false
  let box: HTMLElement | null = null
  return <div sx={{ flex: "col", gap: 3, w: "sm" }}>
    <Row title="Varsayılan: üzerine gelince ya da odakta, gidip döner">
      {/* Defaults: it starts when its nearest link, button or list item is hovered or focused, goes to the end and back
          (mode "bounce"), holds 1000 ms at each end, waits 250 ms after the trigger and scrolls 40 pixels a second.
          class: a class on the element for CSS or tests. The element also gets dir="auto". */}
      <OverflowText text={LONG} class="lab-basic" />
    </Row>
    <Row title="Hep, bir kez; hızlı, kısa bekleme, doğrusal">
      {/* trigger="always": no hover or focus needed. mode="once": scroll one time. speed={80}: faster. pause={300}:
          hold only 300 ms at the end. delay={0}: start at once. easing="linear": a constant pace instead of the default
          "ease-in-out" for each travel. */}
      <OverflowText text={LONG} trigger="always" mode="once" speed={80} pause={300} delay={0} easing="linear" class="lab-once" />
    </Row>
    <Row title="Görününce ya da odakta döngü, kendi ayracın (ikon)">
      {/* trigger takes a list: it starts when the text is visible on screen or when it gets focus. mode="loop": an
          endless loop; separator takes a node, so an icon sits between the repeats. */}
      <OverflowText text={LONG} trigger={["visible", "focus"]} mode="loop" separator={<Icon of={star} />} class="lab-loop" />
    </Row>
    <Row title="Üç nokta (fade={false}), kapatılabilir (disabled), data-* özniteliği">
      {/* fade={false}: the clipped end shows an ellipsis instead of a soft fade. disabled: never scroll; the text stays
          clipped (the button at the bottom flips it). data-kind: other attributes pass through to the element. */}
      <OverflowText text={LONG} trigger="always" fade={false} disabled={$still} data-kind="lab" class="lab-off" />
    </Row>
    <Row title="Kartın üzerine gelince kayar (host); düğmeyle hep oynar (play)">
      {/* host: the element whose hover or focus starts the scroll; here the whole card, not only the text (a function
          is used because the element exists only after it is drawn). play: an extra condition that keeps it scrolling,
          here the "always play" button. */}
      <div ref={(el: HTMLElement) => { box = el }}>
        <Card><OverflowText text={LONG} host={() => box} play={() => $pinned} class="lab-host" /></Card>
      </div>
    </Row>
    <Row title="Marquee: sonsuz şerit, içerik çoğaltılır (duplicate), ayraçsız ya da ✦">
      {/* Marquee: the endless strip. duplicate={2}: the content is repeated that many times; the copies are aria-hidden
          and inert, so a screen reader reads the content once and links in the copies cannot be focused. A bare
          `duplicate` repeats enough copies to fill the width. separator={false}: nothing between the repeats. */}
      <Marquee duplicate={2} separator={false} pause={0} class="lab-strip"><strong>HADİ · Globex · Initech ·</strong></Marquee>
      <Marquee duplicate separator="✦" class="lab-fill">Yeni sürüm</Marquee>
    </Row>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $still = !$still}>{$still ? "Kaydırmayı aç" : "Kaydırmayı kapat"}</Button>
      <Button size="sm" on:click={() => $pinned = !$pinned}>{$pinned ? "Sabitlemeyi bırak" : "Hep oynat"}</Button>
    </div>
  </div>
}
