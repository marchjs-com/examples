// UploadQueue: the real-life Progress example.
//
// What it shows: an upload queue. Every file has its own bar with an "x / y MB" text that turns to the success tone
// when it is done, and a thin line on top shows the total. The upload is simulated with a timer.
// When to use this pattern: many bars driven by one list of numbers; in a real app the numbers come from your upload
// progress events instead of the timer.
//
// Animation: the fill follows the value on the motion engine, so reduced motion, global speed and "Stop all" apply;
// `smooth={false}` makes the bar follow the value at once.
//  Accessibility: every bar is a progressbar named by its label; the total line has an ariaLabel (it has no visible
// text).

import { Progress, Button, Card } from "march/ui"

// The queue: file name and size in MB.
const FILES = [{ name: "rapor.pdf", size: 12 }, { name: "tatil.mp4", size: 480 }, { name: "logo.svg", size: 1 }]

export function UploadQueue() {
  // Megabytes sent so far, one number per file.
  let $done: number[] = FILES.map(() => 0)
  // Id of the running interval.
  let $timer = 0
  //  Start again from zero; every 300 ms each file gains about an eighth of its size, and the timer stops when all are
  // done.
  const start = () => {
    clearInterval($timer)
    $done = FILES.map(() => 0)
    $timer = setInterval(() => {
      $done = $done.map((d, i) => Math.min(FILES[i]!.size, d + Math.max(1, FILES[i]!.size / 8)))
      if ($done.every((d, i) => d >= FILES[i]!.size)) clearInterval($timer)
    }, 300) as unknown as number
  }
  // Total size and total sent, for the line on top.
  const total = () => FILES.reduce((a, f) => a + f.size, 0)
  const sent = () => $done.reduce((a, d) => a + d, 0)
  // - The thin line: variant="line", value / max from the totals; ariaLabel names it; smooth={false} follows the
  //   numbers at once.
  // - Each file: label (visible name), value as a function, max = the file size; tone is a function, so a finished file
  //   turns to "success"; showValue as a function writes the MB text (it receives the percent and the value).
  return <Card title="Yüklemeler">
    <Progress variant="line" value={sent} max={total()} ariaLabel="Toplam yükleme" smooth={false} />
    <div sx={{ flex: "col", gap: 2 }}>
      {FILES.map((f, i) => <Progress label={f.name} value={() => $done[i]} max={f.size} size="sm"
        tone={() => ($done[i]! >= f.size ? "success" : "primary")}
        showValue={(_p: number, mb: number) => `${Math.round(mb)} / ${f.size} MB`} />)}
    </div>
    <Button size="sm" variant="primary" on:click={start}>Yüklemeyi başlat</Button>
  </Card>
}
