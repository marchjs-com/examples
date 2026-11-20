import { Popover, Button, TextInput, toast } from "march/ui"
import { link } from "march/icons"

// paylaşım bağlantısı: açılır panelde bağlantı ve kopyala; alt çubukta kapat
export function ShareLink() {
  const url = "https://marchjs.com/p/42"
  return <Popover trigger={<Button icon={link}>Paylaş</Button>} title="Bağlantıyı paylaş" width="md" closable
    footer={<span sx={{ text: "xs", color: "muted" }}>Bağlantısı olan herkes görebilir</span>}>
    {(close: () => void) => <div sx={{ flex: "row", gap: 2 }}>
      <TextInput aria-label="Bağlantı" value={url} readonly />
      <Button variant="primary" on:click={() => { toast("Kopyalandı"); close() }}>Kopyala</Button>
    </div>}
  </Popover>
}
