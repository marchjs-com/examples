// CommentList: the real-life VerifiedMark example.
//
// What it shows: two comments under a photo. The author of the first is a verified account, so a badge follows the
// name; the second author gets none.
// When to use this pattern: any place that shows a user's name (comments, user rows, post headers). Render the mark only
// when your data says the account is verified, as the `c.ok ? <VerifiedMark /> : null` expression does here.
import { VerifiedMark, Avatar } from "march/ui"

const comments = [{ name: "Fotoğraf Atölyesi", ok: true, text: "Işık harika" }, { name: "Can", ok: false, text: "Katılıyorum" }]

export function CommentList() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {comments.map((c) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Avatar name={c.name} size="sm" />
      {/* size="sm" is the default size and fits body text (use "md" beside a heading). The mark is an image with the
          accessible name "Verified" (translated), so a screen reader reads the name followed by the badge. The
          badge has no animation. */}
      <span><strong>{c.name}</strong> {c.ok ? <VerifiedMark size="sm" /> : null}: {c.text}</span>
    </div>)}
  </div>
}
