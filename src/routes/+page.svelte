<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import Setup from '$lib/Setup.svelte';
  import InterviewQuestion from '$lib/InterviewQuestion.svelte';
  import Feedback from '$lib/Feedback.svelte'

  let currentPage = 'setup';
  let setupData = {};
  let questions = [];
  let currentQuestionIndex = 0;
  let timeLimit = 5;

  onMount(async () => {
    // Replace this with your actual API call.
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    questions = await response.json();
    questions = questions.slice(0, 5);
  });

  function startInterview(event) {
    setupData = event.detail;
    currentPage = 'interview';
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
    } else {
      currentPage = 'feedback';
    }
  }
</script>


<div class="w-screen h-screen bg-gray-900">
  {#if currentPage === 'setup'}
    <Setup on:submit={startInterview} />
  {:else if currentPage === 'interview' && questions.length > 0}
    <InterviewQuestion {timeLimit} question={questions[currentQuestionIndex].body} on:timeUp={nextQuestion} />
  {:else if currentPage === 'feedback'}
    <Feedback/>
  {/if}
</div>


