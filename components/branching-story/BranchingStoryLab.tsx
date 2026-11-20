import { BranchingStory, type StoryChoice } from "march/landing"
import { Segmented, Toggle, Button, Card } from "march/ui"

// BranchingStory'nin bütün özellikleri bir arada: pasajlar, ilk pasaj, dışarıdan yönetilen yol (path) ve onChange,
// iz, bulunan sonlar, sondaki eylem, en küçük yükseklik, erişilebilir ad, bütün metinler (labels), yeniden başlat
// düğmesi, rakam tuşları, kendi seçenek çizimin, sayfa geçişi (hazır ya da kendi hareketin) ve sınıf
const PASSAGES = {
  orman: { title: "Ormanın girişi", color: "brand-green" as const, media: <span sx={{ text: "2xl" }}>🌲</span>, body: "İki patika var.", choices: [
    { label: "Dere boyu", note: "serin", to: "dere" }, { label: "Tepeye", note: "dik", to: "tepe" }] },
  dere: { title: "Derenin kıyısı", body: "Bir sal bağlı duruyor.", choices: [{ label: "Sala bin", to: "sal" }, { label: "Yürümeye devam", to: "tepe" }] },
  tepe: { title: "Tepede", ending: "Manzara", body: "Bütün vadi ayaklarının altında." },
  sal: { title: "Sal yolculuğu", ending: "Kaptan", body: "Dere seni göle taşıdı." },
}
// kendi geçişin: eski pasaj solar, yenisi yandan gelir
const OWN = (side: 1 | -1) => ({ leave: { opacity: [1, 0] }, enter: { opacity: [0, 1], transform: [`translateX(${40 * side}px)`, "translateX(0px)"] }, duration: 400 })

export function BranchingStoryLab() {
  let $path = ["orman"]
  let $move: "yok" | "kendi" = "yok"
  let $trail = true
  let $keys = true
  let $own = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Geçiş" options={["yok", "kendi"]} bind:value={$move} />
        <Toggle label="İz" bind:value={$trail} />
        <Toggle label="Rakam tuşları" bind:value={$keys} />
        <Toggle label="Kendi seçeneklerim" bind:value={$own} />
        <Button variant="secondary" on:click={() => $path = ["orman"]}>Başa sar</Button>
      </div>
    </Card>
    {() => { const move = $move, trail = $trail, keys = $keys, own = $own; return <BranchingStory class="lab-bs"
      passages={PASSAGES} start="orman" path={() => $path} onChange={(p: string[]) => $path = p}
      trail={trail} endings action={<Button variant="link" href="#rota">Rotayı indir</Button>} minHeight="12rem" label="Orman macerası"
      labels={{ path: "Yolun", start: "Giriş", endings: (n: number, total: number) => `${n}/${total} son`, missing: "Bu yol kayıp.", end: "Bitti", endingPrefix: "Son: ", restart: "Yeniden" }}
      restart keys={keys} transition={move === "yok" ? "none" : OWN}
      renderChoice={own ? (c: StoryChoice, i: number) => <span class="lab-choice">{`${i + 1}. `}<b>{c.label}</b></span> : undefined} /> }}
    <p sx={{ color: "muted" }} class="lab-path">Yol: {$path.join(" → ")}</p>
  </div>
}
