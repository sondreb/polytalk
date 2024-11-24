const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Verify required environment variables
if (!process.env.AZURE_KEY || !process.env.AZURE_REGION) {
  console.error("Error: Azure credentials not found in .env file");
  process.exit(1);
}

// Map language codes to Azure voices
const voiceMap = {
  // en: "en-US-JennyNeural",
  // es: "es-ES-ElviraNeural",
  // fr: "fr-FR-DeniseNeural",
  // de: "de-DE-KatjaNeural",
  // it: "it-IT-ElsaNeural",
  // ja: "ja-JP-NanamiNeural",
  // zh: "zh-CN-XiaoxiaoNeural",
  // ko: "ko-KR-SunHiNeural",
  // ru: "ru-RU-SvetlanaNeural",
  // me: "sr-RS-SophieNeural",
  // pl: "pl-PL-AgnieszkaNeural",
  // ar: "ar-AE-FatimaNeural",
  // hi: "hi-IN-SwaraNeural",
  // no: "nb-NO-PernilleNeural",
  // da: "da-DK-ChristelNeural",
  // sv: "sv-SE-SofieNeural",
  // nl: "nl-NL-ColetteNeural",
  // tr: "tr-TR-EmelNeural",
  // ro: "ro-RO-AlinaNeural",
  // is: "is-IS-GudrunNeural",
  // pt: "pt-BR-FranciscaNeural",
  // cy: "cy-GB-NiaNeural",
  fa: "fa-IR-DilaraNeural",
  he: "he-IL-HilaNeural",
};

async function getAuthToken() {
  return process.env.AZURE_KEY;
}

function sanitizeKey(key) {
  return key.replace(/[?<>:"/\\|*]/g, "").trim();
}

async function generateAudio(text, language, category, key) {
  const voice = voiceMap[language];
  if (!voice) {
    console.log(`No voice mapping for language: ${language}`);
    return;
  }

  const safeKey = sanitizeKey(key);
  const outputDir = path.join(
    __dirname,
    "..",
    "public",
    "assets",
    "audio",
    language,
    category
  );
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${safeKey}.mp3`);

  if (fs.existsSync(outputPath)) {
    console.log(`Skipping existing file: ${outputPath}`);
    return;
  }

  const endpoint = `https://${process.env.AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const ssml = `<speak version='1.0' xml:lang='${voice.split("-")[0]}-${
    voice.split("-")[1]
  }'>
        <voice name='${voice}'>${text.split("(")[0].trim()}</voice>
    </speak>`;

  try {
    const response = await axios({
      method: "post",
      url: endpoint,
      headers: {
        "Ocp-Apim-Subscription-Key": await getAuthToken(),
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      data: ssml,
      responseType: "arraybuffer",
    });

    fs.writeFileSync(outputPath, response.data);
    console.log(`Generated: ${outputPath}`);
  } catch (err) {
    console.error(
      `Error generating audio for ${language}/${category}/${key}:`,
      err
    );
  }
}

// Read the language service file
const content = fs.readFileSync(
  "../src/app/services/language.service.temp.ts",
  "utf8"
);
const contentMatch = content.match(
  /private content: {([^}]*)} = {([\s\S]*?)};/
);
const languageData = eval("({" + contentMatch[2] + "})");

async function main() {
  for (const [langCode, langData] of Object.entries(languageData)) {
    for (const [key, value] of Object.entries(langData.words)) {
      await generateAudio(key, "en", "words", key);
      await generateAudio(value, langCode, "words", key);
      await sleep(100);
    }

    for (const [key, value] of Object.entries(langData.numbers)) {
      await generateAudio(key, "en", "numbers", key);
      await generateAudio(value, langCode, "numbers", key);
      await sleep(100);
    }

    for (const [key, value] of Object.entries(langData.sentences)) {
      await generateAudio(key, "en", "sentences", key);
      await generateAudio(value, langCode, "sentences", key);
      await sleep(100);
    }
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => {
    console.log("Audio generation complete!");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
