const fs = require('fs');
const OpenAI = require('openai');
const util = require('util');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function main() {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream("CorfeCastle.m4a"),
        model: "whisper-1",
    });
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("transcription.txt", transcription.text);
    console.log("Transcription written to transcription.txt");
}
main();
