<script lang=ts>
    export let gallery: Writable<string[]>;
</script>
{#each $gallery as picture}
    <img src={picture} alt="">
{/each}