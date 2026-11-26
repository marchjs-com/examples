// HeroCard: the creative-minimal JsonEditor example.
//
// What it shows: a game character. Edit the JSON in the tree, and the card above updates live: name, class, level and a
// health bar.
// When to use this pattern: structured data that something else displays. `bind:value` holds the parsed value, so you can
// derive anything from it; while the text view has invalid JSON the value is the raw string, so read it defensively.
// Accessibility: the views are a tablist (arrow keys switch); the health bar is a meter with a name and a range.
import { JsonEditor, Card, Badge } from "march/ui"

// The shape we expect; every field is optional because the user can edit anything.
type Hero = { name?: string; class?: string; level?: number; hp?: number }

export function HeroCard() {
  // The edited value. It is unknown on purpose: it may be anything the user typed.
  let $hero: unknown = { name: "Ayla", class: "Okçu", level: 7, hp: 64 }
  // Derived: the value as a Hero, or an empty object when it is not an object (for example while the text is invalid).
  const $h = ($hero && typeof $hero === "object" ? $hero : {}) as Hero
  // Derived: the health clamped to 0..100, so a bad number cannot break the bar.
  const $hp = Math.max(0, Math.min(100, Number($h.hp) || 0))
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The character card on a dark surface; it reads the derived values, so it follows the editor. */}
    <Card m:theme="night">
      <div sx={{ flex: ["row", "center", "between"] }}>
        <span sx={{ text: "lg", color: "brand-gold" }}>{`${$h.name ?? "?"} · ${$h.class ?? "?"}`}</span>
        <Badge tone="info">{`Seviye ${$h.level ?? 0}`}</Badge>
      </div>
      {/* The health bar: role="meter" with a name and a range for screen readers; the colour turns red when health is low. */}
      <div role="meter" aria-label="Can" aria-valuenow={$hp} aria-valuemin={0} aria-valuemax={100}
        style={{ height: ".5rem", "margin-top": ".5rem", "border-radius": "1rem", width: `${$hp}%`, background: $hp > 30 ? "var(--m-success)" : "var(--m-danger)" }} />
    </Card>
    {/* - bind:value: two-way link to $hero. mode="tree": start in the tree view; modes: the views offered (tree and text).
        - expand={1}: one level of the tree is open at the start. rows={6}: the height of the text view in rows.
        - aria-label: the accessible name of the editor. */}
    <JsonEditor bind:value={$hero} mode="tree" modes={["tree", "text"]} expand={1} rows={6} aria-label="Karakter" />
  </div>
}
