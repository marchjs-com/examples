// PaymentMethods: the real-life Secret example.
//
// What it shows: the payment page of an account. Each card number is shown only by its last 4 digits (and not even
// its real length), the phone number hides its middle, and the user can pick a default card.
// When to use this pattern: any screen that lists sensitive values (cards, IBANs, phone numbers, API keys) where the
// rest of the value should not be on the page at all. While a part is hidden its characters are not in the DOM and not
// in the accessibility tree: they cannot be copied from the page source or read by a screen reader.
import { Secret, Card, Badge, Button } from "march/ui"
import { creditCard } from "march/icons"

// Test card numbers (not real cards). `main` is only data here; the default card is tracked by the signal below.
const cards = [
  { brand: "Visa", number: "4111111111114242", main: true },
  { brand: "Mastercard", number: "5555444433331881", main: false },
]

// A label on the start side and the value on the end side of one row.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: ["row", "center", "between"], gap: 2 }}>
  <span sx={{ text: "sm", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PaymentMethods() {
  // `let $main` is a March signal holding the brand of the default card; changing it redraws the places that read it.
  let $main = "Visa"
  return <Card title="Ödeme yöntemleri">
    <div sx={{ flex: "col", gap: 3 }}>
      {cards.map((c) => <Row title={c.brand}>
        <div sx={{ flex: ["row", "center"], gap: 2 }}>
          {/* Secret options for a card number:
              - regions={[[0, -4]]}: hide from index 0 up to (not including) the 4th character from the end, so only
                the last 4 digits stay visible. A negative index counts from the end.
              - maskLength={4}: draw 4 mask characters for the hidden part whatever its real length, so the length
                of the number is not revealed either.
              - toggle={false}: no eye button, so these numbers can never be shown whole.
              - size="sm": the smaller text. */}
          <Secret value={c.number} regions={[[0, -4]]} maskLength={4} toggle={false} size="sm" />
          {/* A function child is redrawn when the signal it reads changes: the default card gets a Badge, the other
              one a button that makes it the default. */}
          {() => $main === c.brand
            ? <Badge tone="success">Varsayılan</Badge>
            : <Button size="sm" variant="ghost" icon={creditCard} on:click={() => $main = c.brand}>Varsayılan yap</Button>}
        </div>
      </Row>)}
      <Row title="Telefon">
        {/* The phone number keeps the eye button (toggle is on by default) so its owner can reveal it.
            - regions={[[5, -2]]}: hide from the 6th character up to the last 2, keeping the first 5 and last 2.
            - mask="*": the character drawn for each hidden one (the default is a bullet).
            - labels: your own texts for the eye button; it is a toggle button, so its name says what pressing it does
              (show or hide) and aria-pressed says whether the value is shown. */}
        <Secret value="0532 418 27 90" regions={[[5, -2]]} mask="*" size="sm" labels={{ show: "Numarayı göster", hide: "Numarayı gizle" }} />
      </Row>
      <span sx={{ flex: ["row", "center"], gap: 1, text: "xs", color: "muted" }}>Gizli haneler sayfada hiç yer almaz.</span>
    </div>
  </Card>
}
