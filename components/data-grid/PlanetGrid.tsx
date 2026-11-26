// PlanetGrid: the creative-minimal DataGrid example.
//
// What it shows: the solar system in a table. Click a header to sort; the last row adds up the moons (and shows the
// farthest distance). The least you need is `rows` and `columns`: sorting, the keyboard cell cursor and the totals
// row come with the grid.
// When to use this pattern: a small, read-only table where you still want sorting, filters and totals.
// Animation: row entrance and column slide run on the motion engine (reduced motion, global speed and "Stop all"
// apply); pass animate={false} to turn them off.
import { DataGrid } from "march/components/data-grid"

// Plain rows: an array of objects. Each column's `key` names the field to show.
const planets = [
  { id: 1, name: "Merkür", distance: 0.39, moons: 0, ring: "yok" },
  { id: 2, name: "Venüs", distance: 0.72, moons: 0, ring: "yok" },
  { id: 3, name: "Dünya", distance: 1, moons: 1, ring: "yok" },
  { id: 4, name: "Mars", distance: 1.52, moons: 2, ring: "yok" },
  { id: 5, name: "Jüpiter", distance: 5.2, moons: 95, ring: "ince" },
  { id: 6, name: "Satürn", distance: 9.58, moons: 146, ring: "parlak" },
  { id: 7, name: "Uranüs", distance: 19.2, moons: 28, ring: "ince" },
  { id: 8, name: "Neptün", distance: 30.1, moons: 16, ring: "ince" },
]

// label names the grid for screen readers; height is the scroll area in px.
// toolbar={{ csv: false, groups: false }} switches two toolbar tools off (CSV export and the grouping chips) and keeps
// search, filters and the count. Columns:
// - width: px; type: "number" marks a numeric column;
// - aggregate: a column with one gets the totals footer (here the farthest distance and the sum of moons);
// - filter: "select" adds a pick-list filter built from the values in that column.
export function PlanetGrid() {
  return <DataGrid label="Gezegenler" rows={planets} height={320} toolbar={{ csv: false, groups: false }}
    columns={[
      { key: "name", label: "Gezegen", width: 140 },
      { key: "distance", label: "Uzaklık (AU)", width: 140, type: "number", aggregate: "max" },
      { key: "moons", label: "Uydu", width: 110, type: "number", aggregate: "sum" },
      { key: "ring", label: "Halka", width: 120, filter: "select" },
    ]} />
}
