// RecipeBook: the creative-minimal TreeView example.
//
// What it shows: a recipe book with sections (breakfast, dinner, favourites) and recipes inside them. Type in the
// search box and the matching recipes show up together with their section, the matching text highlighted.
// When to use this pattern: a small hierarchy that people search more often than they browse. TreeView's `search`
// prop does the filtering and the highlighting; you only feed it the text from a SearchBox.
import { TreeView } from "march/components/tree-view"
import { Card, SearchBox } from "march/ui"
import { book, coffee, heart } from "march/icons"

// Nodes are { id, label, icon?, meta?, children? }. `icon` replaces the default folder / file icon of that node;
// `meta` is a small text at the end of the row (the preparation time here). Ids must be unique in the tree.
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
  // The search text (a signal). Both components below read it through a function so they follow it live.
  let $q = ""
  return <Card title="Tarif defteri">
    {/* SearchBox: `label` is its accessible name, value + onInput keep $q in sync with what is typed. */}
    <SearchBox label="Tarif ara" placeholder="Tarif ara (ör. pilav)" value={() => $q} onInput={(q: string) => $q = q} />
    {/* TreeView props used here:
        - label: the accessible name of the tree.
        - expanded: the sections that start open.
        - search: a function, so the tree reads $q live. It shows the hits with the path to each one and highlights
          the matching text (only loaded nodes are searched, which is all of them here).
        - height: the visible height in pixels.
        - m:color is a common prop (every component takes it): the colour token of the tree and everything in it.
        Keyboard: one Tab stop, then arrows, Home / End, and Left / Right to close / open a section. The open and
        close animation uses the motion engine, so reduced motion and the global speed apply; animate={false} turns
        it off. */}
    <TreeView label="Tarifler" nodes={book1} expanded={["breakfast", "dinner"]} search={() => $q} height={260} m:color="brand-orange" />
  </Card>
}
