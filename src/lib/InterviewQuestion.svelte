<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let cameraOn = true;

  const dispatch = createEventDispatcher();

  export let question = '';
  export let timeLimit = 30; // in seconds

  let countdown = timeLimit;
  let answer = '';

  let interval;
  let videoStream;
  let audioStream;
  let mediaRecorder;
  let videoElement;

  let mediaRecorderVideo;
  let mediaRecorderAudio;
  let recordedChunksVideo = [];
  let recordedChunksAudio = [];

  
  async function getMedia() {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoElement.srcObject = videoStream;

      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(audioStream);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleCamera() {
    cameraOn = !cameraOn;

    if (videoStream) {
      videoStream.getTracks().forEach(track => {
        track.stop();
      });
    }

    if (cameraOn) {
      await getMedia();
    } else if (mediaRecorder) {
      mediaRecorder.stop();
      // Convert the recorded audio data into a format suitable for Whisper.
      const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType });
      console.log(URL.createObjectURL(blob));
    }
  }

  onMount(async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    videoElement.srcObject = videoStream;
    videoElement.play();

    mediaRecorderVideo = new MediaRecorder(videoStream, {mimeType: 'video/webm; codecs=vp9'});
    mediaRecorderAudio = new MediaRecorder(audioStream, {mimeType: 'audio/webm'});

    mediaRecorderVideo.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunksVideo.push(event.data);
      }
    };

    mediaRecorderAudio.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunksAudio.push(event.data);
      }
    };

    mediaRecorderVideo.start();
    mediaRecorderAudio.start();

    interval = setInterval(() => {
      if (countdown-- <= 0) {
        clearInterval(interval);
        mediaRecorderVideo.stop();
        mediaRecorderAudio.stop();

        // Create blobs from the recorded chunks
        const videoBlob = new Blob(recordedChunksVideo, {type: 'video/webm'});
        const audioBlob = new Blob(recordedChunksAudio, {type: 'audio/webm'});

        // Dispatch the event with the recorded data
        dispatch('recorded', {video: videoBlob, audio: audioBlob});
        countdown = timeLimit;
        recordedChunksVideo = [];
        recordedChunksAudio = [];
        dispatch('timeUp')
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="flex flex-col items-center justify-center h-screen text-white relative">
  {#if cameraOn}
    <video class="absolute top-4 left-4 w-80 h-45 border-black border-4 rounded-lg shadow-lg" autoplay muted playsinline bind:this={videoElement}></video>
  {/if}
  <button class="absolute top-56 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none" on:click={toggleCamera}>
    Camera On/Off
  </button>

  <p class="text-3xl text-center w-4/5 mt-64 text-white">{question}</p>

  <input class="mt-2 w-4/5 mx-auto rounded bg-gray-200 p-2 text-black" type="text" placeholder="Your answer..." bind:value={answer} />

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
