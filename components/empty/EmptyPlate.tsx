// EmptyPlate: the creative-minimal Empty example.
//
// What it shows: an empty plate. The Empty state has an emoji icon and one button; "Yemek ekle" puts food on the plate and
// the Empty state goes away, "Bitir" empties it again.
// When to use this pattern: an empty list that says what to do next. Show the Empty when the data is empty and the data
// when it is not, as the first function below does.
// Accessibility: Empty is plain content (the icon is decorative, the buttons are ordinary buttons in the Tab order).
import { Empty, Button } from "march/ui"

// What can be put on the plate, one by one.
const FOODS = ["🍕", "🥗", "🍜", "🌮", "🍰"]

// $plate is the list of foods on the plate (replaced, never changed in place, so the view updates).
export function EmptyPlate() {
  let $plate: string[] = []
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* A function child is re-run when $plate changes: foods when there are some, the Empty state when there are none.
            icon takes an emoji here; action takes the button node. */}
    {() => $plate.length
      ? <div sx={{ flex: ["row", "wrap"], gap: 2, text: "xl" }}>
          {$plate.join(" ")}
          <Button size="sm" variant="ghost" on:click={() => $plate = []}>Bitir</Button>
        </div>
      : <Empty icon="🍽️" title="Tabak bomboş" action={<Button variant="primary" on:click={() => $plate = [...$plate, FOODS[0]!]}>Yemek ekle</Button>}>
          Acıktıysanız bir şeyler ekleyin.
        </Empty>}
    {/* Offers one more food until the plate has every food. */}
    {() => $plate.length > 0 && $plate.length < FOODS.length
      ? <Button size="sm" on:click={() => $plate = [...$plate, FOODS[$plate.length]!]}>Bir tane daha</Button> : null}
  </div>
}
