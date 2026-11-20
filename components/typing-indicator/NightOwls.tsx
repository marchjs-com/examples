import { TypingIndicator, Card } from "march/ui"

// gece kuşları: koyu temada, satır içi, mor noktalar yanıp söner
export function NightOwls() {
  return <Card m:theme="night">
    <TypingIndicator names={["Baykuş"]} variant="inline" motion="fade" m:color="brand-purple" />
  </Card>
}
