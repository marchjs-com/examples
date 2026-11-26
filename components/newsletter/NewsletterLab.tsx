// NewsletterLab: the full-featured Newsletter example; it uses every prop at least once.
//
// Newsletter is an email sign-up: inline or stacked, with a sending state, a thank-you line on success and an error
// message on failure. Props shown here: onSubmit (success or error), title, lead, placeholder, button, note, done,
// layout, labels (email, invalid, error), doneIcon (true or your own node), motion and class.
// Four toggles change the options live so you can compare them.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// NewsletterLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Newsletter } from "march/landing"
import { Toggle, Card } from "march/ui"
import { heart, Icon } from "march/icons"

export function NewsletterLab() {
  // Reactive state: one flag per toggle, and a counter of successful sign-ups.
  let $stacked = false
  let $fail = false
  let $motion = false
  let $ownIcon = false
  let $count = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control card: each Toggle is bound (bind:value) to a flag above. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Alt alta" bind:value={$stacked} />
        <Toggle label="Sunucu hatası" bind:value={$fail} />
        <Toggle label="Hareket" bind:value={$motion} />
        <Toggle label="Kalp simgesi" bind:value={$ownIcon} />
      </div>
      <p sx={{ color: "muted" }}>{$count} abone</p>
    </Card>
    {() => {
      // The signals are read here, outside the JSX: when a toggle changes, this function runs again and the form is
      // drawn anew with the new options (a fresh form, so a previous success or error is cleared).
      const stacked = $stacked, fail = $fail, motion = $motion, ownIcon = $ownIcon
      // - class="lab-nl": a class on the root (.m-nl) for CSS or tests.
      // - layout: "inline" puts field and button on one line, "stacked" puts them under each other.
      // - motion: turns the shake on an error and the fold / pop on success on or off. Besides this prop the motion
      //   engine applies: reduced motion, global speed and "Stop all".
      // - title / lead / note: text above, under the title and below the form. placeholder / button: the field's
      //   hint and the button's text. done: the thank-you line shown after success.
      // - doneIcon: true draws the default check mark; a node (here a heart Icon) replaces it.
      // - labels: email = the field's accessible name, invalid = the message for a bad address, error = the fallback
      //   message when onSubmit throws without a message.
      // - onSubmit: runs with the address; throwing shows an error (here when the "server error" toggle is on),
      //   returning normally shows the success line.
      return <Newsletter class="lab-nl" layout={stacked ? "stacked" : "inline"} motion={motion}
        title="Haberdar ol" lead="Ayda bir e-posta." placeholder="adın@ornek.com" button="Kaydol"
        note="İstediğin an ayrılabilirsin." done="Görüşmek üzere!"
        doneIcon={ownIcon ? <Icon of={heart} /> as Node : true}
        labels={{ email: "E-posta adresin", invalid: "Geçerli bir adres yaz.", error: "Bir sorun çıktı." }}
        onSubmit={() => { if (fail) throw new Error(""); $count++ }} />
    }}
  </div>
}
