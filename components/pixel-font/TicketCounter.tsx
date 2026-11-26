// TicketCounter: the real-life PixelFont example.
//
// The "now serving" display of a bank or a pharmacy: a big ticket number and the desk it goes to. Digits in the pixel
// font are all the same width, so the number never jumps as it changes; a fixed `cols` keeps the screen the same size
// for 1 to 3 digits.
import { PixelFont } from "march/led"
import { Button, Card } from "march/ui"

export function TicketCounter() {
  let $ticket = 41
  let $desk = 2
  const call = () => { $ticket = $ticket + 1; $desk = ($desk % 4) + 1 }
  return <Card title="Sıradaki numara">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* font="8x8" is the bolder face for reading from afar; align="end" keeps the digits right-aligned like a
          counter; label is what a screen reader hears (the bare number would not say what it is). */}
      <PixelFont text={() => String($ticket)} font="8x8" cols={22} align="end" color="red" pitch={10} label={() => `Numara ${$ticket}`} />
      <PixelFont text={() => `Gişe ${$desk} :arrow-right:`} color="amber" pitch={6} />
      <Button on:click={call}>Sıradakini çağır</Button>
    </div>
  </Card>
}
