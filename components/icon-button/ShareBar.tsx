// ShareBar: the real-life IconButton example.
//
// What it shows: the toolbar of an article: copy link, share, pin (a toggle), open the source (a link) and delete (with a
// confirmation dialog).
// When to use this pattern: a row of icon-only actions. Put the IconButtons in a Toolbar so the row is one Tab stop with
// arrow-key navigation; every IconButton still needs a `label` for its accessible name.
// Accessibility: `href` makes the button a link (a real <a>), `pressed` sets aria-pressed, `disabled` is passed through
// to the button, and confirm() shows an accessible dialog before the destructive action.
import { IconButton, Toolbar, Divider, toast, confirm } from "march/ui"
import { copy, send, pin, externalLink, trash } from "march/icons"

export function ShareBar() {
  // State: whether the article is pinned and whether it is deleted.
  let $pinned = false
  let $gone = false
  // Asks for confirmation first (confirm returns a promise of true / false); only a yes marks the article deleted.
  const remove = async () => { if (await confirm("Yazı silinsin mi?")) { $gone = true; toast("Yazı silindi") } }
  // Toolbar groups the buttons: its label names the group, and arrow keys move between the buttons.
  // m:no-select (a common prop) makes the text in this subtree unselectable, so a double click on a button does not select words.
  return <Toolbar label="Yazı işlemleri" m:no-select>
    <span sx={{ text: "bold" }}>{$gone ? "Silindi" : "Sinyallerle tanışın"}</span>
    {/* A vertical line separating the title from the actions. */}
    <Divider vertical />
    {/* Plain action buttons: icon + label + click handler. The label is both the accessible name and the tooltip.
        The pin button is a toggle: the label and pressed follow $pinned. The source button has href, so it is a link;
        target and rel are passed to the <a>. The delete button uses variant="danger" (red icon) and is disabled after deleting. */}
    <IconButton icon={copy} label="Bağlantıyı kopyala" on:click={() => toast("Bağlantı kopyalandı")} />
    <IconButton icon={send} label="Paylaş" on:click={() => toast("Paylaşım penceresi açıldı")} />
    <IconButton icon={pin} label={$pinned ? "Sabitlemeyi kaldır" : "Sabitle"} pressed={$pinned} on:click={() => $pinned = !$pinned} />
    <IconButton icon={externalLink} label="Kaynağı aç" href="https://github.com" target="_blank" rel="noopener" />
    <IconButton icon={trash} label="Sil" variant="danger" disabled={$gone} on:click={remove} />
  </Toolbar>
}
