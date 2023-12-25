<script lang=ts>
    import { writable } from "svelte/store";
    import Capture from "./lib/Capture.svelte";

    const gallery = writable<string[]>([]);
    gallery.subscribe(console.log)
</script>

<Capture {gallery} />

{#each $gallery as pic}
<div class="flex">
    <img src={pic} alt="">
</div>
{/each}