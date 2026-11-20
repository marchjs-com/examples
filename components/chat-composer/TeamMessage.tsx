import { ChatComposer, toast } from "march/ui"
import { image, fileText, mapPin } from "march/icons"

// bir ekip sohbetinin yazma kutusu: metin ya da sesli mesaj gönderir, ek menüsünden fotoğraf / dosya / konum seçilir,
// yazarken "yazıyor…" sinyali gider; gönderilenler üstte listelenir
export function TeamMessage() {
  let $sent: string[] = []
  let $typing = ""
  const add = (s: string) => { $sent = [...$sent.slice(-3), s]; $typing = "" }
  return <div sx={{ flex: "col", gap: 2 }}>
    <ul sx={{ flex: "col", gap: 1 }}>{$sent.length ? $sent.map((s) => <li>{s}</li>) : <li sx={{ color: "muted" }}>Henüz mesaj yok</li>}</ul>
    <span sx={{ text: "xs", color: "muted" }}>{$typing}</span>
    <ChatComposer placeholder="#tasarım kanalına yaz"
      onSend={(text) => add(`💬 ${text}`)}
      onVoice={(ms) => add(`🎤 Sesli mesaj · ${(ms / 1000).toFixed(1)} sn`)}
      onTyping={() => $typing = "Ekibe: yazıyor…"}
      attachments={[
        { label: "Fotoğraf", icon: image, onSelect: () => add("🖼️ Fotoğraf eklendi") },
        { label: "Dosya", icon: fileText, onSelect: () => add("📄 Dosya eklendi") },
        { label: "Konum", icon: mapPin, onSelect: () => toast("Konum izni istenir") },
      ]} />
  </div>
}
