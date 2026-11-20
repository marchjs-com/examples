import { LogoCloud } from "march/landing"
import { Card, Segmented, Toggle, Button } from "march/ui"

// LogoCloud'un bütün özellikleri bir arada: logolar (name, src, width, height, node, href), görünüm (variant),
// başlık (title), tek ton (mono), hız (speed), giriş hareketi (reveal) ve sınıf (class)
const Dot = (p: { fill: string; label: string }) => <svg width="96" height="28" viewBox="0 0 96 28" aria-hidden="true">
  <circle cx="14" cy="14" r="10" fill={p.fill} /><text x="30" y="19" font-size="13" fill="currentColor">{p.label}</text>
</svg>

export function LogoCloudLab() {
  let $variant: "grid" | "marquee" = "grid"
  let $mono = true
  let $count = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={[{ value: "grid", label: "grid" }, { value: "marquee", label: "marquee" }]} bind:value={$variant} />
        <Toggle label="Tek ton" bind:value={$mono} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince bulut yeniden çizilir; başlık bir işlev, kendisi güncellenir
      const variant = $variant, mono = $mono
      return <LogoCloud variant={variant} mono={mono} speed={30} reveal="none" class="lab-logos"
      title={() => `Bize güvenen ${4 + $count} ekip`}
      logos={[
        { name: "Dalga", src: "/media/hadi-waves.jpg", width: 96, height: 28 },
        { name: "Turuncu", node: <Dot fill="#ff7a59" label="Turuncu" />, href: "#turuncu" },
        { name: "Mor", node: <Dot fill="#7c5cff" label="Mor" /> },
        { name: "Mavi", node: <Dot fill="#2bb8ff" label="Mavi" /> },
      ]} />
    }}
    <Button on:click={() => $count++}>Ekip ekle</Button>
  </div>
}
