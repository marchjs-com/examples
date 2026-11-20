import { TextInput, Card } from "march/ui"

// kullanıcı adı seç: yazarken küçük harfe ve boşluksuza dönüşür, "@" ön ekiyle; profil adresi canlı belirir
export function HandlePicker() {
  let $handle = "deniz.yildiz"
  const $short = $handle.length < 3
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <TextInput bind:value={$handle} prefix="@" aria-label="Kullanıcı adı" maxLength={20}
        transform={(v: string) => v.toLocaleLowerCase("tr").replace(/\s+/g, "")}
        error={$short ? "En az 3 harf" : ""} errorSpace />
      <span sx={{ text: "sm", color: $short ? "danger" : "brand-green" }}>hadisosyal.com/@{$handle}</span>
    </div>
  </Card>
}
