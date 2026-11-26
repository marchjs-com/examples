// ChatComposerLab: the full-featured ChatComposer example; it uses every prop at least once.
//
// Props shown here: onSend, onVoice (voice messages), attachments (the attach menu), emoji (the emoji button), replyTo
// with onCancelReply (a closable reply row), onTyping (the "typing" signal), placeholder, disabled, labels (every text),
// your own icons, the button colours, wave and recordingDot, motion, and class; the whole thing on a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ChatComposerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ChatComposer, Button, Badge, Card } from "march/ui"
import { image, send, mic, heart, plus } from "march/icons"

export function ChatComposerLab() {
  // The last event as text, how many typing signals went out, the reply row's content (null hides it), and whether the
  // chat is closed. Plain `let $x` variables are reactive state.
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
    {/* m:theme="night" on the Card shows the composer on a dark surface.
        The composer:
        - class: added to the form so CSS or a test can find it.
        - placeholder and disabled as functions stay live: the button above closes the chat and the field follows.
        - onSend(text): called when the user presses Enter (Shift+Enter breaks the line) or the send button; the Lab
          logs it and clears the reply row.
        - onVoice(ms): its presence enables the microphone button; recording replaces the field with a timer, and the
          round button sends the recording (its length in milliseconds), while the trash button or Escape drops it.
        - onTyping: called at most once a second while the user types.
        - attachments: the items of the attach menu ({ label, icon, onSelect }); emoji={true} shows the emoji button.
        - replyTo (a function) + onCancelReply: the reply row above the field and what happens when it is closed.
        - labels: every accessible name and text the composer writes, so you can translate or reword it (message,
          emoji, attach, send, record, sendVoice, cancelRecording, cancelReply, recording, and replyingTo as a function
          of the name).
        - attachIcon, emojiIcon, sendIcon, micIcon: your own icons. sendColor / micColor: the colour tokens of the round
          button in its two states (sending and recording).
        - wave={false} and recordingDot={false}: no live waveform and no pulsing dot while recording. motion={false}:
          no morph of the round button, no reply-row slide and no pulse. When motion is on, it follows reduced motion
          and the global speed / "Stop all" settings. */}
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
