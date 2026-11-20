import { Spinner, Button, Card } from "march/ui"

// sihirli küre: soru sorunca küre bir an "düşünür" (dönen halka), sonra bir cevap verir
const ANSWERS = ["Kesinlikle evet ✨", "Pek sanmam 🤔", "Yıldızlar öyle diyor 🌟", "Sonra tekrar sor 🔮"]

export function MagicEightBall() {
  let $thinking = false
  let $answer = "Bir soru düşünün ve sorun."
  const ask = () => {
    $thinking = true
    setTimeout(() => { $answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)]!; $thinking = false }, 1200)
  }
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3, p: 3 }}>
      {() => $thinking ? <Spinner size="lg" colors="brand" label="Küre düşünüyor" /> : <span sx={{ text: "lg" }}>{$answer}</span>}
      <Button variant="primary" disabled={() => $thinking} on:click={ask}>Küreye sor</Button>
    </div>
  </Card>
}
