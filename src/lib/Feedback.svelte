<script>
    import { createEventDispatcher } from 'svelte';
  
    // Variable for the API's feedback.
    let apiFeedback = 'API feedback goes here...';
  
    const dispatch = createEventDispatcher();
  
    function nextQuestion() {
      dispatch('next');
    }
  </script>
  
  <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <div class="w-3/4 h-1/4 p-4 bg-gray-800 rounded-md text-white overflow-auto">
      <p>{apiFeedback}</p>
    </div>
  
    <button 
      class="px-4 py-2 mt-6 text-lg bg-gray-800 rounded-md hover:bg-gray-700 outline-none" 
      on:click={nextQuestion}
    >
      Next Question
    </button>
  </div>
  