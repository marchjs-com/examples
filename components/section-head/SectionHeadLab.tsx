// SectionHeadLab: the full-featured SectionHead example; it uses every prop at least once.
//
// Props shown here: eyebrow (your own node) and eyebrowHref, title (live), as and titleId, lead, actions (objects with
// icon, iconEnd, variant, onClick, href, and your own node), note, align, size, width, reveal, class and children.
// The controls at the top change the head live. Use it as a reference when you need one specific option: find the prop
// below, copy the line.
// SectionHeadLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SectionHead } from "march/landing"
import { Segmented, Toggle, Badge, Card, Button } from "march/ui"
import { arrowRight, play } from "march/icons"

export function SectionHeadLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. bind:value={$x} on a control
  // writes into the same signal.
  let $size: "sm" | "md" | "lg" | "xl" = "md"
  let $align: "start" | "center" | "end" = "center"
  let $full = false
  let $h1 = false
  let $likes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control panel: Segmented for scale and alignment, Toggle for the two on/off options. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Ölçek" options={["sm", "md", "lg", "xl"]} bind:value={$size} />
        <Segmented aria-label="Hiza" options={[{ value: "start", label: "baş" }, { value: "center", label: "orta" }, { value: "end", label: "son" }]} bind:value={$align} />
        <Toggle label="Tam genişlik" bind:value={$full} />
        <Toggle label="Sayfa başlığı (h1)" bind:value={$h1} />
      </div>
    </Card>
    {() => {
      // The options are read here, inside the function, so changing any control draws the whole head again.
      // $likes is not read here: the title reads it itself.
      const h1 = $h1, size = $size, align = $align, full = $full
      // SectionHead props, one by one:
      // - class="lab-head": lets the tests (or your CSS) find this head.
      // - eyebrow: text (drawn uppercase in the accent colour) or, as here, a node such as a Badge, shown as it is.
      //   eyebrowHref turns the eyebrow into a link.
      // - title: a node or a function; a function stays live, so the like counter in it updates by itself.
      // - as: the heading element of the title (h1 to h6, default h2): choose it by the page outline, one h1 per page.
      //   titleId: the id of the title, for the section's aria-labelledby.
      // - lead: the paragraph under the title.
      // - actions: a list. An object gives a Button: label, href or onClick, variant, icon (before) and iconEnd
      //   (after); the first object is the primary button. A ready-made node, like the Button here, is used as is.
      // - note: small text under the actions. Children (the <small> below) are drawn under the note.
      // - align: start, center or end. size: sm, md, lg or xl (the scale of the title). width: "text" is a readable
      //   measure, "full" the whole row.
      // - reveal: the entrance when the head scrolls into view; effect "up" with a 60 ms stagger makes the parts rise
      //   one after another. It honours reduced motion (the content is then shown at once); reveal={false} (the
      //   default) has no entrance.
      return <SectionHead class="lab-head" eyebrow={<Badge tone="primary">Yeni</Badge>} eyebrowHref="#yenilikler"
        title={() => `Ekibinle birlikte üret (${$likes})`} as={h1 ? "h1" : "h3"} titleId="lab-head-title"
        lead="Planla, yaz, yayınla: hepsi aynı yerde."
        actions={[
          { label: "Beğen", icon: play, onClick: () => $likes++ },
          { label: "Belgeler", href: "#belgeler", iconEnd: arrowRight, variant: "ghost" },
          <Button variant="link" href="#iletisim" class="lab-own-action">Bize yaz</Button> as Node,
        ]}
        note="14 gün ücretsiz · kart gerekmez"
        align={align} size={size} width={full ? "full" : "text"}
        reveal={{ effect: "up", stagger: 60 }}>
        <small class="lab-extra">2.400 ekip kullanıyor</small>
      </SectionHead>
    }}
  </div>
}
