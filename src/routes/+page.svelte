<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import Setup from '$lib/Setup.svelte';
  import InterviewQuestion from '$lib/InterviewQuestion.svelte';
  import Feedback from '$lib/Feedback.svelte';

  let currentPage = 'setup';
  let setupData = {};
  let currentQuestionIndex = 0;
  let timeLimit = 5;
  let questions = [];



  onMount(async () => {
    // Replace this with your actual API call.
    
  });

  async function startInterview(event) {
    setupData = event.detail;
    currentPage = 'interview';

    console.log(setupData)
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(setupData)
    });

    const data = await response.json();
    console.log(data);

    questions = data.questions;
    currentPage = 'interview';
  }


  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      console.log(recordedAudioData, recordedVideoData)
    } else {
      console.log(recordedAudioData, recordedVideoData)
      currentPage = 'feedback';
    }
  }
</script>


<div class="w-screen h-screen bg-gray-900">
  {#if currentPage === 'setup'}
    <Setup on:submit={startInterview} />
  {:else if currentPage === 'interview' && questions.length > 0}
    <InterviewQuestion {timeLimit} question={questions[currentQuestionIndex]} on:timeUp={nextQuestion} />
  {:else if currentPage === 'feedback'}
    <Feedback/>
  {/if}
</div>


