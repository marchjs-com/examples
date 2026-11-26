// SearchResults: the real-life Empty example.
//
// What it shows: a city search. While the text matches, the cities are listed; when nothing matches, a small Empty
// state names the search and offers a button that clears it.
// When to use this pattern: "no results" states, where the way out (clear, change the filter) is a button in the Empty.
// The search lower-cases with the Turkish locale, so the dotted and dotless i letters are matched correctly.
import { Empty, Button, Card, TextInput } from "march/ui"
import { search, x } from "march/icons"

// The data to search.
const CITIES = ["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya", "Eskişehir"]

// $q is the search text; hits() is the list of cities that contain it.
export function SearchResults() {
  let $q = "Paris"
  const hits = () => CITIES.filter((c) => c.toLocaleLowerCase("tr").includes($q.toLocaleLowerCase("tr")))
  return <Card title="Şehir ara">
    {/* bind:value ties the field to $q; aria-label names it because there is no visible label. */}
    <TextInput bind:value={$q} aria-label="Şehir" placeholder="Şehir adı" />
    {/* A function child: the list when there are hits, otherwise the Empty state. size="sm" is the compact form;
            title and the action button name what happened and how to get out of it. */}
    {() => hits().length
      ? <ul>{hits().map((c) => <li>{c}</li>)}</ul>
      : <Empty size="sm" icon={search} title={`"${$q}" için sonuç yok`}
          action={<Button size="sm" icon={x} on:click={() => $q = ""}>Aramayı temizle</Button>}>
          Yazımı kontrol edin ya da başka bir şehir deneyin.
        </Empty>}
  </Card>
}
