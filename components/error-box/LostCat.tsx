// LostCat: the creative-minimal ErrorBox example.
//
// What it shows: a lost cat. Each press of the retry button looks in another place (the message changes); the third
// time the cat is found and the ErrorBox gives way to a happy line.
// When to use this pattern: a retry that actually changes something. Use `message` for a friendly text that is not an
// Error object, and `retryLabel` to say what the button does.
// Accessibility: ErrorBox has role="alert", so a screen reader announces the new message when it appears.
import { ErrorBox, Card } from "march/ui"

// One message per attempt.
const PLACES = ["Koltuğun altında yok.", "Dolabın içinde de yok.", "Balkonda da yok."]

// $tries counts the attempts.
export function LostCat() {
  let $tries = 0
  return <Card title="Pamuk nerede?">
    {/* A function child: the ErrorBox while the cat is lost, a happy line when it is found. title is the bold first
            line; message is the text (used because there is no `error`); retry runs on each press; retryLabel is the
            button's own text. */}
    {() => $tries >= 3
      ? <p sx={{ text: "lg" }}>🐈 Pamuk kutunun içinde uyuyormuş!</p>
      : <ErrorBox title="Kedi bulunamadı" message={PLACES[$tries]} retry={() => $tries++} retryLabel="Başka yere bak" />}
  </Card>
}
