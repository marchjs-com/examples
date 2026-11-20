import { TreeView } from "march/components/tree-view"
import { Card, SearchBox } from "march/ui"
import { book, coffee, heart } from "march/icons"

// bir tarif defteri: bölümler, tarifler; yazdıkça arar, eşleşen tarifler ve yolları vurgulanır
const book1 = [
  { id: "breakfast", label: "Kahvaltı", icon: coffee, children: [
    { id: "menemen", label: "Menemen", meta: "15 dk" },
    { id: "pancake", label: "Pankek", meta: "20 dk" },
    { id: "simit", label: "Ev yapımı simit", meta: "1 sa" },
  ] },
  { id: "dinner", label: "Akşam yemeği", icon: book, children: [
    { id: "manti", label: "Mantı", meta: "2 sa" },
    { id: "pilaf", label: "Tereyağlı pilav", meta: "30 dk" },
    { id: "kofte", label: "Izgara köfte", meta: "40 dk" },
  ] },
  { id: "fav", label: "Favoriler", icon: heart, children: [{ id: "baklava", label: "Baklava", meta: "3 sa" }] },
]

export function RecipeBook() {
  let $q = ""
  return <Card title="Tarif defteri">
    <SearchBox label="Tarif ara" placeholder="Tarif ara (ör. pilav)" value={() => $q} onInput={(q: string) => $q = q} />
    <TreeView label="Tarifler" nodes={book1} expanded={["breakfast", "dinner"]} search={() => $q} height={260} m:color="brand-orange" />
  </Card>
}
