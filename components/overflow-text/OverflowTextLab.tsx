import { OverflowText, Marquee, Button, Card } from "march/ui"
import { star, Icon } from "march/icons"

// OverflowText'in bütün özellikleri: text, children, trigger (tek ya da liste), mode (bounce, loop, once), speed, pause,
// delay, separator (metin, düğüm ya da false), easing, duplicate (true ya da sayı), disabled, fade, play, host, class
// ve öteki öznitelikler (data-*); Marquee: trigger="visible" + mode="loop" hazır ayarı
const LONG = "Haftalık etkinlik özeti: Kadıköy koşu grubu, Moda sahili buluşması, kitap kulübü ve akşam yemeği"

// bir örnek ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function OverflowTextLab() {
  let $still = false
  let $pinned = false
  let box: HTMLElement | null = null
  return <div sx={{ flex: "col", gap: 3, w: "sm" }}>
    <Row title="Varsayılan: üzerine gelince ya da odakta, gidip döner">
      <OverflowText text={LONG} class="lab-basic" />
    </Row>
    <Row title="Hep, bir kez; hızlı, kısa bekleme, doğrusal">
      <OverflowText text={LONG} trigger="always" mode="once" speed={80} pause={300} delay={0} easing="linear" class="lab-once" />
    </Row>
    <Row title="Görününce ya da odakta döngü, kendi ayracın (ikon)">
      <OverflowText text={LONG} trigger={["visible", "focus"]} mode="loop" separator={<Icon of={star} />} class="lab-loop" />
    </Row>
    <Row title="Üç nokta (fade={false}), kapatılabilir (disabled), data-* özniteliği">
      <OverflowText text={LONG} trigger="always" fade={false} disabled={$still} data-kind="lab" class="lab-off" />
    </Row>
    <Row title="Kartın üzerine gelince kayar (host); düğmeyle hep oynar (play)">
      <div ref={(el: HTMLElement) => { box = el }}>
        <Card><OverflowText text={LONG} host={() => box} play={() => $pinned} class="lab-host" /></Card>
      </div>
    </Row>
    <Row title="Marquee: sonsuz şerit, içerik çoğaltılır (duplicate), ayraçsız ya da ✦">
      <Marquee duplicate={2} separator={false} pause={0} class="lab-strip"><strong>HADİ · Globex · Initech ·</strong></Marquee>
      <Marquee duplicate separator="✦" class="lab-fill">Yeni sürüm</Marquee>
    </Row>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $still = !$still}>{$still ? "Kaydırmayı aç" : "Kaydırmayı kapat"}</Button>
      <Button size="sm" on:click={() => $pinned = !$pinned}>{$pinned ? "Sabitlemeyi bırak" : "Hep oynat"}</Button>
    </div>
  </div>
}
