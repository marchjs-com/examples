import { ChatBubble, Card } from "march/ui"

// robotla sohbet: koyu temada iki taraf; robot balonları mor, benimkiler yeşil
export function RobotChat() {
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 1 }}>
      <ChatBubble text="Bip bop! Bugün sana nasıl yardım edebilirim?" sender="Robot" position="single" />
      <ChatBubble mine text="Bana bir şaka anlat." status="read" m:color="brand-green" position="first" />
      <ChatBubble mine text="Kısa olsun 🙂" status="delivered" m:color="brand-green" position="last" />
      <ChatBubble text="Neden bilgisayar soğuk algınlığına yakalanmış? Çünkü pencereleri açık kalmış!" sender="Robot" position="single" reactions={[{ emoji: "😂", count: 1, mine: true }]} />
    </div>
  </Card>
}
