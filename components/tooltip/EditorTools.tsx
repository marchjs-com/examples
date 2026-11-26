// EditorTools: the real-life Tooltip example.
//
// What it shows: the formatting buttons of a text editor. Each icon button has a tooltip with a longer description
// and its keyboard shortcut.
// When to use this pattern: icon-only buttons and any control whose shortcut or extra detail does not fit in its
// label. IconButton already takes its accessible name from `label` (and shows it as a native title by default), so
// here `title={false}` turns that off to avoid two hints; Tooltip then provides the visible one, linked to the button
// with aria-describedby.
import { Tooltip, IconButton } from "march/ui"
import { bold, italic, link } from "march/icons"

export function EditorTools() {
  // Tooltip wraps one element and shows `text` when the pointer rests on it (after a short delay) or when it gets
  // keyboard focus (at once); it hides on leave, blur or Esc. placement="bottom" is the preferred side; if there is no
  // room the popover engine flips it. motion="fade" on the last one is the entrance effect (the default is "scale";
  // "none" shows it without motion; reduced motion is honoured by the motion engine).
  return <div sx={{ flex: "row", gap: 1 }}>
    <Tooltip text="Kalın (Ctrl + B)" placement="bottom"><IconButton icon={bold} label="Kalın" title={false} /></Tooltip>
    <Tooltip text="İtalik (Ctrl + I)" placement="bottom"><IconButton icon={italic} label="İtalik" title={false} /></Tooltip>
    <Tooltip text="Bağlantı ekle (Ctrl + K)" placement="bottom" motion="fade"><IconButton icon={link} label="Bağlantı" title={false} /></Tooltip>
  </div>
}
