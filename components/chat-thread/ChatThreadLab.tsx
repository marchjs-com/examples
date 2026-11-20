import { ChatThread, Button, Badge, type ChatMessage } from "march/ui"

// ChatThread'in bütün özellikleri: mesajlar (yanıt, tepki, düzenlendi, resim, durumlar), yazanlar, grup sohbeti,
// tepki / yanıt / yeniden dene olayları, mesaj kümesi süresi (runMinutes), erişilebilir ad, kendi gün ayracı,
// kendi "N yeni" düğmesi ve rengi, hareket ve sınıf
const PHOTO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mP4WSz2xmMmQ43VWzlpbwAsKgV3rhVt4wAAAABJRU5ErkJggg=="
const at = (d: number, h: number, m: number) => { const x = new Date(); x.setDate(x.getDate() - d); x.setHours(h, m, 0, 0); return x }

export function ChatThreadLab() {
  let $messages: ChatMessage[] = [
    { id: "a1", senderId: "ece", senderName: "Ece", text: "Akşam yemeği kimde?", time: at(2, 19, 0) },
    { id: "a2", senderId: "ece", senderName: "Ece", text: "Ben tatlı getiririm 🍰", time: at(2, 19, 9) },
    { id: "a3", senderId: "can", senderName: "Can", text: "Bende! Gün batımı da harika", time: at(1, 18, 30), image: { src: PHOTO, alt: "Gün batımı" }, edited: true },
    { id: "a4", mine: true, text: "Geliyorum", time: at(0, 9, 0), status: "read", reply: { name: "Can", text: "Bende!" }, reactions: [{ emoji: "🎉", count: 2 }] },
    { id: "a5", mine: true, text: "Bu mesaj gidemedi", time: at(0, 9, 1), status: "failed" },
  ]
  let $typing: string[] = ["Ece"]
  let $group = true
  let $log = "-"
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $group = !$group}>{$group ? "Birebir" : "Grup"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $typing = $typing.length ? [] : ["Ece", "Can"]}>Yazıyor</Button>
      <Badge tone="primary">{$log}</Badge>
    </div>
    <ChatThread class="lab-chat" label="Akşam yemeği" messages={() => $messages} typing={() => $typing} group={() => $group}
      runMinutes={10} motion={false} jumpColor="brand-pink" jump={(c) => `⬇ ${c} yeni mesaj`}
      days={(d) => d.toLocaleDateString("tr-TR", { weekday: "long" })}
      onReact={(m, e) => { $messages = $messages.map((x) => (x.id === m.id ? { ...x, reactions: [...(x.reactions ?? []), { emoji: e, count: 1, mine: true }] } : x)); $log = `tepki ${e}` }}
      onReply={(m) => $log = `yanıt: ${m.text}`}
      onRetry={(m) => { $messages = $messages.map((x) => (x.id === m.id ? { ...x, status: "sent" } : x)); $log = "yeniden gönderildi" }} />
  </div>
}
