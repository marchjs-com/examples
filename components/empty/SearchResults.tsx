import { Empty, Button, Card, TextInput } from "march/ui"
import { search, x } from "march/icons"

// bir arama sayfası: sonuç yoksa küçük (sm) boş durum ve aramayı temizleyen düğme
const CITIES = ["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya", "Eskişehir"]

export function SearchResults() {
  let $q = "Paris"
  const hits = () => CITIES.filter((c) => c.toLocaleLowerCase("tr").includes($q.toLocaleLowerCase("tr")))
  return <Card title="Şehir ara">
    <TextInput bind:value={$q} aria-label="Şehir" placeholder="Şehir adı" />
    {() => hits().length
      ? <ul>{hits().map((c) => <li>{c}</li>)}</ul>
      : <Empty size="sm" icon={search} title={`"${$q}" için sonuç yok`}
          action={<Button size="sm" icon={x} on:click={() => $q = ""}>Aramayı temizle</Button>}>
          Yazımı kontrol edin ya da başka bir şehir deneyin.
        </Empty>}
  </Card>
}
