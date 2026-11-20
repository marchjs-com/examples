import { ChatComposer } from "march/ui"

// ayna: ne yazarsan büyük harflerle ve tersinden geri gelir; düğme mor, gönder ikonu bir yıldız
export function EmojiMirror() {
  let $last = "🪞 Bir şey yaz, ayna geri söylesin"
  return <div sx={{ flex: "col", gap: 2 }}>
    <p sx={{ text: ["xl", "center"], color: "brand-purple" }}>{$last}</p>
    <ChatComposer placeholder="Aynaya yaz" sendColor="brand-purple" sendIcon="✨"
      onSend={(text) => $last = [...text.toLocaleUpperCase("tr-TR")].reverse().join("")} />
  </div>
}
