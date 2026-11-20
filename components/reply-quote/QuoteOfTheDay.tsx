import { ReplyQuote, Card } from "march/ui"

// günün sözü: alıntı bloğu, mor çubuk, tek satıra kısaltılmaz
export function QuoteOfTheDay() {
  return <Card m:theme="night">
    <ReplyQuote name="Yunus Emre" text="Gelin tanış olalım, işi kolay kılalım." lines={0} m:color="brand-purple" />
  </Card>
}
