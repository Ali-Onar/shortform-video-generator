import { writeFileSync, readFileSync } from "fs";

export function generateSRTFromWhisperJSON(jsonPath: string, srtOutputPath: string): void {
  const data = JSON.parse(readFileSync(jsonPath, "utf-8"));

  const words = data.words;
  let srt = "";

  words.forEach((w: any, index: number) => {
    const start = secondsToTimestamp(w.start);
    const end = secondsToTimestamp(w.end);

    srt += `${index + 1}\n${start} --> ${end}\n${w.word.trim()}\n\n`;
  });

  writeFileSync(srtOutputPath, srt);
  console.log("✅ SRT file (word-based) generated");
}

function secondsToTimestamp(seconds: number): string {
  const date = new Date(seconds * 1000);
  return date.toISOString().substr(11, 12).replace(".", ",");
}
