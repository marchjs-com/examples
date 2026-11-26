// RobotChat: the creative-minimal ChatBubble example.
//
// A chat with a robot on a dark theme: the robot's bubbles come in the default colours, mine are green. It shows how a
// run of messages reads: position="first" and "last" tighten the corners between my two bubbles, and "single" is a
// bubble on its own. Use the pattern to see how bubbles group, and how m:color re-colours my side.
import { ChatBubble, Card } from "march/ui"

export function RobotChat() {
  // m:theme="night" on the Card puts the whole chat on a dark surface. Inside, `mine` bubbles use m:color="brand-green"
  // (a common prop that sets the colour token of the component); the robot's bubbles are not mine, so they keep the
  // default look and show a sender name. status shows delivery ticks on my messages (read, delivered). reactions on the
  // last bubble is a chip with the laughing emoji that I have already pressed (mine: true).
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 1 }}>
      <ChatBubble text="Bip bop! Bugün sana nasıl yardım edebilirim?" sender="Robot" position="single" />
      <ChatBubble mine text="Bana bir şaka anlat." status="read" m:color="brand-green" position="first" />
      <ChatBubble mine text="Kısa olsun 🙂" status="delivered" m:color="brand-green" position="last" />
      <ChatBubble text="Neden bilgisayar soğuk algınlığına yakalanmış? Çünkü pencereleri açık kalmış!" sender="Robot" position="single" reactions={[{ emoji: "😂", count: 1, mine: true }]} />
    </div>
  </Card>
}
