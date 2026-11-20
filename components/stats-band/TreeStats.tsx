import { StatsBand } from "march/landing"

// bir ağaçlandırma derneğinin rakamları: büyük sayılar kısaltılır, ekranda görününce sayar
export function TreeStats() {
  return <StatsBand variant="divided" items={[
    { value: 1250000, label: "fidan toprakla buluştu", format: { notation: "compact" }, suffix: "+" },
    { value: 81, label: "ilde gönüllü" },
    { value: 4.9, decimals: 1, label: "bağışçı memnuniyeti", note: "5 üzerinden" },
    { value: 92, label: "fidan yaşıyor", suffix: "%", note: "3 yıl sonra yapılan sayım" },
  ]} />
}
