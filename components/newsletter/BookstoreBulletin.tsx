// BookstoreBulletin: the real-life Newsletter example.
//
// A bookshop's newsletter sign-up: a title, a lead line, a note under the form and a thank-you line. The "server" answers
// after 600 ms (the button shows its spinner meanwhile) and refuses an address that is already subscribed, which the
// form shows as an error. Use this pattern when onSubmit talks to a real API: let it throw to show the error.
import { Newsletter } from "march/landing"

// A fake back end. `kayitli` (registered) is the set of addresses already subscribed.
const kayitli = new Set(["okur@ornek.com"])
// onSubmit may return a Promise: while it is pending the button shows a spinner and cannot be pressed twice.
// Rejecting (or throwing) shows the Error's message under the field and shakes it; resolving shows the thank-you line.
const kaydet = (email: string) => new Promise((ok, no) => setTimeout(() => {
  if (kayitli.has(email)) no(new Error("Bu adres zaten bültende."))
  else { kayitli.add(email); ok(true) }
}, 600))

export function BookstoreBulletin() {
  // title / lead / note are free text above, between and below the form. placeholder is the field's hint text and
  // button the button's text. `done` replaces the form after a success. Everything not set here (layout, doneIcon,
  // labels, motion) keeps its default: inline layout, a check mark and the built-in texts.
  // The field is a labelled email input and an error is announced to screen readers, so no extra markup is needed.
  return <Newsletter title="Haftanın kitapları" lead="Her cuma beş yeni kitap, bir de söyleşi daveti."
    placeholder="okur@ornek.com" button="Abone ol" note="Ayrılmak tek tık. Adresini kimseyle paylaşmayız."
    done="Teşekkürler! İlk bülten cuma sabahı gelecek." onSubmit={kaydet} />
}
