// ChatPopup: the creative-minimal Window example.
//
// What it shows: a small support-chat window floating inside its area. The visitor can drag it and resize it; when
// they close it, an "open chat" button appears in its place and brings it back.
// When to use this pattern: help popups, previews, tool palettes, anything that should float over a page area and be
// dismissible but not lost. Window is positioned inside its nearest positioned ancestor, so the wrapper below needs
// `position: relative` and a height.
//
// Animation: moving and resizing follow the Window's own motion rules (reduced motion turns the transitions off);
// pass `animated={false}` to make place and size changes instant.
// Keyboard: the title bar is focusable; arrow keys move the window, Shift + arrows resize it, Escape restores it.
import { Window, Button } from "march/ui"
import { messageCircle } from "march/icons/lucide"

export function ChatPopup() {
  // Whether the window is shown. A signal: Window's `open` reads it, and the button below sets it back to true.
  let $open = true
  // The wrapper is the window's area: position: relative makes it the reference box, and block-size gives it room.
  return <div style={{ position: "relative", "block-size": "20rem" }}>
    {/* - title / icon: the title text (the window is named by it for screen readers) and an icon node.
        - color="brand-blue": colour token for the accent of the frame (the title icon and the button hover).
        - x, y, width, height: the starting place and size in px (the window can be moved and resized afterwards).
        - minimizable={false}: no fold-to-title-bar button; the maximize and close buttons stay.
        - open + onClose: the window is shown while $open is true; the close button calls onClose, here setting it to
          false. Without `open`, the close button would only hide the window by itself. */}
    <Window title="Destek" icon={messageCircle} color="brand-blue" x={20} y={20} width={280} height={200} minimizable={false}
      open={$open} onClose={() => $open = false}>
      <div sx={{ p: 3, flex: "col", gap: 2 }}><p>Merhaba! Size nasıl yardım edebilirim?</p></div>
    </Window>
    {/* A live region: it shows the "reopen" button only while the window is closed. */}
    {() => ($open ? null : <Button size="sm" on:click={() => $open = true}>Sohbeti aç</Button>)}
  </div>
}
