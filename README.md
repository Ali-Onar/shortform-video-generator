# 🎬 Shortform Video Generator

This project creates shortform videos (like TikTok, Reels) from plain text using AI tools.

[`Demo link`](https://www.youtube.com/watch?v=mw0lMf2Fu8E)

## ✨ Features

- 🔊 Text-to-speech using TikTok TTS
- 🧠 AI-generated, word-level subtitles using OpenAI Whisper
- 🎥 Automatic video composition with background video & music
- 💬 Burned-in, styled subtitles (font size, position, bold)
- 🧪 One command = complete video with synced captions

## 🛠 Tech Stack

- Node.js + TypeScript
- OpenAI Whisper API
- FFmpeg via fluent-ffmpeg
- TikTok TTS (unofficial API)

## 📦 Installation

```bash
git clone https://github.com/Ali-Onar/shortform-video-generator.git
cd shortform-video-generator
npm install
```

Create a .env file:

```bash
OPENAI_API_KEY=your_openai_key_here
```

## Usage

Add video and music into `src/assets` folder.

```bash
npx tsx src/index.ts
```

Your final video will be saved in `/output/output.mp4`

## Acknowledgements

Inspired by the [`egebese/brainrot-generator`](https://github.com/egebese/brainrot-generator) repo that Ege created with Python codes.
