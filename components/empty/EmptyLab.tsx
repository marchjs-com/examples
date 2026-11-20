import { Empty, Button, Card, action } from "march/ui"
import { inbox, users, plus, sparkles } from "march/icons"

// Empty'nin bütün özellikleri bir arada: icon (glif, emoji, kendi düğümün ya da yok), size (md / sm),
// title (metin, erişimci, varsayılan ya da false), action (düğüm, liste, action() nesnesi), class ve children
export function EmptyLab() {
  let $invited = 0
  const invite = action("Davet et", () => { $invited++ })
  return <div sx={{ flex: "col", gap: 3 }}>
    <Empty icon={inbox} title="Gelen kutusu boş" action={<Button variant="primary" icon={plus}>Yeni mesaj</Button>}>
      Yeni bir konuşma başlatın.
    </Empty>
    <Empty size="sm" icon="📭" title={() => `Davet edilen: ${$invited}`} action={invite} class="lab-empty">
      action() nesnesi düğme olarak çizilir.
    </Empty>
    <Empty size="sm" icon={users} action={[<Button size="sm">Ekip kur</Button>, <Button size="sm" variant="ghost">Sonra</Button>]} />
    <Empty icon={<span class="lab-art" sx={{ text: "xl" }}>🌵</span>} title={false}>Başlıksız; ikon kendi düğümüm.</Empty>
    <Card m:theme="night">
      <Empty icon={sparkles} title="Koyu zeminde" />
    </Card>
  </div>
}
