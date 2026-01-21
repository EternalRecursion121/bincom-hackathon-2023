# JobGPT - AI Interview Practice

**Winner of the Bincom Hackathon 2023**

An AI-powered interview practice application that helps you prepare for job interviews with AI-generated questions and personalized feedback on your answers.

## Features

- **Custom Job Descriptions**: Enter any job description to get tailored interview questions
- **AI-Generated Questions**: Uses GPT-3.5-turbo to generate relevant interview questions based on the role
- **Timed Responses**: Practice under pressure with configurable time limits (30s, 60s, or 90s)
- **Camera Support**: Optional webcam view to simulate a real interview environment
- **AI Feedback**: Receive personalized feedback on each answer to help you improve

## Tech Stack

- **Frontend**: SvelteKit, Tailwind CSS
- **Backend**: SvelteKit API routes
- **AI**: OpenAI GPT-3.5-turbo
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bincom-hackathon-2023.git
   cd bincom-hackathon-2023
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Enter a job description for the role you're preparing for
2. Select the number of questions (3-4 recommended due to API limits)
3. Choose a time limit for each answer
4. Click "Start Interview" to begin
5. Answer each question within the time limit
6. Review AI-generated feedback for each response

## Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```
