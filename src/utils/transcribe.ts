import { OpenAI } from "openai";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function transcribeAudioToJSON(audioPath: string, outputPath: string) {
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
      response_format: "verbose_json",
      language: "en",
      timestamp_granularities: ["word"]
    });
  
    fs.writeFileSync(outputPath, JSON.stringify(response, null, 2));
    console.log("✅ Whisper JSON transcription complete");
  }
