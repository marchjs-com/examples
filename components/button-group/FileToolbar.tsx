// FileToolbar: the real-life ButtonGroup example.
//
// The top bar of a file manager: a spaced group of actions on the left and an attached view switch (list or grid) on
// the right. It shows both kinds of group side by side, and when to use which: spaced for separate commands, attached
// for options that belong together. Use this pattern for toolbars.
import { ButtonGroup, Button, Card, toast } from "march/ui"
import { Icon, list, grid, upload, folder, fileText } from "march/icons"

// The demo files listed below the toolbar.
const files = ["Teklif.pdf", "Bütçe.xlsx", "Logo.svg", "Notlar.md", "Sunum.key", "Sözleşme.pdf"]

export function FileToolbar() {
  // The chosen view (reactive state): it decides the number of columns of the file list.
  let $view = "list" as "list" | "grid"
  return <Card title="Belgeler">
    <div sx={{ flex: ["row", "between", "wrap"], gap: 2, mb: 3 }}>
      {/* A spaced group: two independent commands. `label` names the group for screen readers ("file actions"). */}
      <ButtonGroup label="Dosya eylemleri">
        <Button icon={upload} size="sm" on:click={() => toast("Yükleme penceresi açıldı")}>Yükle</Button>
        <Button icon={folder} size="sm" variant="secondary" on:click={() => toast("Yeni klasör oluşturuldu")}>Yeni klasör</Button>
      </ButtonGroup>
      {/* An attached group: one strip with two options. `pressed` marks the active view (aria-pressed), so assistive
          technology hears which one is on. (When exactly one of several must always be chosen, Segmented is the
          dedicated component; this shows the same look built from a ButtonGroup.) */}
      <ButtonGroup attached label="Görünüm">
        <Button icon={list} size="sm" variant="secondary" pressed={$view === "list"} on:click={() => $view = "list"}>Liste</Button>
        <Button icon={grid} size="sm" variant="secondary" pressed={$view === "grid"} on:click={() => $view = "grid"}>Izgara</Button>
      </ButtonGroup>
    </div>
    {/* The list: sx `cols` is the number of columns, one or three depending on the view. */}
    <div sx={{ cols: $view === "grid" ? 3 : 1, gap: 2 }}>
      {files.map((f) => <div sx={{ flex: ["row", "center"], gap: 2, p: 2, radius: 2, shadow: 1 }}>
        <span sx={{ color: "brand-blue" }}><Icon of={fileText} /></span><span sx={{ text: "sm" }}>{f}</span>
      </div>)}
    </div>
  </Card>
}
