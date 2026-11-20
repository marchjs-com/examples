import { Accordion, Card } from "march/ui"
import { clock, sparkles } from "march/icons"
import { flame } from "march/icons/lucide"

// bir tarifin adımları: her bölüm bir aşama; birini açınca öteki kapanır
const step = (text: string) => <p sx={{ text: "sm" }}>{text}</p>

export function Recipe() {
  return <Card m:theme="night">
    <h3 sx={{ text: ["lg", "bold"] }}>Menemen</h3>
    <Accordion m:color="brand-orange" open={[0]} items={[
      { title: "Hazırlık", subtitle: "5 dk", icon: clock, content: step("Biberleri ince doğrayın, domatesleri rendeleyin.") },
      { title: "Pişirme", subtitle: "10 dk", icon: flame, content: step("Biberi tereyağında yumuşatın, domatesi ekleyip suyunu çektirin.") },
      { title: "Son dokunuş", icon: sparkles, content: step("Yumurtaları kırın, iki kez karıştırıp ocaktan alın.") },
    ]} />
  </Card>
}
