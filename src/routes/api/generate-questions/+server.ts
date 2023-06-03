import { OPENAI_API_KEY } from "$env/static/private";
import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from "openai";
import { json } from '@sveltejs/kit';

function createUserMessage(jobDescription, numQuestions) {
    return `Here's the role I'm applying for:
    ${jobDescription}
    
    Please generate ${numQuestions} interview questions for this role.`;
}

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = (async ({ request }) => {
    const { jobDescription, numQuestions } = await request.json();

    const messages = [{role: "system", content: "You are JobGPT- a helpful AI assistant designed to aid users in interview preparation. You should output a numbered list of example interview questions based on the job description. Make sure to include a variety of general and specific questions in order to more accurately simulate a real interview. Don't return anything apart from the numbered list."},
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

    const content = response.data.choices[0].message.content;

    // regex to match everything before the number with a dot
    const regex = /.*?(?=\d+\.)/s;

    const result = content.replace(regex, '');

    const questions = result.split(/\n?\d+\.\s*/).filter(Boolean);

    console.log("SENT")
    console.log(questions)
    return json({ questions });

  } catch (err) {
      console.error(err);
      return { status: 500, body: err.toString() };
  }
}) satisfies RequestHandler;
