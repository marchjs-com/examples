import { ScrollStory } from "march/landing"
import { animate } from "march/motion"
import { Card, Segmented, Toggle } from "march/ui"

// ScrollStory'nin bütün özellikleri bir arada: adımlar (title, body, media, color), görsel tarafı (side), adıma göre
// renk (theme), adım değişince (onStep), noktalar (dots), adım numarası (numbers), görsel geçişi (transition) ve sınıf (class)
const TRANSITIONS = ["rise", "fade", "own", "none"] as const

const Tile = (p: { face: string }) => <div sx={{ flex: ["row", "center"], p: 6 }} style={{ fontSize: "72px" }}>{p.face}</div>

// kendi geçişim: yeni görsel dönerek gelir
const turnIn = (incoming: HTMLElement, outgoing: HTMLElement | undefined, dir: 1 | -1) => {
  animate(incoming, { opacity: [0, 1], transform: [`rotate(${10 * dir}deg) scale(.7)`, "rotate(0deg) scale(1)"] }, { duration: 620, easing: "expo" })
  if (outgoing) animate(outgoing, { opacity: [1, 0] }, { duration: 300, easing: "out" })
}

export function ScrollStoryLab() {
  let $side: "start" | "end" = "end"
  let $numbers: string = "own"
  let $transition: string = "rise"
  let $theme = true
  let $dots = true
  let $step = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görsel tarafı" options={[{ value: "start", label: "başta" }, { value: "end", label: "sonda" }]} bind:value={$side} />
        <Segmented aria-label="Adım numarası" options={[{ value: "on", label: "01" }, { value: "own", label: "Adım 1" }, { value: "off", label: "numarasız" }]} bind:value={$numbers} />
        <Segmented aria-label="Geçiş" options={TRANSITIONS.map((t) => ({ value: t, label: t }))} bind:value={$transition} />
        <Toggle label="Adıma göre renk" bind:value={$theme} />
        <Toggle label="Noktalar" bind:value={$dots} />
      </div>
    </Card>
    <p sx={{ color: "muted" }}>{`Etkin adım: ${$step + 1}`}</p>
    {() => {
      // bu satırda okunan durumlar değişince hikâye yeniden çizilir
      const side = $side, numbers = $numbers, transition = $transition, theme = $theme, dots = $dots
      return <ScrollStory class="lab-story" side={side} theme={theme} dots={dots} onStep={(i: number) => $step = i}
        numbers={numbers === "off" ? false : numbers === "own" ? (i: number) => `Adım ${i + 1}` : true}
        transition={transition === "own" ? turnIn : transition as "rise" | "fade" | "none"}
        steps={[
          { title: "Planla", body: "Ne, nerede, ne zaman.", media: <Tile face="🗺️" />, color: "brand-orange" },
          { title: "Davet et", body: "Bağlantıyı paylaş, yerler dolsun.", media: <Tile face="💌" />, color: "brand-blue" },
          { title: "Buluş", body: "Etkinlik günü herkes tanışık.", media: <Tile face="🎉" />, color: "brand-green" },
        ]} />
    }}
  </div>
}
