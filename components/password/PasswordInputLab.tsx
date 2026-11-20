import { PasswordInput, Card } from "march/ui"

// PasswordInput'un bütün özellikleri: bind:value ve onChange, düğmenin dört biçimi (göz, metin, kendi çizimin, hiç),
// kendi metinlerin (labels), onToggle, yer tutucu, otomatik doldurma, en az / en çok uzunluk, zorunlu, geçersiz,
// devre dışı, salt okunur, id / name / class, aria-label (ve ariaLabel), describedby, odak olayları, koyu zemin
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function PasswordInputLab() {
  let $pw = "march-2026"
  let $changes = 0
  let $shown = false
  let $fresh = ""
  let $focused = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Göz ikonu (varsayılan), bind:value, onChange">
      <PasswordInput bind:value={$pw} aria-label="Parola" onChange={() => $changes++} />
      <span sx={{ text: "sm" }}>Uzunluk: {$pw.length} · değişiklik: {$changes}</span>
    </Row>
    <Row title="Metin düğmesi, kendi metinlerin, onToggle">
      <PasswordInput value="kahve-molasi-42" toggle="text" aria-label="Wi-Fi şifresi" onToggle={(s: boolean) => $shown = s}
        labels={{ show: "Göster", hide: "Gizle", showPassword: "Wi-Fi şifresini göster", hidePassword: "Wi-Fi şifresini gizle" }} />
      <span sx={{ text: "sm" }}>Wi-Fi şifresi {$shown ? "görünüyor" : "gizli"}</span>
    </Row>
    <Row title="Kendi çizimin ve düğmesiz">
      <PasswordInput bind:value={$pw} ariaLabel="Parola (maymun)" toggle={(shown: boolean) => (shown ? "🙈" : "🐵")} />
      <PasswordInput value="gizli-kalir" toggle={false} aria-label="Düğmesiz parola" />
    </Row>
    <Row title="Form: zorunlu, geçersiz, uzunluk, otomatik doldurma, odak">
      <PasswordInput bind:value={$fresh} aria-label="Yeni parola" id="lab-new-password" name="new-password" class="lab-password" required
        invalid={$fresh.length > 0 && $fresh.length < 8} placeholder="En az 8 karakter" autocomplete="new-password"
        minLength={8} maxLength={32} describedby="lab-password-hint" onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-password-hint" sx={{ text: "sm", color: "muted" }}>{$focused ? "Yazıyorsun" : "Odak dışında"} · {$fresh.length} / 32</span>
    </Row>
    <Row title="Devre dışı ve salt okunur">
      <PasswordInput value="eski-parola" disabled aria-label="Kilitli parola" />
      <PasswordInput value="yalniz-okunur" readonly aria-label="Salt okunur parola" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <PasswordInput value="gece-yarisi" aria-label="Gece parolası" />
      </Row>
    </Card>
  </div>
}
