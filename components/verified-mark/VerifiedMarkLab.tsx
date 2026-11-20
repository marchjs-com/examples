import { VerifiedMark } from "march/ui"
import { shieldCheck } from "march/icons"

// VerifiedMark'ın özellikleri: label (metin ya da false: süs), icon (ikon ya da metin), size, class
export function VerifiedMarkLab() {
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <VerifiedMark class="lab-default" />
    <VerifiedMark class="lab-own" label="Onaylı işletme" icon={shieldCheck} size="lg" />
    <VerifiedMark class="lab-text" icon="✔" size="sm" />
    <VerifiedMark class="lab-deco" label={false} />
  </div>
}
