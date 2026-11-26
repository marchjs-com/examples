// ChatHistory: the real-life VirtualList example.
//
// What it shows: the history of a chat. Messages have different lengths (so rows have different heights), 50 more
// messages are loaded when you scroll near the end, a spinner shows while loading, and liking a message updates only
// that row.
// When to use this pattern: any long or endless list (feeds, chats, logs, notifications). VirtualList keeps only the
// rows near the viewport in the page, so the list stays fast however many items it holds.
import { VirtualList, Card, Button, Spinner } from "march/ui"
import { heart } from "march/icons"

// Demo data: a page of 50 messages starting at an id; texts and senders cycle so rows get different heights.
type Msg = { id: number; from: string; text: string; likes: number }
const PEOPLE = ["Elif", "Can", "Deniz", "Mert"]
const TEXTS = ["Selam!", "Toplantı kaçta?", "Sunumu paylaştım, bakabilir misin? Özellikle üçüncü sayfadaki tabloyu merak ediyorum.", "👍", "Akşam koşuya var mısın?"]
const page = (from: number): Msg[] => Array.from({ length: 50 }, (_, i) => ({ id: from + i, from: PEOPLE[(from + i) % 4]!, text: TEXTS[(from + i) % TEXTS.length]!, likes: 0 }))

// One message row. VirtualList gives `render` an accessor for the item (`msg` is a function), so each place that shows
// data reads it inside a function: `() => props.msg().text`. That is what lets a changed item (a new like count)
// update the existing row instead of rebuilding it.
const Bubble = (props: { msg: () => Msg; onLike: () => void }) => <div sx={{ flex: ["row", "between"], gap: 2, p: 2 }}>
  <span><b>{() => props.msg().from}</b>: {() => props.msg().text}</span>
  <Button size="sm" variant="ghost" icon={heart} on:click={props.onLike}>{() => String(props.msg().likes)}</Button>
</div>

export function ChatHistory() {
  // Signals: the loaded messages and whether a page is loading right now.
  let $msgs = page(0)
  let $loading = false
  // Loads the next page after 500 ms (a fake server). The $loading guard stops a second load from starting.
  const more = () => { if ($loading) return; $loading = true; setTimeout(() => { $msgs = [...$msgs, ...page($msgs.length)]; $loading = false }, 500) }
  // A like replaces only the one message that changed; because rows are matched by `key`, only that row updates.
  const like = (id: number) => $msgs = $msgs.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
  return <Card title={() => `Sohbet · ${$msgs.length} mesaj`}>
    {/* The list needs a box with a fixed height to scroll inside (scroll="self" is the default). */}
    <div style={{ height: "320px" }}>
      {/* VirtualList props used here:
          - label: the accessible name of the list. The rows are a role="list" of listitems with aria-posinset and
            aria-setsize, so a screen reader can announce "row 41 of 10,000" although only a window of rows exists.
          - items: a function, so the list follows $msgs.
          - key: a stable id per item; rows keep their page elements while the key stays, even when the list changes.
          - estimate={56} and gap={4}: the expected row height until a row has been measured, and the space between rows.
          - onEndReached: called once per item count when the end is within endDistance (800 px by default): the place
            to load more.
          - footer: drawn after the rows; here a Spinner while loading, nothing otherwise.
          - render(item, index): draws one row. */}
      <VirtualList label="Mesajlar" items={() => $msgs} key={(m: Msg) => m.id} estimate={56} gap={4}
        onEndReached={more} footer={() => ($loading ? <Spinner label="Yükleniyor" /> : null)}
        render={(m: () => Msg) => <Bubble msg={m} onLike={() => like(m().id)} />} />
    </div>
  </Card>
}
