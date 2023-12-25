<script lang="ts">
    import { derived, writable, type Writable } from "svelte/store";

    export let timer: Writable<number>;
    export let enabled: Writable<boolean>;
    const options = [0, 2, 5, 10];
    const option = derived(timer, (timer) => (timer ? `${timer}s` : "off"));

</script>

<div class="dropdown dropdown-bottom dropdown-end">
    <div
        tabindex="0"
        role="button"
        class="kbd"
        class:pointer-events-none={!$enabled}
        class:cursor-not-allowed={!$enabled}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
        <span>{$option}</span>
    </div>
    <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
        {#each options as option}
            <li>
                <a on:click={() => timer.set(option)}
                    >{option ? `${option}s` : "off"}</a
                >
            </li>
        {/each}
    </ul>
</div>
