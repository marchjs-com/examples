// Tests for StoryViewerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StoryViewerLab startOpen={false} />) mounts the component in a fresh, isolated root and returns a
//   handle `s`. The Lab normally starts open; the tests start it closed so each one opens it as a user would.
// - s.click(text) finds an element by its text or accessible name and clicks like a user, then waits until the view has
//   updated (so a test that clicks is async and awaits it). s.sees(text) says whether the page shows a text (the dialog is
//   portaled to the body, which s.sees looks at). s.wait(() => condition) waits until the condition is true, which is how
//   we deal with things that happen a moment later, such as a story being marked as seen.
// - The tests check what a user can see or press, through the Lab's own `labels` texts, rather than internal state.
// To adapt them: copy one test, change the button or the expected text.
import { test, expect, renderTest } from "march/testing"
import { StoryViewerLab } from "./StoryViewerLab.tsx"

// The first button opens the viewer at the first person: their first story's caption is shown, and `onSeen` records its id, which the
// Lab prints as text. We wait for that text because the "seen" event comes a moment after the dialog opens.
test("Baştan aç ilk kişinin ilk hikâyesini gösterir ve görüldü olarak işaretler", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Baştan aç")
  expect(s.sees("Tepede gün batımı")).toBe(true)
  await s.wait(() => s.sees("görülen: e1"))
  expect(s.sees("görülen: e1")).toBe(true)
})

// `start` may be a person's id as well as an index: opening at "u2" shows the second person's story.
test("start bir id de olabilir: Can'dan açar", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Can'dan aç")
  expect(s.sees("Gece turu")).toBe(true)
})

// The heart button has our own text (labels.like). Pressing it calls onLike, and the Lab writes a "liked" note in a badge.
test("kendi metinli kalp onLike'ı çalıştırır", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Baştan aç")
  await s.click("Hikâyeyi beğen")
  expect(s.sees("beğenildi")).toBe(true)
})

// The close button has our own text (labels.close). Pressing it calls onClose, which writes a "closed" note in the badge.
test("kapat düğmesi onClose'u çalıştırır", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Baştan aç")
  await s.click("Hikâyeyi kapat")
  await s.wait(() => s.sees("kapandı"))
  expect(s.sees("kapandı")).toBe(true)
})
