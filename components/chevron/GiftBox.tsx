import { Button, Chevron } from "march/ui"
import { gift } from "march/icons"

// sürpriz kutusu: düğme yalnız aria-expanded taşır; ok onu kendiliğinden izler (open verilmedi) ve yaylı döner
export function GiftBox() {
  let $open = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button variant="ghost" icon={gift} aria-expanded={$open ? "true" : "false"} on:click={() => $open = !$open}>
      {$open ? "Kutuyu kapat" : "Sürprizi aç"} <Chevron direction="down" motion="spring" size="md" m:color="brand-pink" />
    </Button>
    {$open ? <p sx={{ text: "lg" }}>🎉 Ok tek satır bağlama kodu istemedi: düğmenin durumunu kendisi okudu.</p> : null}
  </div>
}
