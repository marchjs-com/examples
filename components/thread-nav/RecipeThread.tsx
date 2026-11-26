// RecipeThread: the creative-minimal ThreadNav example.
//
// What it shows: a recipe book hung on a thread. The meals are beads on the thread (breakfast, main course, dessert), the
// categories sit in a capsule that opens beside a bead, and the recipes hang from a category on a second thread. A drop marks
// the chosen recipe and flows to a new place when you pick another; the card on the right shows the chosen recipe.
// When to use this pattern: a three-level menu (section, category, page) that should feel playful and take little room. The
// data is a plain tree ({ id, label, desc?, count?, color?, children? }) and you decide what "navigate" means: here it only
// stores the chosen id. `color` (a colour token) tints a section's drop and capsule; `desc` shows under the capsule while a row
// is pointed at or focused; `count` is the small number beside a category.
//
// Animation: the beads magnify like a dock near the pointer, the thread bends toward it, and the drop flows between places,
// all on March's motion engine, so the global speed, "Stop all" and the visitor's reduced-motion preference apply (under
// reduced motion the thread stays straight and the drop does not stretch). `magnify={false}` and `bend={false}` switch the
// first two off for one ThreadNav (see ThreadNavLab).
// Accessibility: the rail is a nav with one tab stop (the bead of where you are). Up and Down move between beads; Right, Enter
// or Space opens the capsule; in the capsule Up and Down move through the rows, Right opens a category, Left goes back, Escape
// closes and returns to the bead. Where you are has aria-current; a bead with a capsule has aria-expanded.
import { ThreadNav, Card, threadPath, type ThreadNavItem } from "march/ui"

// A place: a section, a category or a page (the item shape of ThreadNav).
type Item = ThreadNavItem
// The tree: three sections (beads), each with one category (in the capsule) holding two recipes (the second thread).
const recipes: Item[] = [
  { id: "breakfast", label: "Kahvaltı", color: "brand-gold", children: [
    { id: "eggs", label: "Yumurtalar", count: 2, children: [
      { id: "menemen", label: "Menemen", desc: "Domates, biber, bol sabır" },
      { id: "cilbir", label: "Çılbır", desc: "Sarımsaklı yoğurt, kızgın tereyağı" },
    ] },
  ] },
  { id: "main", label: "Ana yemek", color: "brand-orange", children: [
    { id: "stews", label: "Tencere", count: 2, children: [
      { id: "kuru", label: "Kuru fasulye", desc: "Akşamdan ıslat, sabah unutma" },
      { id: "karniyarik", label: "Karnıyarık", desc: "Patlıcan, kıyma, fırın" },
    ] },
  ] },
  { id: "dessert", label: "Tatlı", color: "brand-pink", children: [
    { id: "milky", label: "Sütlü", count: 2, children: [
      { id: "sutlac", label: "Sütlaç", desc: "Fırında, üstü kızarmış" },
      { id: "kazandibi", label: "Kazandibi", desc: "Dibi tutması işin sırrı" },
    ] },
  ] },
]

export function RecipeThread() {
  // Reactive state: the id of the chosen recipe. threadPath(items, id) returns the path from the section down to that item,
  // so its last element is the item itself (its label and description feed the card).
  let $dish = "menemen"
  const dish = () => threadPath(recipes, $dish).at(-1)
  return <div sx={{ flex: "row", gap: 3 }}>
    {/* ThreadNav fills its place: the box around it gives the capsule's height (there is no height in sx, so a style
        object is used). items: the tree. value: the id of where you are. search={false}: no search field in the capsule
        (the tree is tiny). onNavigate receives the chosen item (a page, or an item without children). */}
    <div style={{ "block-size": "17rem" }}>
      <ThreadNav items={recipes} value={$dish} search={false} onNavigate={(it: Item) => $dish = it.id} />
    </div>
    <div sx={{ flex: "grow" }}>
      <Card title="Bugün ne pişirsek?">
        <p sx={{ text: "2xl", color: "brand-orange" }}>{dish()?.label}</p>
        <p sx={{ color: "muted" }}>{dish()?.desc}</p>
      </Card>
    </div>
  </div>
}
