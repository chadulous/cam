import { readonly, writable, type Writable } from "svelte/store";
import { sleep } from "./store";

export default function (): Omit<Writable<number>, "update"> {
    const store = writable<number>();
    const subscribe = readonly(store);
    return {
        ...subscribe,
        async set(number: number) {
            for(const i of [...new Array(number).keys()].reverse().map(v => v+1)) {
                store.set(i);
                await sleep(1000);
            }
            store.set(0);
        }
    }
}