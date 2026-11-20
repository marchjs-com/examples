import { Secret, Card, Badge, Button } from "march/ui"
import { creditCard } from "march/icons"

// ödeme yöntemleri: kartın yalnız son 4 hanesi görünür, telefonun ortası gizli; ayrıntıyı göstermek tek dokunuş
const cards = [
  { brand: "Visa", number: "4111111111114242", main: true },
  { brand: "Mastercard", number: "5555444433331881", main: false },
]

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: ["row", "center", "between"], gap: 2 }}>
  <span sx={{ text: "sm", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PaymentMethods() {
  let $main = "Visa"
  return <Card title="Ödeme yöntemleri">
    <div sx={{ flex: "col", gap: 3 }}>
      {cards.map((c) => <Row title={c.brand}>
        <div sx={{ flex: ["row", "center"], gap: 2 }}>
          <Secret value={c.number} regions={[[0, -4]]} maskLength={4} toggle={false} size="sm" />
          {() => $main === c.brand
            ? <Badge tone="success">Varsayılan</Badge>
            : <Button size="sm" variant="ghost" icon={creditCard} on:click={() => $main = c.brand}>Varsayılan yap</Button>}
        </div>
      </Row>)}
      <Row title="Telefon">
        <Secret value="0532 418 27 90" regions={[[5, -2]]} mask="*" size="sm" labels={{ show: "Numarayı göster", hide: "Numarayı gizle" }} />
      </Row>
      <span sx={{ flex: ["row", "center"], gap: 1, text: "xs", color: "muted" }}>Gizli haneler sayfada hiç yer almaz.</span>
    </div>
  </Card>
}
