// VerifiedMarkLab: the full-featured VerifiedMark example; it uses every prop at least once.
//
// Props shown here: label (a text, or false to make the badge decorative), icon (an icon or a text), size, class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// VerifiedMarkLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { VerifiedMark } from "march/ui"
import { shieldCheck } from "march/icons"

export function VerifiedMarkLab() {
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    {/* No props: the default badge with a tick and the accessible name "Verified" (translated). */}
    <VerifiedMark class="lab-default" />
    {/* label: your own accessible name. icon: your own mark (an icon here). size="lg": the large size. class goes on
        the mark so CSS or a test can find this instance. */}
    <VerifiedMark class="lab-own" label="Onaylı işletme" icon={shieldCheck} size="lg" />
    {/* icon can also be a short text; size="sm" is the default size. */}
    <VerifiedMark class="lab-text" icon="✔" size="sm" />
    {/* label={false}: the badge is decorative and hidden from screen readers. Use it only when the text beside the
        badge already says the account is verified. */}
    <VerifiedMark class="lab-deco" label={false} />
  </div>
}
