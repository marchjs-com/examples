import { Select, Button, Card } from "march/ui"
import { plus } from "march/icons"

// Select'in bütün özellikleri: bind:value ve onChange, türünü koruyan değerler (sayı, nesne), kapalı şık, canlı şık
// listesi, virgüllü metin şıklar, boş ilk şık (placeholder) ya da hiç (false), zorunlu, geçersiz, devre dışı,
// salt okunur, id / name / class, aria-label, describedby, odak olayları, koyu zemin
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>
const plans = [
  { value: { id: "free", seats: 1 }, label: "Ücretsiz · 1 kişi" },
  { value: { id: "team", seats: 10 }, label: "Takım · 10 kişi" },
  { value: { id: "corp", seats: 500 }, label: "Kurumsal · 500 kişi (satışla görüşün)", disabled: true },
]

export function SelectLab() {
  let $n = 3
  let $edits = 0
  let $plan = plans[0]!.value
  let $sizes = ["S", "M", "L", "XL"]
  let $size = "M"
  let $drink = "Çay"
  let $team = ""
  let $focused = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Sayılar sayı kalır; onChange">
      <Select bind:value={$n} options={[1, 2, 3, 5, 8, 13]} placeholder="Sayı seç" aria-label="Fibonacci" onChange={() => $edits++} />
      <span sx={{ text: "sm" }}>Seçili: {$n} ({typeof $n}) · değişiklik: {$edits}</span>
    </Row>
    <Row title="Nesne şıklar ve kapalı şık">
      <Select bind:value={$plan} options={plans} placeholder={false} aria-label="Plan" />
      <span sx={{ text: "sm" }}>Plan: {$plan?.id} · {$plan?.seats} koltuk</span>
    </Row>
    <Row title="Canlı şık listesi">
      <Select bind:value={$size} options={() => $sizes} placeholder={false} aria-label="Beden" />
      <Button size="sm" variant="ghost" icon={plus} disabled={$sizes.includes("XXL")} on:click={() => $sizes = [...$sizes, "XXL"]}>Beden ekle</Button>
    </Row>
    <Row title="Virgüllü metin şıklar">
      <Select bind:value={$drink} options="Çay, Kahve, Ayran, Limonata" placeholder={false} aria-label="İçecek" />
      <span sx={{ text: "sm" }}>İçecek: {$drink}</span>
    </Row>
    <Row title="Form: zorunlu, geçersiz, odak, kimlik">
      <Select bind:value={$team} options={["Tasarım", "Mobil", "Altyapı"]} placeholder="Takım seç…" id="lab-team" name="team" class="lab-team"
        required invalid={!$team} describedby="lab-team-hint" onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-team-hint" sx={{ text: "sm", color: "muted" }}>{$team ? `Takım: ${$team}` : "Bir takım seçmelisin"} · {$focused ? "açık" : "odak dışında"}</span>
    </Row>
    <Row title="Devre dışı ve salt okunur">
      <Select value="Ankara" options={["İstanbul", "Ankara"]} disabled aria-label="Kilitli şehir" />
      <Select value="TRY" options={["TRY", "EUR", "USD"]} readonly aria-label="Para birimi" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Select value="Gece" options="Gündüz, Gece, Sistem" placeholder={false} aria-label="Tema" />
      </Row>
    </Card>
  </div>
}
