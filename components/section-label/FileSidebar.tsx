import { Card, SectionLabel, IconButton } from "march/ui"
import { fileText, folder, x, plus } from "march/icons"

// bir kod düzenleyicisinin yan paneli: "Açık dosyalar" (sayı + hepsini kapat) ve "Proje" (klasör ikonu + yeni dosya)
// her grubun küçük başlığı aynı görünüşte; sayılar listeyle birlikte değişir
const Item = (props: { name: string; onClose?: () => void }) => <div sx={{ flex: ["row", "between", "center"], px: 1 }}>
  <span>{props.name}</span>
  {props.onClose ? <IconButton icon={x} label={`${props.name} kapat`} size="xs" on:click={props.onClose} /> : null}
</div>

export function FileSidebar() {
  let $open = ["App.tsx", "router.ts"]
  let $files = ["App.tsx", "router.ts", "main.css"]
  let $n = 1
  const addFile = () => { $files = [...$files, `yeni-${$n}.ts`]; $n += 1 }
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <SectionLabel icon={fileText} count={$open.length}
        actions={<IconButton icon={x} label="Hepsini kapat" size="xs" on:click={() => $open = []} />}>Açık dosyalar</SectionLabel>
      {$open.map((f) => <Item name={f} onClose={() => $open = $open.filter((o) => o !== f)} />)}
      <SectionLabel icon={folder} count={$files.length} rule
        actions={<IconButton icon={plus} label="Yeni dosya" size="xs" on:click={addFile} />}>Proje</SectionLabel>
      {$files.map((f) => <Item name={f} />)}
    </div>
  </Card>
}
