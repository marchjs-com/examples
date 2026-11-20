import { DataGrid } from "march/components/data-grid"

// Güneş sistemi bir tabloda: başlığa basınca sıralanır, alttaki satır uydu sayılarını toplar
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

export function PlanetGrid() {
  return <DataGrid label="Gezegenler" rows={planets} height={320} toolbar={{ csv: false, groups: false }}
    columns={[
      { key: "name", label: "Gezegen", width: 140 },
      { key: "distance", label: "Uzaklık (AU)", width: 140, type: "number", aggregate: "max" },
      { key: "moons", label: "Uydu", width: 110, type: "number", aggregate: "sum" },
      { key: "ring", label: "Halka", width: 120, filter: "select" },
    ]} />
}
