import { derived, get, writable, type Writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import { sleep } from "./store";
export default function (enabled: Writable<boolean>) {
  const isTween = writable(false);
  let tween = tweened(1, {
    easing: cubicOut,
  });
  const base = writable(0);
  const readable = derived([tween, base], (v) => {
    return get(enabled) ? get(isTween) ? v[0] : v[1] : 0;
  });
  return {
    async startFlash() {
      if (!get(enabled)) return;
      base.set(1);
      isTween.set(true);
      await sleep(200);
    },
    async finishFlash() {
      return new Promise<void>(async (resolve) => {
        resolve();
        if (!get(enabled)) return;
        await tween.set(0);
        base.set(0);
        isTween.set(false);
        await tween.set(1);
      });
    },
    ...readable,
  };
}
