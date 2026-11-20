import { Textarea, Card, Badge } from "march/ui"

// haiku defteri: üç dize yaz; alan dizelerle büyür, rozet kaç dize yazıldığını sayar, üçte yeşile döner
export function HaikuPad() {
  let $poem = "Sessiz bir gölde\nkurbağa suya atlar"
  const $lines = $poem.split("\n").filter((l) => l.trim()).length
  return <Card m:theme="night" title="Haiku defteri" actions={<Badge tone={$lines === 3 ? "success" : "warn"}>{$lines} / 3 dize</Badge>}>
    <Textarea bind:value={$poem} rows={3} aria-label="Haiku" placeholder="Beş, yedi, beş hece…" spellcheck={false} />
    <span sx={{ text: "sm", color: $lines === 3 ? "brand-green" : "muted" }}>
      {$lines === 3 ? "Tamam: bir haiku oldu." : $lines > 3 ? "Fazla dize var, sadeleştir." : "Bir dize daha…"}
    </span>
  </Card>
}
