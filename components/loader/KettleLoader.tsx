import { Loader, Button, Card } from "march/ui"

// çaydanlık: "Demle" yükleyiciyi kendi işaretiyle (☕) gösterir; metin geri sayar, bitince çay hazır
export function KettleLoader() {
  let $left = 0
  const brew = () => {
    $left = 3
    const t = setInterval(() => { $left--; if ($left <= 0) clearInterval(t) }, 700)
  }
  return <Card title="Çay ocağı">
    {() => $left > 0
      ? <Loader spinner={<span sx={{ text: "2xl" }}>☕</span> as Node} fade={false} text={() => `Demleniyor… ${$left}`} />
      : <div sx={{ flex: ["row", "center"], gap: 2 }}><span>Çay hazır 🫖</span><Button size="sm" on:click={brew}>Demle</Button></div>}
  </Card>
}
