import { Breadcrumbs, Button, Card } from "march/ui"
import { folder, cloud } from "march/icons"

// bir bulut sürücüsünün başlığı: yol parçasına basınca o klasöre dönülür, ok menüsü aynı yerdeki öbür klasörleri açar;
// altta açık klasörün içi, bir klasöre basınca içine girilir
const TREE: Record<string, string[]> = {
  "Sürücüm": ["Belgeler", "Fotoğraflar", "Projeler"],
  "Belgeler": ["Faturalar", "Sözleşmeler"],
  "Fotoğraflar": ["2025 Tatil", "Aile"],
  "Projeler": ["March", "HADİ"],
}

export function DriveBrowser() {
  let $path = ["Sürücüm", "Belgeler"]
  const go = (path: string[]) => { $path = path }
  const crumbs = () => $path.map((name, i) => ({
    id: name, label: name, icon: i === 0 ? cloud : folder, onSelect: () => go($path.slice(0, i + 1)),
    // ilk parça dışında her parça, üst klasördeki kardeşlerine bir menü açar
    ...(i > 0 ? { siblings: TREE[$path[i - 1]!]!.map((s) => ({ id: s, label: s, icon: folder, current: s === name, onSelect: () => go([...$path.slice(0, i), s]) })) } : {}),
  }))
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <Breadcrumbs label="Klasör yolu" items={crumbs} />
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {() => {
          const inside = TREE[$path[$path.length - 1]!] ?? []
          return inside.length
            ? inside.map((name) => <Button variant="ghost" icon={folder} on:click={() => go([...$path, name])}>{name}</Button>)
            : <span sx={{ color: "muted" }}>Bu klasör boş.</span>
        }}
      </div>
    </div>
  </Card>
}
