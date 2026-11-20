import { Picture } from "march/ui"

// Picture'ın bütün özellikleri bir arada: source (nesne ya da düğüm), src, alt, width, height, srcset, sizes, loading,
// fit (cover / contain / doğal), fallback, onLoad, onError, class ve ek öznitelikler (title, data-…)
const Cell = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1, w: "sm" }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PictureLab() {
  let $status = "bekliyor"
  return <div sx={{ flex: "col", gap: 3 }}>
    <p>Son olay: <b>{() => $status}</b></p>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Cell title="Nesne (source), kapla">
        <Picture source={{ src: "/media/dusk.jpg", alt: "Tepeler", width: 1200, height: 800 }} fit="cover" class="lab-object" />
      </Cell>
      <Cell title="src + alt + boyut, sığdır, hemen">
        <Picture src="/media/dusk.jpg" alt="Gün batımı" width={600} height={400} loading="eager" fit="contain" title="Gün batımı (600×400)" data-kind="hero" class="lab-eager"
          onLoad={() => $status = "yüklendi"} />
      </Cell>
      <Cell title="srcset + sizes, doğal boyut">
        <Picture src="/media/dusk.jpg" srcset="/media/dusk.jpg 1200w" sizes="(max-width: 600px) 100vw, 300px" alt="Duyarlı" class="lab-srcset" />
      </Cell>
      <Cell title="Bozuk adres: yedek ve onError">
        <Picture src="/media/yok.jpg" alt="Kayıp" fallback="Resim yüklenemedi" class="lab-broken" onError={() => $status = "hata"} />
      </Cell>
      <Cell title="Hazır düğüm (olduğu gibi)">
        <Picture source={<span class="lab-node" sx={{ flex: ["row", "center"], gap: 2 }}><span aria-hidden="true">🖼</span><b>Kendi düğümüm</b></span> as Node} />
      </Cell>
    </div>
  </div>
}
