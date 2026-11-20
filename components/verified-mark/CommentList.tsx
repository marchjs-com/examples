import { VerifiedMark, Avatar } from "march/ui"

// yorumlar: onaylı hesapların adının yanında rozet
const comments = [{ name: "Fotoğraf Atölyesi", ok: true, text: "Işık harika" }, { name: "Can", ok: false, text: "Katılıyorum" }]

export function CommentList() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {comments.map((c) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Avatar name={c.name} size="sm" />
      <span><strong>{c.name}</strong> {c.ok ? <VerifiedMark size="sm" /> : null}: {c.text}</span>
    </div>)}
  </div>
}
