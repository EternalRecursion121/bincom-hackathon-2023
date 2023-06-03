import { OPENAI_API_KEY } from "$env/static/private";
import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from "openai";
import { json } from '@sveltejs/kit';

function createUserMessage(jobDescription, question, response) {
    return `Here's the role I'm applying for:
    ${jobDescription}
    
    Interview Question: ${question}
    My answer: ${response}
    
    Please provide some feedback on my answer.`;
}

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = (async ({ request }) => {
    const { jobDescrption, question, reponse } = await request.json();

    const messages = [{role: "system", content: "You are JobGPT- a helpful AI assistant designed to aid users in their interview preparation."},
    {role: "user", content: createUserMessage(jobDescription, numQuestions)}]

    console.log("RECIEVED");

    try {
    // Extract the questions and audio data from the request body
    // Generate feedback using the GPT-4 API
    let response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    console.log(response.data.choices[0].message)

    const questions = response.data.choices[0].message.content.split(/\n?\d+\.\s*/).filter(Boolean)

    console.log("SENT")
    console.log(questions)
    return json({ questions });

  } catch (err) {
      console.error(err);
      return { status: 500, body: err.toString() };
  }
}) satisfies RequestHandler;
