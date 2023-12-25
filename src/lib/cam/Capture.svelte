<script lang="ts">
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import flash from "./flash";
    import Dropdown from "./Dropdown.svelte";
    import FlashButton from "./FlashButton.svelte";
    let videoStream: MediaStream;
    let canvas: HTMLCanvasElement;
    const flashEnabled = writable(false);
    const flashOpacity = flash(flashEnabled);
    let ctx: CanvasRenderingContext2D;
    const devices = writable<MediaDeviceInfo[]>([]);
    const selectedDeviceId = writable<string>();
    let videoElement: HTMLVideoElement;

    export let gallery: Writable<string[]>
    selectedDeviceId.subscribe(() => enableCamera());
    async function getInputs() {
        try {
            const devicesInfo = await navigator.mediaDevices.enumerateDevices();
            $devices = devicesInfo.filter(
                (device) => device.kind === "videoinput",
            );
            $selectedDeviceId = $devices[0].deviceId;
        } catch (error) {
            console.error("Error enumerating video devices:", error);
        }
    }

    async function enableCamera() {
        try {
            const constraints: MediaStreamConstraints = {
                video: {
                    deviceId: { exact: $selectedDeviceId },
                },
            };

            const stream =
                await navigator.mediaDevices.getUserMedia(constraints);
            videoStream = stream;
            videoElement.srcObject = stream;
            ctx = canvas.getContext("2d");
            canvas.height = videoElement.videoHeight;
            canvas.width = videoElement.videoWidth;
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    }
    async function takePicture() {
        console.log(videoElement.videoHeight, videoElement.videoWidth);
        canvas.height = videoElement.videoHeight;
        canvas.width = videoElement.videoWidth;
        await flashOpacity.startFlash();
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        await flashOpacity.finishFlash();
        const data = canvas.toDataURL("image/png");
        gallery.update(gallery => {
            gallery.push(data);
            console.log("HI")
            return gallery;
        })
    }
    onMount(async () => {
        await navigator.mediaDevices.getUserMedia({ video: true });
        await getInputs();
        await enableCamera();
    });
</script>
<canvas class="hidden" bind:this={canvas}></canvas>

<div class="flex h-full w-full flex-col bg-[#1b1b1c] text-white">
    <div class="flex items-center justify-center py-2 px-6 flex-row shadow-lg rounded-b-lg bg-slate-700/50">
            <Dropdown on:reload={getInputs} {selectedDeviceId} {devices} />
            <div class="flex-grow"></div>
            <FlashButton {flashEnabled} />
    </div>
    <div class="flex-grow flex flex-row items-center justify-center">
        <video bind:this={videoElement} id="video" autoplay></video>
    </div>
    <div class="flex items-center justify-center mb-4">
        <button
            on:click={takePicture}
            class="flex h-16 w-16 kbd hover:scale-105 active:scale-95 items-center justify-center rounded-full bg-red-500 shadow-lg transition-all hover:brightness-150"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
            </svg>
        </button>
    </div>
</div>

<div
    class="bg-white h-screen w-screen absolute z-[99] top-0 left-0 pointer-events-none"
    style="opacity: {$flashOpacity * 100}%;"
></div>

<style>
    #video {
        width: 100%;
        max-width: 640px;
    }
</style>
