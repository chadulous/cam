<script lang="ts">
    import type { Writable } from "svelte/store";

    export let gallery: Writable<string[]>;
</script>

<div class="h-full w-full overflow-x-hidden overflow-y-scroll">
    {#each $gallery as picture}
        <button on:click={() => console.log(picture)}>
            <img src={picture} alt="" />
        </button>
    {/each}
</div>