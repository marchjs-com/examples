import { Table } from "march/table"

// atıştırmalık tablosu: başlığa tıkla, kaloriye ya da ada göre sırala; arama kutusu süzer
const SNACKS = [
  { ad: "🍎 Elma", kalori: 52, tat: "tatlı" }, { ad: "🥨 Simit", kalori: 280, tat: "tuzlu" }, { ad: "🍫 Çikolata", kalori: 546, tat: "tatlı" },
  { ad: "🥜 Fıstık", kalori: 567, tat: "tuzlu" }, { ad: "🥕 Havuç", kalori: 41, tat: "tatlı" }, { ad: "🧀 Peynir", kalori: 402, tat: "tuzlu" },
]

export function Snacks() {
  return <Table rows={SNACKS} rowKey="ad" caption="Atıştırmalıklar" paging={false} columns={[
    { key: "ad", label: "Atıştırmalık" },
    { key: "kalori", label: "Kalori (100 g)", align: "end", format: "number" },
    { key: "tat", label: "Tat", filter: "select", options: ["tatlı", "tuzlu"] },
  ]} />
}
