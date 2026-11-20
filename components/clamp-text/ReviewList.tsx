import { ClampText, Card, Avatar } from "march/ui"

// bir ürün sayfasının yorumları: her yorum iki satıra katlı; "devamı" yalnız sığmayan yorumda çıkar
const reviews = [
  { name: "Elif Arslan", stars: 5, text: "Kulaklık beklediğimden hafif çıktı. Gürültü engelleme metroda bile işini görüyor; şarjı iki gün gidiyor. Tek eksiği kutudan çıkan kablonun kısa olması, masada çalışırken uzatma kullanmak zorunda kaldım. Yine de bu fiyata rakibi yok." },
  { name: "Can Yılmaz", stars: 4, text: "Ses güzel, kutu şık." },
  { name: "Deniz Kaya", stars: 3, text: "İlk hafta çok memnundum ama sol kulaklık arada bağlantıyı koparıyor. Destek ekibi hızlı yanıt verdi ve yazılım güncellemesi önerdi; güncellemeden sonra sorun azaldı ama tamamen bitmedi. Değişim için başvurdum, sonucu buraya yazacağım." },
]

// tek yorum: avatar, ad, yıldızlar ve katlanan metin
const Review = (props: { name: string; stars: number; text: string }) => <div sx={{ flex: "col", gap: 1 }}>
  <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <Avatar name={props.name} size="sm" />
    <span sx={{ text: "bold" }}>{props.name}</span>
    <span sx={{ color: "brand-gold" }}>{"★".repeat(props.stars)}{"☆".repeat(5 - props.stars)}</span>
  </div>
  <ClampText lines={2} text={props.text} />
</div>

export function ReviewList() {
  return <Card title="Yorumlar (3)">
    <div sx={{ flex: "col", gap: 3 }}>{reviews.map((r) => <Review name={r.name} stars={r.stars} text={r.text} />)}</div>
  </Card>
}
