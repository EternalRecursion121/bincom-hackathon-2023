<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let question = '';
  export let timeLimit = 30; // in seconds

  let countdown = timeLimit;
  
  let interval;
  let videoStream;
  let videoElement;

  let cameraOn = true;
  
  async function getMedia() {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoElement.srcObject = videoStream;
    } catch (err) {
      console.log(err);
    }
  }

  function toggleCamera() {
    cameraOn = !cameraOn;

    if (videoStream) {
      videoStream.getVideoTracks()[0].enabled = cameraOn;
    }
  }

  onMount(() => {
    interval = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        dispatch('timeUp');
        countdown = timeLimit;
      }
    }, 1000);

    getMedia();
  });

  onDestroy(() => {
    clearInterval(interval);
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
    }
  });
</script>

<div class="flex flex-col items-center justify-center h-screen text-white">
  <video class="absolute top-0 left-0 w-80 h-45 border-black border-4" autoplay muted playsinline bind:this={videoElement}></video>
  <button class="absolute top-0 right-0 mt-28 mr-4" on:click={toggleCamera}>Toggle camera</button>
  
  <p class="text-3xl text-center w-4/5">{question}</p>
  <div class="mt-[100px] h-10 w-10 text-center">
    <div class="text-white inline-block leading-10">{countdown}</div>
    <div class="relative w-10 h-10">
        <svg class="-mt-10">
          <circle r="18" cx="20" cy="20" style="--timeLimit: {timeLimit}s"></circle>
        </svg>
    </div>
  </div>
</div>

<style lang="postcss">
  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    transform: rotateY(-180deg) rotateZ(-90deg);
  }

  svg circle {
    stroke-dasharray: 113px;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    stroke-width: 2px;
    stroke: white;
    fill: none;
    animation: countdown var(--timeLimit) linear infinite forwards;
  }

  @keyframes countdown {
      from {
        stroke-dashoffset: 0px;
      }
      to {
        stroke-dashoffset: 113px;
      }
    }
</style>
