import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
    runtime: 'nodejs18.x'
};

import { OPENAI_API_KEY } from "$env/static/private";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  temperature: 0,
  max_tokens: 7,
});