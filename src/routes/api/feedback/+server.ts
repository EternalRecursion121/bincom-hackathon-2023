import type { Config } from '@sveltejs/adapter-vercel';
import { OPENAI_API_KEY } from "$env/static/private";
import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios';

export const config: Config = {
    runtime: 'nodejs18.x'
};

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = (async ({ body }) => {
    // Extract the questions and audio data from the request body
    const { questions, audioFiles } = body;

    let responses = [];
    
    try {
        for(let i = 0; i < questions.length; i++) {
            // Temporarily save the audio data for processing
            let audioFile = audioFiles[i]; // TODO: Save the audio data to a temporary location

            // Transcribe the audio using the Whisper API
            let transcription = await openai.Audio.transcribe("whisper-1", audioFile); 
            
            let transcribedText = transcription.data.text;

            // Generate feedback using the GPT-4 API
            let feedback = await openai.createChatCompletion({
              model: "gpt-4",
              messages: [{role: "user", content: "Hello world"}],
            });

            responses.push({question: questions[i], transcription: transcribedText, feedback: feedback.data.choices[0].text});
        }

        return { body: responses };

    } catch (err) {
        console.error(err);
        return { status: 500, body: err.toString() };
    }
}) satisfies RequestHandler;
