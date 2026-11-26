// Snacks: the creative-minimal Table example.
//
// What it shows: the smallest useful Table: six snacks with their calories and taste. The header can be pressed to sort by
// calories or by name, the search box filters the rows, and the taste column has a dropdown filter.
// When to use this pattern: a short list of records that people want to sort and search. You only give `rows`, a `rowKey`
// and `columns`; the toolbar, sorting and filtering come with it. (`paging={false}` shows every row on one page.)
//
// Animation: none; the table has nothing to switch off here.
// Accessibility: a plain table with scope="col" headers and aria-sort on the sorted column; `caption` is its accessible
// name.
import { Table } from "march/table"

// The data: one object per row; the column keys below name these fields (they do not have to be English).
const SNACKS = [
  { ad: "🍎 Elma", kalori: 52, tat: "tatlı" }, { ad: "🥨 Simit", kalori: 280, tat: "tuzlu" }, { ad: "🍫 Çikolata", kalori: 546, tat: "tatlı" },
  { ad: "🥜 Fıstık", kalori: 567, tat: "tuzlu" }, { ad: "🥕 Havuç", kalori: 41, tat: "tatlı" }, { ad: "🧀 Peynir", kalori: 402, tat: "tuzlu" },
]

export function Snacks() {
  // rowKey names the field that identifies a row (the default is "id", which these rows do not have). caption is the
  // table's accessible name. paging={false} shows all six rows without pages.
  return <Table rows={SNACKS} rowKey="ad" caption="Atıştırmalıklar" paging={false} columns={[
    // key: the field to show; label: the header text (it is title-cased from the key when left out).
    { key: "ad", label: "Atıştırmalık" },
    // align="end" right-aligns a number; format: "number" writes it with the locale's number format.
    { key: "kalori", label: "Kalori (100 g)", align: "end", format: "number" },
    // filter: "select" adds a dropdown filter on this column; options lists its choices.
    { key: "tat", label: "Tat", filter: "select", options: ["tatlı", "tuzlu"] },
  ]} />
}
