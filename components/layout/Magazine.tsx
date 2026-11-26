// Magazine: the creative-minimal Layout example.
//
// What it shows: the smallest useful frame: a header, a side column with the table of contents, a footer and an
// article as the main content. No navigation region and no corner controls.
// When to use this pattern: a content page (article, docs page, magazine issue) that only needs a few regions around
// the text. You pass just the regions you want; the rest are not drawn.
//
// Accessibility: the regions become landmarks (header, main, aside, footer). `features={[]}` replaces the default
// features (scroll-to-top, focus handling after route changes) with none, which keeps this demo static.
import { Layout } from "march/ui"

// A small box that gives each demo region some padding and a visible surface; it is not part of Layout.
const Box = (props: { children?: unknown }) => <div sx={{ p: 2, radius: 2 }} class="sc-ld-box">{props.children}</div>

export function Magazine() {
  // header / aside / footer are region props; the children are the main content.
  return <Layout features={[]} header={<Box>HADİ Dergi · Kasım</Box>} aside={<Box>İçindekiler</Box>} footer={<Box>© HADİ</Box>}>
    <article sx={{ p: 2 }}>
      <h3 sx={{ text: ["lg", "bold"] }}>Sinyallerle düşünmek</h3>
      <p sx={{ text: "sm" }}>Bir değer değişince yalnız ona bağlı olan yer yeniden çizilir.</p>
    </article>
  </Layout>
}
