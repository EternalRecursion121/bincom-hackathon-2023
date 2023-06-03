<script>
    import { createEventDispatcher } from 'svelte';

    // Variables for the question, answer and API's feedback.
    export let apiFeedback = 'API feedback goes here...';
    export let question = 'Question goes here...';
    export let answer = 'Your answer goes here...';

    const dispatch = createEventDispatcher();

    function nextQuestion() {
      dispatch('next');
    }
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <div class="w-3/4 p-4 bg-gray-800 rounded-md text-white overflow-auto mb-6">
      <h2 class="text-2xl mb-2">Question</h2>
      <p>{question}</p>
    </div>
    <div class="w-3/4 p-4 bg-gray-800 rounded-md text-white overflow-auto mb-6">
      <h2 class="text-2xl mb-2">Your Answer</h2>
      <p>{answer}</p>
    </div>
    <div class="w-3/4 p-4 bg-gray-800 rounded-md text-white overflow-auto mb-6">
      <h2 class="text-2xl mb-2">Feedback</h2>
      <p>{@html apiFeedback.replace("\n", "<br>")}</p>
    </div>
  
    <button 
      class="px-4 py-2 text-lg bg-gray-800 rounded-md hover:bg-gray-700 outline-none" 
      on:click={nextQuestion}
    >
      Next Question
    </button>
</div>
