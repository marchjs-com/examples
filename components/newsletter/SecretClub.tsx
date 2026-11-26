// SecretClub: the creative-minimal Newsletter example.
//
// A secret club sign-up on a dark card: leave your email and the member counter goes up, and a key emoji replaces the
// usual check mark in the thank-you line. It is the smallest useful Newsletter (no placeholder, no note) plus two
// touches: your own success mark and a synchronous onSubmit. Use it for playful sign-ups.
import { Newsletter } from "march/landing"
import { Card } from "march/ui"

// A tiny component used as the success mark. aria-hidden keeps screen readers from reading the emoji; the thank-you
// text next to it carries the meaning.
const Key = () => <span aria-hidden="true">🗝️</span>

export function SecretClub() {
  // Reactive member count, shown above the form.
  let $members = 41
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ color: "muted", text: "sm" }}>{$members} üye</span>
      {/* layout="stacked": field above the button. doneIcon takes a node, so your own mark replaces the check mark;
          `as Node` only tells TypeScript that the JSX is a DOM node. onSubmit may return nothing: the form then
          counts as succeeded at once and the thank-you line (`done`) is shown. The pop of the line follows the motion
          engine: reduced motion, global speed and "Stop all" (the `motion` prop can also turn it off). */}
      <Newsletter layout="stacked" title="Gizli kulüp" lead="Şifreyi yalnız e-postayla söylüyoruz."
        button="Kapıyı çal" done="İçeridesin. Şifre gelen kutunda." doneIcon={<Key /> as Node}
        onSubmit={() => { $members++ }} />
    </div>
  </Card>
}
