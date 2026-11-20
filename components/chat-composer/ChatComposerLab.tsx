import { ChatComposer, Button, Badge, Card } from "march/ui"
import { image, send, mic, heart, plus } from "march/icons"

// ChatComposer'ın bütün özellikleri: gönder, sesli mesaj, ek menüsü, emoji düğmesi, yanıt satırı (kapatılabilir),
// yazıyor sinyali, yer tutucu, kapalı durum, kendi metinler, kendi ikonlar, düğme renkleri, dalga ve kayıt noktası,
// hareket ve sınıf; koyu zeminde
export function ChatComposerLab() {
  let $log = "-"
  let $typing = 0
  let $reply: { name: string; text: string } | null = { name: "Ece", text: "Yarın kaçta buluşuyoruz?" }
  let $off = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $off = !$off}>{$off ? "Aç" : "Kapat"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $reply = { name: "Can", text: "Ben de geliyorum" }}>Can'a yanıt ver</Button>
      <Badge tone="primary">{$log}</Badge>
      <span sx={{ text: "xs", color: "muted" }}>{`yazıyor sinyali: ${$typing}`}</span>
    </div>
    <Card m:theme="night">
      <ChatComposer class="lab-composer" placeholder={() => ($off ? "Sohbet kapalı" : "Bir mesaj yaz")} disabled={() => $off}
        onSend={(text) => { $log = `gönderildi: ${text}`; $reply = null }}
        onVoice={(ms) => $log = `ses: ${ms} ms`} onTyping={() => $typing++}
        attachments={[{ label: "Fotoğraf", icon: image, onSelect: () => $log = "ek: fotoğraf" }]}
        emoji={true} replyTo={() => $reply} onCancelReply={() => $reply = null}
        labels={{ message: "Mesaj kutusu", emoji: "Emoji seç", attach: "Ekle", send: "Yolla", record: "Kaydet", sendVoice: "Sesi yolla",
          cancelRecording: "Kaydı at", cancelReply: "Yanıtı kapat", recording: "Kaydediliyor", replyingTo: (n) => `${n} kişisine yanıt` }}
        attachIcon={plus} emojiIcon={heart} sendIcon={send} micIcon={mic} sendColor="brand-green" micColor="brand-pink"
        wave={false} recordingDot={false} motion={false} />
    </Card>
  </div>
}
