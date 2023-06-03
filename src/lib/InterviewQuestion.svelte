<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let question = '';
  export let timeLimit = 30; // in seconds

  let countdown = timeLimit;
  
  let interval;

  onMount(() => {
    interval = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(interval);
        dispatch('timeUp');
      }
    }, 1000);
  });
</script>

<div class="flex flex-col items-center justify-center h-screen text-white">
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
