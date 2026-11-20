import { ThreadNav, Card, threadPath, type ThreadNavItem } from "march/ui"

// tarif defteri bir ipte: öğünler boncuk, kategoriler kapsülde, tarifler alt iplikte; damla seçilen tarife akar
// bir yer: bölüm, kategori ya da sayfa (ThreadNav'ın öğe biçimi)
type Item = ThreadNavItem
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
  let $dish = "menemen"
  const dish = () => threadPath(recipes, $dish).at(-1)
  // ThreadNav yerini doldurur: kapsülün yüksekliğini çevresindeki kutu verir (sx'te yükseklik yok, style nesnesi)
  return <div sx={{ flex: "row", gap: 3 }}>
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
