import { Stepper, TextInput, Segmented, Toggle, Badge, Card, toast } from "march/ui"

// HADİ'de etkinlik açmak: ad, gün, kimler katılır, özet. Panellerin bağları canlı: özet girilenleri o an gösterir;
// son adımın düğmesi etkinliği yayınlar
const STEPS = [
  { title: "Bilgiler", description: "Ad" },
  { title: "Zaman", description: "Gün" },
  { title: "Katılım", description: "Kimler" },
  { title: "Özet", description: "Yayınla" },
]

export function EventWizard() {
  let $step = 0
  let $title = "Moda sahili koşusu"
  let $day = "Cumartesi"
  let $open = true
  let $published = false
  const panels = [
    <div sx={{ flex: "col", gap: 1 }}><span sx={{ text: "sm", color: "muted" }}>Etkinliğin adı</span><TextInput bind:value={$title} aria-label="Etkinliğin adı" /></div>,
    <div sx={{ flex: "col", gap: 1 }}><span sx={{ text: "sm", color: "muted" }}>Hangi gün?</span><Segmented options={["Cuma", "Cumartesi", "Pazar"]} bind:value={$day} /></div>,
    <Toggle bind:value={$open} label="Herkese açık (kapalıysa yalnız davetliler)" />,
    <div sx={{ flex: "col", gap: 1 }}>
      <span sx={{ text: "bold" }}>{$title}</span>
      <span>{$day + " · " + ($open ? "herkese açık" : "yalnız davetliler")}</span>
    </div>,
  ]
  const publish = () => { $published = true; toast("Etkinlik yayınlandı") }
  return <Card title="Yeni etkinlik" actions={<Badge tone={$published ? "success" : "neutral"}>{$published ? "Yayında" : "Taslak"}</Badge>}>
    <Stepper steps={STEPS} current={$step} onSelect={(i: number) => $step = i} panels={panels} m:color="brand-green"
      labels={{ back: "Geri", next: "Devam" }} finishLabel="Yayınla" onFinish={publish}
      counter={(i: number, n: number) => (n - i - 1 ? `${n - i - 1} adım kaldı` : "son adım")} />
  </Card>
}
