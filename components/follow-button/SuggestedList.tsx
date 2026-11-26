// SuggestedList: the real-life FollowButton example.
//
// What it shows: a list of suggested accounts, each with its own FollowButton. One account is private, so following it sends
// a request ("requested") instead of following at once. A counter at the bottom shows how many accounts are not in the
// "follow" state.
// When to use this pattern: any list where each row has an independent follow state. Keep one object keyed by name and
// give each button its own entry.
// Motion: the morph and the burst run on the motion engine (reduced motion and "Stop all" apply).
import { FollowButton, Avatar } from "march/ui"

// The suggested accounts; `private` marks the one that needs a request.
const people = [{ name: "Fotoğraf Atölyesi", private: false }, { name: "Kitap Kulübü", private: true }, { name: "Masa Oyunları", private: false }]

export function SuggestedList() {
  // One state per account name; a missing key means "follow" (not followed yet).
  let $states: Record<string, string> = {}
  // Counts accounts whose state is anything but "follow" (so "following" and "requested" both count).
  const count = () => Object.values($states).filter((s) => s !== "follow").length
  return <div sx={{ flex: "col", gap: 2 }}>
    {people.map((p) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Avatar name={p.name} size="sm" /><span sx={{ flex: "grow" }}>{p.name}</span>
      {/* - size="sm": the compact size that fits a list row. name: makes the accessible name specific to the account.
          - private: following this account sends a request.
          - state / onChange: read this account's state (default "follow") and write it back into the object. */}
      <FollowButton size="sm" name={p.name} private={p.private} state={($states[p.name] ?? "follow") as "follow"}
        onChange={(s: string) => $states = { ...$states, [p.name]: s }} />
    </div>)}
    <span sx={{ text: "sm", color: "muted" }}>{count()} hesap</span>
  </div>
}
