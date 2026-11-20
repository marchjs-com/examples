import { ReplyQuote, TextInput, Button } from "march/ui"

// mesaj yazarken yanıt: alanın üstünde vazgeç düğmeli önizleme
export function ComposerReply() {
  let $reply = true
  return <div sx={{ flex: "col", gap: 2 }}>
    {() => ($reply ? <ReplyQuote name="Deniz Kaya'ya yanıt" text="Cumartesi sabahı sahil koşusu için buluşma yerini değiştirdik." lines={1}
      onClose={() => $reply = false} closeLabel="Yanıttan vazgeç" /> : <Button size="sm" on:click={() => $reply = true}>Yanıtla</Button>)}
    <TextInput aria-label="Mesaj" placeholder="Mesaj yaz…" />
  </div>
}
