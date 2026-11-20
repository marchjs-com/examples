import { Disclosure, Field, Toggle, NumberInput } from "march/ui"

// form altında gelişmiş ayarlar: kapalı başlar; açıkken ayarların özeti başlıkta görünür
export function AdvancedSettings() {
  let $open = false
  let $cache = true
  let $days = 30
  return <div sx={{ flex: "col", gap: 3 }}>
    <Disclosure open={$open} onToggle={(o: boolean) => $open = o}
      title={$open ? "Gelişmiş ayarlar" : `Gelişmiş ayarlar · önbellek ${$cache ? "açık" : "kapalı"}, ${$days} gün`}>
      <div sx={{ flex: "col", gap: 2 }}>
        <Toggle label="Önbellek" bind:value={$cache} />
        <Field label="Kayıt saklama (gün)"><NumberInput value={$days} min={1} max={365} onChange={(v: number) => $days = v} /></Field>
      </div>
    </Disclosure>
  </div>
}
