import { ErrorBox, Card } from "march/ui"

// kayıp kedi: her denemede başka bir yere bakılır, üçüncüsünde kedi bulunur
const PLACES = ["Koltuğun altında yok.", "Dolabın içinde de yok.", "Balkonda da yok."]

export function LostCat() {
  let $tries = 0
  return <Card title="Pamuk nerede?">
    {() => $tries >= 3
      ? <p sx={{ text: "lg" }}>🐈 Pamuk kutunun içinde uyuyormuş!</p>
      : <ErrorBox title="Kedi bulunamadı" message={PLACES[$tries]} retry={() => $tries++} retryLabel="Başka yere bak" />}
  </Card>
}
