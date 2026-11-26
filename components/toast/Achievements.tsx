// Achievements: the creative-minimal Toast example.
//
// What it shows: a button that "earns" a badge. Every press shows a toast with a purple star, no close button and a
// fade-in entrance instead of the default spring.
// When to use this pattern: short celebratory or informational messages that need no answer from the user (a level
// up, a copied link, a saved draft). Toast options let you restyle one message without building a new component.
import { Button, toast } from "march/ui"
import { star } from "march/icons"

const badges = ["İlk adım", "Hızlı koşucu", "Gece kuşu", "Takım oyuncusu"]

export function Achievements() {
  // $i counts the presses (a signal, so the button label updates); `% badges.length` cycles through the names.
  let $i = 0
  // toast(message, options) shows the message and returns its id. Options used here:
  // - icon: your own icon instead of the kind's icon (a short text or an emoji works too, `false` shows none).
  // - color: a theme colour token for the icon.
  // - closable: false removes the close (x) button. Without it the toast still goes away on its own, because it has
  //   a default timeout (4 seconds); a toast with `timeout: 0` and no close button would need to be dismissed in code.
  // - motion: "fade" is the entrance (the default is "spring"; "none" shows it without motion). The motion engine
  //   already honours reduced motion and the global speed settings, so you do not need to handle them yourself.
  // Screen readers hear the message once: the toast stack is a polite live region.
  return <Button variant="primary" on:click={() => { toast(`Başarım: ${badges[$i % badges.length]}`, { icon: star, color: "brand-purple", closable: false, motion: "fade" }); $i++ }}>
    Başarım kazan ({$i})
  </Button>
}
