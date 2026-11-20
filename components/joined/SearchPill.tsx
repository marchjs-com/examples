import { Joined, TextInput, Button } from "march/ui"

// hap biçiminde arama: alan ve düğme tek bir bütün; köşeler yalnız dışta yuvarlak
export function SearchPill() {
  let $q = ""
  let $sent = ""
  return <div sx={{ flex: "col", gap: 2 }}>
    <Joined direction="horizontal" radius="full">
      <TextInput placeholder="Şehir ara…" aria-label="Şehir" bind:value={$q} />
      <Button variant="primary" on:click={() => $sent = $q}>Ara</Button>
    </Joined>
    <span sx={{ text: "sm", color: "muted" }}>{$sent ? `“${$sent}” aranıyor` : "Bir şehir yazın"}</span>
  </div>
}
