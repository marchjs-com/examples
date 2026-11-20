import { GradientEditor, Card, Avatar, Button, toast } from "march/ui"

// profil kapağı: kapağın gradyanını düzenle, profil kartında hemen gör, kaydet
export function ProfileCover() {
  let $cover = "linear-gradient(120deg, #1d9ad6 0%, #78be3a 100%)"
  let $editing = false
  return <Card>
    <div sx={{ flex: "col", gap: 2 }}>
      <div style={{ background: $cover, height: "5rem", borderRadius: "0.75rem" }} />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <Avatar name="Elif Arslan" />
        <b>Elif Arslan</b>
        <Button size="sm" variant="ghost" on:click={() => $editing = !$editing}>{$editing ? "Kapat" : "Kapağı düzenle"}</Button>
      </div>
      {$editing && <div sx={{ flex: "col", gap: 2 }}>
        <GradientEditor bind:value={$cover} preview={false} hint={false} aria-label="Kapak gradyanı" />
        <Button on:click={() => { $editing = false; toast("Kapak kaydedildi") }}>Kaydet</Button>
      </div>}
    </div>
  </Card>
}
