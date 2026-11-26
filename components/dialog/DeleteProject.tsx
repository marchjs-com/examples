// DeleteProject: the real-life Dialog example.
//
// What it shows: deleting a project. First a confirmation (a dangerous action), and renaming asks for the new name in a
// prompt. confirm() and prompt() are ready-made dialogs you await: they return a promise, so the flow reads top to
// bottom without any open / close state.
// When to use this pattern: yes / no questions and one-value questions. For custom content use <Dialog> itself.
// Accessibility: a confirm dialog has the alertdialog role; focus is trapped inside and returns to the button.
import { Button, confirm, prompt, toast } from "march/ui"

export function DeleteProject() {
  let $name = "Vitrin"
  let $gone = false
  // confirm({ title, message, danger, ok }) resolves to true when the user presses the OK button and to false when it is
  // cancelled. danger styles the OK button as a dangerous action; ok names it.
  const remove = async () => { if (await confirm({ title: `${$name} silinsin mi?`, message: "Bu işlem geri alınamaz.", danger: true, ok: "Sil" })) { $gone = true; toast("Proje silindi") } }
  // prompt({ title, value, validate, ok }) resolves to the typed text, or null when cancelled. validate returns an error
  // text to show, or null when the value is fine.
  const rename = async () => { const n = await prompt({ title: "Yeni ad", value: $name, validate: (v: string) => (v.trim() ? null : "Ad gerekli"), ok: "Kaydet" }); if (n) $name = n }
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <strong>{$gone ? "Silindi" : $name}</strong>
    <Button size="sm" on:click={rename} disabled={$gone}>Yeniden adlandır</Button>
    <Button size="sm" variant="danger" on:click={remove} disabled={$gone}>Sil</Button>
  </div>
}
