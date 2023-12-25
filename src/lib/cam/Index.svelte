<script lang=ts>
    import { type Writable } from "svelte/store";
    import Capture from "./Capture.svelte";
    export let gallery: Writable<string[]>
</script>

<Capture {gallery} />