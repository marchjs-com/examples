import { Newsletter } from "march/landing"
import { Card } from "march/ui"

// gizli kulüp: e-postanı bırakınca üye sayısı artar, onayda tik yerine bir anahtar emojisi belirir
const Key = () => <span aria-hidden="true">🗝️</span>

export function SecretClub() {
  let $members = 41
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ color: "muted", text: "sm" }}>{$members} üye</span>
      <Newsletter layout="stacked" title="Gizli kulüp" lead="Şifreyi yalnız e-postayla söylüyoruz."
        button="Kapıyı çal" done="İçeridesin. Şifre gelen kutunda." doneIcon={<Key /> as Node}
        onSubmit={() => { $members++ }} />
    </div>
  </Card>
}
