// AdvancedSettings: the real-life Disclosure example.
//
// What it shows: advanced settings under a form. They start closed; while closed, the title carries a summary of the
// current choices, and when opened it shows the plain heading and the fields.
// When to use this pattern: rarely needed options that should not crowd a form, but whose current values people want to
// see at a glance.
// Accessibility: a native <details> / <summary>: Enter and Space toggle, and the browser announces the state.
import { Disclosure, Field, Toggle, NumberInput } from "march/ui"

// $open is the open state, controlled from outside; $cache and $days are the settings the summary reads.
export function AdvancedSettings() {
  let $open = false
  let $cache = true
  let $days = 30
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* open + onToggle make the state ours (we need it to choose the title). The title is an expression of
            $open, $cache and $days, so the summary is recomputed as the settings change. */}
    <Disclosure open={$open} onToggle={(o: boolean) => $open = o}
      title={$open ? "Gelişmiş ayarlar" : `Gelişmiş ayarlar · önbellek ${$cache ? "açık" : "kapalı"}, ${$days} gün`}>
      <div sx={{ flex: "col", gap: 2 }}>
        <Toggle label="Önbellek" bind:value={$cache} />
        <Field label="Kayıt saklama (gün)"><NumberInput value={$days} min={1} max={365} onChange={(v: number) => $days = v} /></Field>
      </div>
    </Disclosure>
  </div>
}
