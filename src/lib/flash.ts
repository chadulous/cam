import { derived, get, writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";
export default function() {
    const isTween = writable(false);
    let tween = tweened(1, {
        easing: cubicOut
    });
    const base = writable(0);
    const readable = derived([tween, base], v => {
        return get(isTween)?v[0]:v[1]
    });
    return {
        async flash() {
            base.set(1);
            isTween.set(true);
            await tween.set(0);
            base.set(0)
            isTween.set(false);
            await tween.set(1);
        },
        ...readable
    }
}