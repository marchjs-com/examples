import { FollowButton } from "march/ui"

// FollowButton'ın özellikleri: state, onChange, private, name, size, block, labels, ariaLabel, icon (işlev ya da false),
// burst, morph, class
export function FollowButtonLab() {
  let $state = "follow"
  return <div sx={{ flex: "col", gap: 2 }}>
    <FollowButton class="lab-follow" state={$state as "follow"} onChange={(s: string) => $state = s} name="Elif" size="md" block
      ariaLabel={(st: string, n: string | undefined) => `${n}: ${st}`} burst={false} morph={false} />
    <FollowButton class="lab-private" state="follow" onChange={() => {}} private icon={false} labels={{ follow: "İstek gönder" }} />
    <span class="lab-state">{$state}</span>
  </div>
}
