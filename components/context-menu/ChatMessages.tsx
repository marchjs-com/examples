// ChatMessages: the real-life ContextMenu example.
//
// What it shows: a chat. Right-click a message (or focus it and press Shift+F10 or the Menu key) to pin it, copy it or
// delete it. Only your own messages can be deleted (the item is disabled for the others), and a right-click on empty
// space keeps the browser's own menu.
// When to use this pattern: one menu for a whole list where the entries depend on the item under the pointer. `items`
// receives the clicked element, so you find the data of the row from it; `when` decides where the menu applies.
// Accessibility: the menu is a real menu: the first item gets focus, arrow keys / Home / End move, Enter runs and
// Escape closes and returns focus. Messages are focusable (tabindex="0") so keyboard users can reach them and open the
// menu without a pointer.
import { ContextMenu } from "march/components/context-menu"

export function ChatMessages() {
  let $messages = [
    { id: 1, me: false, text: "Yarın toplantı 10'da mı?" },
    { id: 2, me: true, text: "Evet, 10'da. Sunumu ben getiriyorum." },
    { id: 3, me: false, text: "Harika, görüşürüz 👋" },
  ]
  let $pinned = ""
  // From the element that was clicked, go up to the row (data-id) and read the message it stands for.
  const find = (t: Element) => $messages.find((m) => m.id === Number(t.closest("[data-id]")?.getAttribute("data-id")))
  return <div sx={{ flex: "col", gap: 2 }}>
    <span sx={{ text: "sm", color: "muted" }}>📌 {$pinned || "Sabitlenmiş mesaj yok"}</span>
    {/* label: the accessible name of the menu. when: return false to keep the browser menu (here: outside a message).
        items: a function of the clicked element, so the entries are built for that message. A "-" is a separator;
        `danger` styles the item as destructive; `disabled` keeps it visible but not selectable; `shortcut` is only
        shown on the row (it does not bind the key); onSelect runs when the item is chosen. */}
    <ContextMenu label="Mesaj işlemleri" when={(t: Element) => !!t.closest("[data-id]")} items={(t: Element) => {
      const m = find(t)!
      return [
        { label: "Sabitle", onSelect: () => { $pinned = m.text } },
        { label: "Kopyala", shortcut: "mod+c" },
        "-",
        { label: "Sil", danger: true, disabled: !m.me, onSelect: () => { $messages = $messages.filter((x) => x.id !== m.id) } },
      ]
    }}>
      <div sx={{ flex: "col", gap: 1 }}>
        {$messages.map((m) => <p data-id={m.id} tabindex="0" sx={{ p: 2, radius: 3 }}
          style={{ alignSelf: m.me ? "flex-end" : "flex-start", margin: 0, background: m.me ? "var(--m-primary-soft)" : "var(--m-surface-2)" }}>{m.text}</p>)}
      </div>
    </ContextMenu>
  </div>
}
