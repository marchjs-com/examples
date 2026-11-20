import { ContextMenu } from "march/components/context-menu"

// sohbet: mesaja sağ tıkla (ya da odaklayıp Shift+F10); yalnız kendi mesajın silinebilir, boş alanda tarayıcı menüsü kalır
export function ChatMessages() {
  let $messages = [
    { id: 1, me: false, text: "Yarın toplantı 10'da mı?" },
    { id: 2, me: true, text: "Evet, 10'da. Sunumu ben getiriyorum." },
    { id: 3, me: false, text: "Harika, görüşürüz 👋" },
  ]
  let $pinned = ""
  const find = (t: Element) => $messages.find((m) => m.id === Number(t.closest("[data-id]")?.getAttribute("data-id")))
  return <div sx={{ flex: "col", gap: 2 }}>
    <span sx={{ text: "sm", color: "muted" }}>📌 {$pinned || "Sabitlenmiş mesaj yok"}</span>
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
