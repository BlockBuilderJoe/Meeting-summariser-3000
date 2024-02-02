const fs = require('fs');
const OpenAI = require('openai');
const util = require('util');

const audiofile = "CorfeCastle.m4a";
const openai = new OpenAI(process.env.OPENAI_API_KEY); // Replace with your API key

async function main(audiofile) {
    const transcription = await openai.audio.transcriptions.create({ 
        file: fs.createReadStream(audiofile),
        model: "whisper-1",
    });
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("transcription.txt", transcription.text);

    console.log("Transcription written to transcription.txt");
}

main(audiofile);
