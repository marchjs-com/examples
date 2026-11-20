import { IconButton, Toolbar, Divider, toast, confirm } from "march/ui"
import { copy, send, pin, externalLink, trash } from "march/icons"

// bir yazının araç çubuğu: kopyala, paylaş, sabitle (aç / kapa), kaynağa git (bağlantı), sil (onaylı)
export function ShareBar() {
  let $pinned = false
  let $gone = false
  const remove = async () => { if (await confirm("Yazı silinsin mi?")) { $gone = true; toast("Yazı silindi") } }
  return <Toolbar label="Yazı işlemleri" m:no-select>
    <span sx={{ text: "bold" }}>{$gone ? "Silindi" : "Sinyallerle tanışın"}</span>
    <Divider vertical />
    <IconButton icon={copy} label="Bağlantıyı kopyala" on:click={() => toast("Bağlantı kopyalandı")} />
    <IconButton icon={send} label="Paylaş" on:click={() => toast("Paylaşım penceresi açıldı")} />
    <IconButton icon={pin} label={$pinned ? "Sabitlemeyi kaldır" : "Sabitle"} pressed={$pinned} on:click={() => $pinned = !$pinned} />
    <IconButton icon={externalLink} label="Kaynağı aç" href="https://github.com" target="_blank" rel="noopener" />
    <IconButton icon={trash} label="Sil" variant="danger" disabled={$gone} on:click={remove} />
  </Toolbar>
}
