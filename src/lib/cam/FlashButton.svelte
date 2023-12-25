<script lang="ts">
    import { type Writable } from "svelte/store";
    export let flashEnabled: Writable<boolean>;
</script>

<label
    class="swap kbd transition-all duration-200"
    class:bg-amber-400={$flashEnabled}
>
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" bind:checked={$flashEnabled} />
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="swap-on w-6 h-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
    </svg>
    <!-- moon icon -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="swap-off w-6 h-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21"
        />
    </svg>
</label>
