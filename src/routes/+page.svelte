<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import Setup from '$lib/Setup.svelte';
  import InterviewQuestion from '$lib/InterviewQuestion.svelte';
  import Feedback from '$lib/Feedback.svelte';
  import Loading from '$lib/Loading.svelte';

  let currentPage = 'setup';
  let setupData = {};
  let currentQuestionIndex = 0;
  let timeLimit = 30;
  let questions = [];
  let feedback = {};
  let answers = []
  let waiting = [];
  let counter = 0;

  let i = 0;

  async function startInterview(event) {
    setupData = event.detail;

    currentPage = 'loading';
    console.log(setupData)
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(setupData)
    });

    
    console.log(currentPage)
    const data = await response.json();
    console.log(data);

    questions = data.questions;
    // questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];
    currentPage = 'interview';
  }


  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
    } else {
      currentPage = 'feedback';
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const answer = event.detail.answer;
    const question = event.detail.question;

    answers.push(answer);

    const id = counter++;
    waiting.push(id);
    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        answer,
        jobDescription: setupData.jobDescription
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        feedback[id] = data.feedback;
        waiting = waiting.filter(x => x !== id);
      });
    nextQuestion();
  }

  function nextFeedback() {
    if (i < feedback.length - 1) {
      i++;
    }
  }
</script>


<div class="w-screen h-screen bg-gray-900">
  {#if currentPage === 'setup'}
    <Setup on:submit={startInterview} />
  {:else if currentPage === 'interview' && questions.length > 0}
    <InterviewQuestion {timeLimit} question={questions[currentQuestionIndex]} on:submitted={handleSubmit} />
  {:else if currentPage === 'feedback'}
    <Feedback apiFeedback={feedback[i]||"error"} question={questions[i]||"error"} answer={answers[i]||"error"}/>
  {:else if currentPage === 'loading' || waiting}
    <Loading/>
  {:else}
    <h1 class="text-4xl text-white">Something went wrong.</h1>
  {/if}
</div>


