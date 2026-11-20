import { Tooltip, IconButton } from "march/ui"
import { bold, italic, link } from "march/icons"

// düzenleyici araçları: IconButton adını zaten ipucu yapar; Tooltip uzun açıklama ve kısayol için
export function EditorTools() {
  return <div sx={{ flex: "row", gap: 1 }}>
    <Tooltip text="Kalın (Ctrl + B)" placement="bottom"><IconButton icon={bold} label="Kalın" title={false} /></Tooltip>
    <Tooltip text="İtalik (Ctrl + I)" placement="bottom"><IconButton icon={italic} label="İtalik" title={false} /></Tooltip>
    <Tooltip text="Bağlantı ekle (Ctrl + K)" placement="bottom" motion="fade"><IconButton icon={link} label="Bağlantı" title={false} /></Tooltip>
  </div>
}
