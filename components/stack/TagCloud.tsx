import { Stack, Chip } from "march/ui"

// etiket bulutu: satır, sarmalı; seçilen etiketler sayılır
const tags = ["sinyal", "TSX", "derleyici", "erişilebilirlik", "tema", "hareket", "test", "i18n"]

export function TagCloud() {
  let $picked: string[] = []
  const toggle = (t: string) => $picked = $picked.includes(t) ? $picked.filter((x) => x !== t) : [...$picked, t]
  return <Stack gap={4}>
    <Stack direction="row" gap={2} wrap>
      {tags.map((t) => <Chip selected={$picked.includes(t)} onClick={() => toggle(t)}>{t}</Chip>)}
    </Stack>
    <span sx={{ text: "sm", color: "muted" }}>{$picked.length} etiket seçildi</span>
  </Stack>
}
