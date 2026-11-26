// AccountBar: the real-life ThemeMenu example.
//
// What it shows: the top bar of an app with a slim appearance menu on the right: light / dark / system, the colour theme and
// three accent colours. What the user picks is applied to the whole page and remembered (the menu stores the choices).
// When to use this pattern: an app-wide look setting in a toolbar. With no `value` the menu changes the page's theme; the
// pieces it shows are the same ones ThemePicker and AccentPicker show on their own, so a menu and separate pickers always
// match. `size="sm"` makes the button slim for a toolbar.
//
// Animation: none of its own to switch off; the panel opens like any Dropdown.
// Accessibility: the button opens a Dropdown panel (Escape closes it and focus returns to the button). Light / dark / system
// is a labelled group of toggle buttons (aria-pressed); themes and accents are labelled radiogroups of role="radio" buttons
// (aria-checked); swatches are decoration. `m:no-select` on the Toolbar marks it as interface chrome (its text cannot be
// selected), which is right for a bar of controls but not for content people may copy.
import { ThemeMenu, Toolbar, Avatar, Divider } from "march/ui"

export function AccountBar() {
  // Toolbar: a named group of controls. flex: "grow" on an empty div is a spacer that pushes the rest to the end.
  return <Toolbar label="Hesap" m:no-select>
    <span sx={{ text: "bold" }}>Panelim</span>
    <div sx={{ flex: "grow" }} />
    {/* label: the button's text. size="sm": a slim button for the toolbar. accents: the choices of the accent section (here
        three colour tokens). labels: our own headings for the theme and accent sections. */}
    <ThemeMenu label="Görünüm" size="sm" accents={["primary", "brand-orange", "brand-blue"]} labels={{ theme: "Tema", accent: "Vurgu" }} />
    <Divider vertical />
    <Avatar name="Ada Yılmaz" size="sm" />
  </Toolbar>
}
