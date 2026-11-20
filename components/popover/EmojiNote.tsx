import { Popover, Button } from "march/ui"

// not için ruh hali: düğmeye basınca emoji paneli açılır, seçince kapanır
const moods = ["😀", "😌", "😴", "🤩", "😤", "🥳"]

export function EmojiNote() {
  let $mood = "😀"
  return <Popover trigger={<Button variant="secondary">Ruh hali: {$mood}</Button>} title="Bugün nasılsın?" placement="bottom-start">
    {(close: () => void) => <div sx={{ flex: "row", gap: 1 }}>
      {moods.map((m) => <Button variant="ghost" on:click={() => { $mood = m; close() }}>{m}</Button>)}
    </div>}
  </Popover>
}
