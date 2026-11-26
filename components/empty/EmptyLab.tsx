// EmptyLab: the full-featured Empty example; it uses every prop at least once.
//
// Props shown here: icon (a glyph, an emoji, your own node, or none), size (md / sm), title (text, a getter, the default
// or false), action (a node, a list, an action() object), class and the children (the explanation).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// EmptyLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Empty, Button, Card, action } from "march/ui"
import { inbox, users, plus, sparkles } from "march/icons"

// $invited counts presses of the action() button; invite is an action() object (a label and a handler).
export function EmptyLab() {
  let $invited = 0
  const invite = action("Davet et", () => { $invited++ })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* icon as a glyph from march/icons (drawn in a raised tile); title is plain text; action as a node (any button you
            build). The children are the explanation line. */}
    <Empty icon={inbox} title="Gelen kutusu boş" action={<Button variant="primary" icon={plus}>Yeni mesaj</Button>}>
      Yeni bir konuşma başlatın.
    </Empty>
    {/* size="sm" is the compact form for a panel, a list or a popup; icon can be an emoji; title as a getter follows
            $invited; action(...) objects are turned into buttons for you; class goes on the root. */}
    <Empty size="sm" icon="📭" title={() => `Davet edilen: ${$invited}`} action={invite} class="lab-empty">
      action() nesnesi düğme olarak çizilir.
    </Empty>
    {/* No title given: the default (translated) "Nothing here yet" is used. action as a list gives several buttons. */}
    <Empty size="sm" icon={users} action={[<Button size="sm">Ekip kur</Button>, <Button size="sm" variant="ghost">Sonra</Button>]} />
    {/* icon can be your own node, which is placed as it is; title={false} leaves the title out. */}
    <Empty icon={<span class="lab-art" sx={{ text: "xl" }}>🌵</span>} title={false}>Başlıksız; ikon kendi düğümüm.</Empty>
    {/* m:theme="night" (a common prop) draws this subtree in the dark theme. */}
    <Card m:theme="night">
      <Empty icon={sparkles} title="Koyu zeminde" />
    </Card>
  </div>
}
