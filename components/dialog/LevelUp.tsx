import { Dialog, Button, Card } from "march/ui"

// seviye atladın: kutlama penceresi, yükselerek gelir; "Devam" kapatır
export function LevelUp() {
  let $open = false
  let $level = 1
  return <Card m:theme="night">
    <Button variant="primary" on:click={() => { $level++; $open = true }}>Görevi bitir</Button>
    <span sx={{ text: "sm", color: "muted" }}> Seviye {$level}</span>
    <Dialog open={$open} onClose={() => $open = false} title={`🎉 Seviye ${$level}!`} size="sm" motion="rise"
      footer={<Button variant="primary" on:click={() => $open = false}>Devam</Button>}>
      <p>Yeni bir rozet kazandın.</p>
    </Dialog>
  </Card>
}
