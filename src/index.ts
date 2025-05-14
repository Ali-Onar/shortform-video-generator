import { InputData, OutputPaths } from "../types/index.types";
import { generateTTS } from "./tts/tiktok";
import { combineVideo } from "./utils/ffmpegHandler";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { transcribeAudioToJSON } from "./utils/transcribe";
import { generateSRTFromWhisperJSON } from "./utils/srtFromWhisper";

const requiredDirs = ["./tmp", "./output"];
for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created missing directory: ${dir}`);
  }
}

const INPUT: InputData = {
  text: "Welcome to shortform video creation! This tool turns your text into voice, adds AI-generated subtitles, mixes it with music and video, and delivers a ready-to-share clip in seconds.",
  musicPath: path.join(__dirname, "assets", "music.mp3"),
  videoPath: path.join(__dirname, "assets", "bg-video.mp4"),
};

const OUTPUT: OutputPaths = {
  audioPath: "./tmp/voice.mp4",
  subtitlePath: "./tmp/subtitles.srt",
  finalVideo: "./output/output.mp4",
  jsonPath: "./tmp/whisper.json",
};

async function main() {
  console.log(chalk.cyan("🚀 Starting video generation..."));

  await generateTTS(INPUT.text, OUTPUT.audioPath);
  await transcribeAudioToJSON(OUTPUT.audioPath, OUTPUT.jsonPath);
  generateSRTFromWhisperJSON(OUTPUT.jsonPath, OUTPUT.subtitlePath);
  await combineVideo(INPUT.videoPath, OUTPUT.audioPath, INPUT.musicPath, OUTPUT.finalVideo, OUTPUT.subtitlePath);

  console.log(chalk.green("✅ Video created successfully!"));
}

main();
