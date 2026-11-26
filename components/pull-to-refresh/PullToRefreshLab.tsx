// PullToRefreshLab: the full-featured PullToRefresh example; it uses every prop at least once.
//
// Props shown here: onRefresh, threshold, disabled, onPhase, labels, indicator (your own content: the second area),
// icon, settle, refreshButton, class and the content (children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PullToRefreshLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { PullToRefresh, Button } from "march/ui"
import { Icon, arrowDown, arrowUp, hourglass } from "march/icons"

export function PullToRefreshLab() {
  // How many refreshes have finished.
  let $count = 0
  // The phase reported by onPhase (idle, pull, ready, refreshing).
  let $phase = "idle"
  // Whether refreshing is switched off (the disabled prop).
  let $off = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $off = !$off}>{() => ($off ? "Yenilemeyi aç" : "Yenilemeyi kapat")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Evre: ${$phase} · yenileme: ${$count}`}</p>
    {/* Each PullToRefresh is its own scroll area, so each one sits in an element with a height. */}
    <div style={{ height: "200px" }}>
      {/* The first area uses most props:
          - threshold: pull distance in px; settle: ms of the spring back (false snaps); refreshButton: the keyboard
            button.
          - disabled: a function, so the area can be switched off at run time; onPhase: reports the phase.
          - onRefresh: async work (the promise keeps the indicator turning); labels: the announced texts and the button
            text;
            icon: what turns inside the indicator; class: on the area (the tests use it). */}
      <PullToRefresh class="lab-ptr" threshold={56} settle={180} refreshButton disabled={() => $off}
        onPhase={(p: string) => $phase = p}
        onRefresh={() => new Promise((ok) => setTimeout(ok, 300)).then(() => { $count++ })}
        labels={{ pull: "Çekmeye devam", release: "Bırakın, yenilensin", refreshing: "Yenileniyor…", refresh: "Şimdi yenile" }}
        icon={hourglass}>
        {Array.from({ length: 12 }, (_, i) => <p sx={{ p: 1 }}>{`Öğe ${i + 1}`}</p>)}
      </PullToRefresh>
    </div>
    {/* The second area draws its own indicator and has no keyboard button. */}
    <div style={{ height: "120px" }}>
      {/* indicator as a function draws your own content for every phase (an arrow that flips when the pull is ready).
          refreshButton={false}: give keyboard users another way to refresh when you hide the button. */}
      <PullToRefresh class="lab-own" refreshButton={false}
        indicator={(phase: string) => <Icon of={phase === "ready" ? arrowUp : arrowDown} />}>
        <p sx={{ p: 1 }}>Kendi göstergem: çekince oklar</p>
      </PullToRefresh>
    </div>
  </div>
}
