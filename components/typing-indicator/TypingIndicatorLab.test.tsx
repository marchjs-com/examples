// Tests for TypingIndicatorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TypingIndicatorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.sees(text) asks if a text is visible; s.all(selector) returns every element that matches a selector.
// - The tests check what a user or a screen reader can observe (the sentence, the status role) rather than the dots'
//   animation, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the text or the selector.
import { test, expect, renderTest } from "march/testing"
import { TypingIndicatorLab } from "./TypingIndicatorLab.tsx"

// The `label` prop replaces the built-in sentence: the visible text is the one the Lab builds from the names.
test("label kendi cümlesini yazar", () => {
  const s = renderTest(() => <TypingIndicatorLab />)
  expect(s.sees("Elif ve Can karalıyor")).toBe(true)
})

// The indicator is a polite status region (role="status"), which is what makes a screen reader announce it.
test("bir durum bölgesi (role=status)", () => {
  const s = renderTest(() => <TypingIndicatorLab />)
  expect(s.all("[role=status]").length).toBeGreaterThan(0)
})
