import { OPENAI_API_KEY } from "$env/static/private";
import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = (async ({ body }) => {
  const { questions, audioFiles } = body;

  try {
  // Extract the questions and audio data from the request body
          // Generate feedback using the GPT-4 API
      let feedback = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{role: "user", content: "Hello world"}],
      });

      return { body: responses };

  } catch (err) {
      console.error(err);
      return { status: 500, body: err.toString() };
  }
}) satisfies RequestHandler;
