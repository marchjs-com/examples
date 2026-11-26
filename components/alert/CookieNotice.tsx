// CookieNotice: the real-life Alert example.
//
// A site's cookie notice: a floating (raised) alert with the actions below the text. Choosing either action, or just
// dismissing the alert, records a choice and the notice is replaced by a short confirmation, so it never reappears.
// Use this pattern for consent banners and any message that asks the user to decide something once.
import { Alert, Button, toast } from "march/ui"
import { shield } from "march/icons"

export function CookieNotice() {
  // "" = not decided yet, "all" or "needed" = the user's choice. One reactive value drives the whole view.
  let $choice = ""
  // Every path records the choice and confirms it with a toast (a short, polite status message).
  const pick = (c: string) => { $choice = c; toast(c === "all" ? "Tüm çerezler kabul edildi" : "Yalnız gerekli çerezler") }
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The function child switches between the confirmation text and the alert as $choice changes.
        On the alert: variant="raised" is the floating look; tone="neutral" keeps it calm (a consent notice is not an
        error); actionPlacement="below" puts the buttons under the text; dismissable + dismissLabel add a close
        button with an accessible name, and closing it counts as the privacy-friendly choice ("needed").
        `action` takes an array of nodes, so two buttons sit side by side: the primary one accepts everything, the
        ghost one is the lower-emphasis alternative. */}
    {() => $choice ? <span sx={{ color: "muted" }}>Seçiminiz kaydedildi: {$choice === "all" ? "tümü" : "gerekli olanlar"}</span>
      : <Alert variant="raised" tone="neutral" icon={shield} title="Çerezler" actionPlacement="below"
          dismissable dismissLabel="Bildirimi kapat" onDismiss={() => pick("needed")}
          action={[<Button size="sm" variant="primary" on:click={() => pick("all")}>Tümünü kabul et</Button>,
            <Button size="sm" variant="ghost" on:click={() => pick("needed")}>Yalnız gerekli</Button>]}>
          Deneyiminizi iyileştirmek için çerez kullanıyoruz.
        </Alert>}
  </div>
}
