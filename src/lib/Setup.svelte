<script>
  import { createEventDispatcher } from 'svelte';

  export let setupData = {};

  const dispatch = createEventDispatcher();

  let jobDescription = '';
  let numQuestions = 3;
  let manualEntry = false;
  let timeLimit = '30';

  function submitSetup() {
    setupData = {
      jobDescription,
      numQuestions,
      manualEntry,
      timeLimit,
    };
    dispatch('submit', setupData);
  }
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
  <form class="flex flex-col gap-6" on:submit|preventDefault={submitSetup}>
    <div>
      <label for="job-description" class="block text-lg">Job Description</label>
      <textarea id="job-description" bind:value={jobDescription} rows="4" class="w-full px-2 py-1 mt-1 bg-gray-800 rounded-md text-white resize-none outline-none"></textarea>
    </div>

    <div>
      <label for="number-of-questions" class="block text-lg">Number of Questions (anything more than 3 or 4 may break due to vercel function limitations)</label>
      <input id="number-of-questions" type="number" min="1" max="15" bind:value={numQuestions} class="w-full px-2 py-1 mt-1 bg-gray-800 rounded-md text-white outline-none" />
    </div>

    <!-- <div>
      <label class="block text-lg">
        <input type="checkbox" bind:checked={manualEntry} class="mr-2 outline-none" />
        Manual Entry?
      </label>
    </div> -->

    <div>
      <label for="time-limit" class="block text-lg">Time Limit</label>
      <select id="time-limit" bind:value={timeLimit} class="w-full px-2 py-1 mt-1 bg-gray-800 rounded-md text-white outline-none">
        <option value="30">30 Seconds</option>
        <option value="60">1 Minute</option>
        <option value="90">1 Minute 30 Seconds</option>
      </select>
    </div>

    <button type="submit" class="px-4 py-2 mt-6 text-lg bg-gray-800 rounded-md hover:bg-gray-700 outline-none">Start Interview</button>
  </form>
</div>
