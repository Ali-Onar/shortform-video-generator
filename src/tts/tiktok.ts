import fetch from "node-fetch";
import { writeFileSync } from "fs";

export async function generateTTS(text: string, audioPath: string): Promise<void> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error("Text cannot be empty");
    }

    if (text.length > 300) {
      throw new Error("Text is too long. Maximum length is 300 characters");
    }

    const res = await fetch("https://tiktok-tts.weilnet.workers.dev/api/generation", {
      method: "POST",
      body: JSON.stringify({
        text: text.trim(),
        voice: "en_us_001"
      }),
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
    });

    if (!res.ok) {
      throw new Error(`TTS API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    console.log("🔍 TikTok TTS response is ok");

    if (!data.data) {
      throw new Error("No audio data received from TTS API");
    }

    const buffer = Buffer.from(data.data, "base64");

    if (!buffer || buffer.length === 0) {
      throw new Error("Received empty audio buffer");
    }

    writeFileSync(audioPath, buffer);
    console.log("📁 Audio file saved to:", audioPath);
    
  } catch (error: unknown) {
    console.error("❌ TTS Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to generate TTS: ${errorMessage}`);
  }
}
