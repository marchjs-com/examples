// MyStory: the creative-minimal StoryRing example.
//
// What it shows: your own story ring. It has a "+" badge (here a star icon, the badge is yours to choose) that says
// "add a story", and pressing it turns the ring on the motion engine for a moment, as if the story were uploading.
// When to use this pattern: the first ring of a story tray, where the user adds a story, or any ring that needs to show
// work in progress. Set `loading` while something loads and clear it when it is done.
//
// Animation: while `loading` is true the ring turns on March's motion engine, so the global speed, "Stop all" and the
// visitor's reduced-motion preference apply.
// Accessibility: the ring is a button because of onClick; it is named with the person and the state, and gets
// aria-busy while loading. The ring and the badge are decoration.
import { StoryRing, Card } from "march/ui"
import { star } from "march/icons"

export function MyStory() {
  // Reactive state: whether the "upload" is running.
  let $loading = false
  // m:theme="night" draws the card in the dark theme, where the ring colours stand out.
  return <Card m:theme="night">
    {/* name: the accessible name and the initials. add: shows the badge for adding a story. addIcon: our own content
        for the badge (the default is "+"). size="lg": the largest ring (88 px). label: the text under the ring.
        loading: turns the ring. m:color tints the ring with a colour token. onClick starts the fake upload and clears it
        after 1.2 seconds. */}
    <StoryRing name="Siz" add addIcon={star} size="lg" label="Hikâyen" loading={$loading} m:color="brand-purple"
      onClick={() => { $loading = true; setTimeout(() => $loading = false, 1200) }} />
  </Card>
}
