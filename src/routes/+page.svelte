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

  async function uploadToAPI() {
    let formData = new FormData();

    recordedChunks.forEach((chunk, index) => {
      // Blob constructor for creating file-like object of immutable, raw data
      let blob = new Blob([chunk], {type: 'video/webm'});

      // Append file to form data
      formData.append('file' + index, blob);
    });

    // Make the request
    let response = await fetch('https://your-api-endpoint.com', {
      method: 'POST',
      body: formData
    });

    if(response.ok) {
      console.log("Successfully uploaded files");
    } else {
      console.log("Error uploading files: ", response.status);
    }
  }


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
    questions = await response.json();
    console.log(questions)
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
    <InterviewQuestion {timeLimit} question={questions[currentQuestionIndex].body} on:timeUp={nextQuestion} on:recorded={handleRecordedData} />
  {:else if currentPage === 'feedback'}
    <Feedback/>
  {/if}
</div>


