import { Alert, Button, toast } from "march/ui"
import { shield } from "march/icons"

// bir sitenin çerez bildirimi: yüzen (raised) bildirim, eylemler metnin altında; kapatınca bir daha görünmez
export function CookieNotice() {
  let $choice = ""
  const pick = (c: string) => { $choice = c; toast(c === "all" ? "Tüm çerezler kabul edildi" : "Yalnız gerekli çerezler") }
  return <div sx={{ flex: "col", gap: 2 }}>
    {() => $choice ? <span sx={{ color: "muted" }}>Seçiminiz kaydedildi: {$choice === "all" ? "tümü" : "gerekli olanlar"}</span>
      : <Alert variant="raised" tone="neutral" icon={shield} title="Çerezler" actionPlacement="below"
          dismissable dismissLabel="Bildirimi kapat" onDismiss={() => pick("needed")}
          action={[<Button size="sm" variant="primary" on:click={() => pick("all")}>Tümünü kabul et</Button>,
            <Button size="sm" variant="ghost" on:click={() => pick("needed")}>Yalnız gerekli</Button>]}>
          Deneyiminizi iyileştirmek için çerez kullanıyoruz.
        </Alert>}
  </div>
}
