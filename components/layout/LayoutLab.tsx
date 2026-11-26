// LayoutLab: the full-featured Layout example; it uses the regions and options.
//
// Props shown here: top, header, nav, aside, footer (the regions), corners, features, titleTemplate, framed, mainId,
// labels, skipLink, asideToggle, class and the content (children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LayoutLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Layout, Badge, useLayout } from "march/ui"

// A box that gives each demo region a visible surface; it is not part of Layout.
const Box = (props: { children?: unknown }) => <div class="sc-ld-box">{props.children}</div>
// Components inside a Layout reach it with useLayout(). This one writes the layout's title template, which proves the
// layout is found from inside.
const Template = () => <span class="lab-template">Başlık kalıbı: {useLayout()?.titleTemplate}</span>

export function LayoutLab() {
  // The props, one by one:
  // - class: added to the frame (.m-layout), so tests and your CSS can find it.
  // - features={[]}: a list replaces the default features (scroll-to-top, focus after route changes): none here.
  // - framed: always draw the frame (skip link, main), even without regions.
  // - mainId: the id of the main element, which is the target of the skip link.
  // - labels={{ skip }}: the text of the skip link; the frame's other texts keep their translated defaults.
  // - corners: content for the page corners (top-start, top-end, bottom-start, bottom-end; one node or a list).
  // - titleTemplate: the pattern of the document title for the pages inside (Page titles); %s is the page's title.
  // - skipLink: the keyboard "skip to content" link (false removes it).
  // - asideToggle={false}: no corner button that opens the side panel on narrow screens; you would then open it yourself
  //   by giving the aside the data-open attribute.
  // - top, header, nav, aside, footer: the regions around the content; any region turns the frame on.
  return <Layout class="lab-layout" features={[]} framed mainId="lab-main" labels={{ skip: "İçeriğe atla" }}
    corners={{ "bottom-start": <Badge class="lab-corner">Taslak</Badge> }} titleTemplate="%s · Laboratuvar" skipLink asideToggle={false}
    top={<Box>Duyuru</Box>} header={<Box>Üst bilgi</Box>} nav={<Box>Gezinme</Box>} aside={<Box>Yan alan</Box>} footer={<Box>Alt bilgi</Box>}>
    {/* The children are the main content. */}
    <Box>Ana içerik <Template /></Box>
  </Layout>
}
