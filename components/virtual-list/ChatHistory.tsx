import { VirtualList, Card, Button, Spinner } from "march/ui"
import { heart } from "march/icons"

// bir sohbetin geçmişi: farklı uzunlukta mesajlar, sona yaklaşınca 50 mesaj daha yüklenir; beğeni yalnız o satırı günceller
type Msg = { id: number; from: string; text: string; likes: number }
const PEOPLE = ["Elif", "Can", "Deniz", "Mert"]
const TEXTS = ["Selam!", "Toplantı kaçta?", "Sunumu paylaştım, bakabilir misin? Özellikle üçüncü sayfadaki tabloyu merak ediyorum.", "👍", "Akşam koşuya var mısın?"]
const page = (from: number): Msg[] => Array.from({ length: 50 }, (_, i) => ({ id: from + i, from: PEOPLE[(from + i) % 4]!, text: TEXTS[(from + i) % TEXTS.length]!, likes: 0 }))

// tek bir mesaj satırı
const Bubble = (props: { msg: () => Msg; onLike: () => void }) => <div sx={{ flex: ["row", "between"], gap: 2, p: 2 }}>
  <span><b>{() => props.msg().from}</b>: {() => props.msg().text}</span>
  <Button size="sm" variant="ghost" icon={heart} on:click={props.onLike}>{() => String(props.msg().likes)}</Button>
</div>

export function ChatHistory() {
  let $msgs = page(0)
  let $loading = false
  const more = () => { if ($loading) return; $loading = true; setTimeout(() => { $msgs = [...$msgs, ...page($msgs.length)]; $loading = false }, 500) }
  const like = (id: number) => $msgs = $msgs.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
  return <Card title={() => `Sohbet · ${$msgs.length} mesaj`}>
    <div style={{ height: "320px" }}>
      <VirtualList label="Mesajlar" items={() => $msgs} key={(m: Msg) => m.id} estimate={56} gap={4}
        onEndReached={more} footer={() => ($loading ? <Spinner label="Yükleniyor" /> : null)}
        render={(m: () => Msg) => <Bubble msg={m} onLike={() => like(m().id)} />} />
    </div>
  </Card>
}
