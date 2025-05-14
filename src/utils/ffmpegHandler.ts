import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegStatic!);

export function combineVideo(
  videoPath: string,
  audioPath: string,
  musicPath: string,
  outputPath: string,
  subtitlePath?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .input(musicPath)
      .inputOptions("-y"); // overwrite output

    const filters: string[] = [];

    if (subtitlePath && fs.existsSync(subtitlePath)) {
      const subtitleFilter = `${subtitlePath}:force_style='FontName=Arial,FontSize=24,Bold=1,Alignment=2,MarginV=50'`;
      filters.push(`[0:v]setsar=1,subtitles=${subtitleFilter}[v]`);
    } else {
      filters.push(`[0:v]setsar=1[v]`);
    }

    // Merge audio
    filters.push(
      `[1:a][2:a]amix=inputs=2:duration=first:dropout_transition=2[a]`
    );

    // Apply filters
    command
      .complexFilter(filters)
      .outputOptions([
        "-map [v]",
        "-map [a]",
        "-c:v libx264",
        "-c:a aac",
        "-shortest",
      ])
      .output(outputPath)
      .on("end", () => {
        console.log("✅ FFmpeg video successfully created");
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ FFmpeg error:", err.message);
        reject(err);
      })
      .run();
  });
}
