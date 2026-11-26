// PictureLab: the full-featured Picture example; it uses every prop at least once.
//
// Picture is the image element behind every "cover", "logo" or "media" slot: it draws a picture object as an <img> (lazy,
// decoded off the main thread, with its size so nothing jumps) and returns a ready node as it is. Props shown here: source
// (an object or a node), src, alt, width, height, srcset, sizes, loading, fit (cover, contain, or natural size), fallback,
// onLoad, onError, class and other attributes such as title and data-*.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PictureLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Picture } from "march/ui"

// One cell of the Lab: a small muted title and the picture under it. Plain composition, no Picture feature.
const Cell = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1, w: "sm" }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PictureLab() {
  // The last event (loaded or failed), shown at the top.
  let $status = "bekliyor"
  return <div sx={{ flex: "col", gap: 3 }}>
    <p>Son olay: <b>{() => $status}</b></p>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Cell title="Nesne (source), kapla">
        {/* source: a picture object ({ src, alt, width, height, srcset, sizes }) fills the props below; it is drawn as an
            <img> that is lazy and decoded asynchronously by default. fit="cover": fill the box and crop to fit. */}
        <Picture source={{ src: "/media/dusk.jpg", alt: "Tepeler", width: 1200, height: 800 }} fit="cover" class="lab-object" />
      </Cell>
      <Cell title="src + alt + boyut, sığdır, hemen">
        {/* The same with separate props. alt is always written (empty alt would mark the image as decoration). width and
            height reserve the space, so the layout does not jump while the image loads. loading="eager": no lazy loading
            and fetchpriority="high", for an image on the first screen. fit="contain": the whole image fits in the box.
            title and data-kind are other attributes: they pass through to the <img>. onLoad runs when it has loaded. */}
        <Picture src="/media/dusk.jpg" alt="Gün batımı" width={600} height={400} loading="eager" fit="contain" title="Gün batımı (600×400)" data-kind="hero" class="lab-eager"
          onLoad={() => $status = "yüklendi"} />
      </Cell>
      <Cell title="srcset + sizes, doğal boyut">
        {/* srcset + sizes: responsive sources, so the browser picks the right file for the width. Without `fit` the image
            keeps its natural size and is never wider than its box. */}
        <Picture src="/media/dusk.jpg" srcset="/media/dusk.jpg 1200w" sizes="(max-width: 600px) 100vw, 300px" alt="Duyarlı" class="lab-srcset" />
      </Cell>
      <Cell title="Bozuk adres: yedek ve onError">
        {/* The address does not exist on purpose: fallback replaces the image with that text (the alt text stays as its
            accessible name) and onError is called, which the Lab shows at the top. */}
        <Picture src="/media/yok.jpg" alt="Kayıp" fallback="Resim yüklenemedi" class="lab-broken" onError={() => $status = "hata"} />
      </Cell>
      <Cell title="Hazır düğüm (olduğu gibi)">
        {/* source can also be a ready node: Picture returns it as it is, so one slot can take either an image object or any
            content. */}
        <Picture source={<span class="lab-node" sx={{ flex: ["row", "center"], gap: 2 }}><span aria-hidden="true">🖼</span><b>Kendi düğümüm</b></span> as Node} />
      </Cell>
    </div>
  </div>
}
