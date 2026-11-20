import { LiveCounter } from "march/landing"
import { Button } from "march/ui"

// kalp sayacı: her basışta sayı artar, üstünden kendi "❤ +N" balonun yükselir
export function HeartCounter() {
  let $likes = 41
  return <div sx={{ flex: ["row", "center"], gap: 4 }}>
    <LiveCounter value={() => $likes} label="kişi bu fotoğrafı sevdi" dotColor="brand-pink"
      bubble={(d: number) => <b>❤ +{d}</b>} />
    <Button on:click={() => $likes++}>❤ Sev</Button>
    <Button variant="secondary" on:click={() => $likes += 10}>❤ ×10</Button>
  </div>
}
