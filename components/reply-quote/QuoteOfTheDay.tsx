// QuoteOfTheDay: the creative-minimal ReplyQuote example.
//
// What it shows: ReplyQuote used as a plain quotation block: a name, a line of text behind a purple bar, with nothing
// cut off. When to use this pattern: any short quotation or note with an author; it needs no callbacks.
//
// Accessibility: the name and the text are plain text read in order.

import { ReplyQuote, Card } from "march/ui"

export function QuoteOfTheDay() {
  // The card is dark: m:theme="night" draws the subtree in the dark colour theme and works on every component.
  return <Card m:theme="night">
    {/* lines={0}: show all of the text (the default cuts it after two lines); m:color: the colour token of the bar and
        the name (a common prop that works on every component). */}
    <ReplyQuote name="Yunus Emre" text="Gelin tanış olalım, işi kolay kılalım." lines={0} m:color="brand-purple" />
  </Card>
}
