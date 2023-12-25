<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    let videoStream: MediaStream;
    let canvas: HTMLCanvasElement;
    let a: HTMLLinkElement;
    let ctx: CanvasRenderingContext2D;
    const devices = writable<MediaDeviceInfo[]>([]);
    const selectedDeviceId = writable<string>();
    let videoElement: HTMLVideoElement;

    async function getVideoDevices() {
        try {
            const devicesInfo = await navigator.mediaDevices.enumerateDevices();
            $devices = devicesInfo.filter(
                (device) => device.kind === "videoinput",
            );
        } catch (error) {
            console.error("Error enumerating video devices:", error);
        }
    }

    async function startVideo() {
        try {
            const constraints: MediaStreamConstraints = {
                video: {
                    deviceId: { exact: $selectedDeviceId },
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            videoStream = stream;
            videoElement.srcObject = stream;
            ctx = canvas.getContext("2d");
            canvas.height = videoElement.videoHeight;
            canvas.width = videoElement.videoWidth;
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    }

    function stopVideo() {
        // Stop the video stream when the component is destroyed or when needed
        if (videoStream) {
            const tracks = videoStream.getTracks();
            tracks.forEach((track) => track.stop());
        }
    }

    function takePicture() {
        console.log(videoElement.videoHeight, videoElement.videoWidth);
        canvas.height = videoElement.videoHeight;
        canvas.width = videoElement.videoWidth;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }
    onMount(() => {
        navigator.mediaDevices.getUserMedia({ video: true });
    });
</script>

<div>
    <button on:click={getVideoDevices}>Refresh Devices</button>
    <select bind:value={$selectedDeviceId}>
        {#each $devices as device (device.deviceId)}
            <option value={device.deviceId}
                >{device.label || `Camera ${device.deviceId}`}</option
            >
        {/each}
    </select>
    <button on:click={startVideo}>Enable Cam</button>
    <button on:click={takePicture}>Take Picture</button>
    <video bind:this={videoElement} id="video" autoplay></video>
    <canvas bind:this={canvas}></canvas>
    <a bind:this={a}>download</a>
</div>

<style>
    /* You can add some styling to the video element if needed */
    #video {
        width: 100%;
        max-width: 640px;
    }
</style>
