<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { derived, writable, type Writable } from "svelte/store";

    export let devices: Writable<MediaDeviceInfo[]>;
    export let selectedDeviceId: Writable<string>;
    export let enabled: Writable<boolean>;
    const deviceName = derived(
        [devices, selectedDeviceId],
        ([devices, selectedDeviceId]) => {
            return (
                devices.find((v) => v.deviceId === selectedDeviceId)?.label ||
                "<no device>"
            );
        },
    );
    const dispatch = createEventDispatcher();
</script>

<div class="dropdown dropdown-right inline">
    <div
        tabindex="0"
        role="button"
        class="btn btn-xs"
        title="Change source"
        class:pointer-events-none={!$enabled}
        on:click={() => dispatch("reload")}
    >
        <span>{$deviceName}</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 inline"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
        </svg>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
        {#each $devices as device (device.deviceId)}
            <li>
                <a class:disabled={!$enabled} on:click={() => selectedDeviceId.set(device.deviceId)}>
                    {device.label || `Camera ${device.deviceId}`}
                </a>
            </li>
        {/each}
    </ul>
</div>
