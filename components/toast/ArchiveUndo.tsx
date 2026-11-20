import { Button, toast } from "march/ui"

// e-postayı arşivle: bildirimde "Geri al"; geri alınınca ileti listeye döner
export function ArchiveUndo() {
  let $mails = ["Toplantı notları", "Fatura", "Bülten"]
  const archive = (m: string) => {
    $mails = $mails.filter((x) => x !== m)
    toast(`"${m}" arşivlendi`, { kind: "success", action: { label: "Geri al", run: () => { $mails = [...$mails, m] } } })
  }
  return <ul>{$mails.map((m) => <li>{m} <Button size="sm" variant="ghost" on:click={() => archive(m)}>Arşivle</Button></li>)}</ul>
}
