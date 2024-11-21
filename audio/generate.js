const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const util = require("util");
require("dotenv").config();

// Verify required environment variables
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error("Error: AWS credentials not found in .env file");
  process.exit(1);
}

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const polly = new AWS.Polly();

// Map language codes to Polly voices
const voiceMap = {
  en: "Joanna", // Added English voice
  es: "Lucia",
  fr: "Lea",
  de: "Vicki",
  it: "Bianca",
  ja: "Mizuki",
  zh: "Zhiyu",
  ko: "Seoyeon",
  ru: "Tatyana",
  me: "Nada", // Using Serbian voice for Montenegrin
  pl: "Ewa", // Added Polish voice
  ar: "Zeina", // Added Arabic voice
};

// Read the language service file
const content = fs.readFileSync(
  "../src/app/services/language.service.temp.ts",
  "utf8"
);

// Extract the content object using regex
const contentMatch = content.match(
  /private content: {([^}]*)} = {([\s\S]*?)};/
);
const languageData = eval("({" + contentMatch[2] + "})");

// Add this helper function to sanitize keys
function sanitizeKey(key) {
  // Remove question marks and other invalid filename characters
  return key.replace(/[?<>:"/\\|*]/g, "").trim();
}

async function generateAudio(text, language, category, key) {
  const voice = voiceMap[language];
  if (!voice) {
    console.log(`No voice mapping for language: ${language}`);
    return;
  }

  // Sanitize the key for filename
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

  // Check if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping existing file: ${outputPath}`);
    return;
  }

  const params = {
    Text: text.split("(")[0].trim(), // Remove pronunciation guides
    OutputFormat: "mp3",
    VoiceId: voice,
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    fs.writeFileSync(outputPath, data.AudioStream);
    console.log(`Generated: ${outputPath}`);
  } catch (err) {
    console.error(
      `Error generating audio for ${language}/${category}/${key}:`,
      err
    );
  }
}

async function main() {
  for (const [langCode, langData] of Object.entries(languageData)) {
    // Generate English audio for each category
    for (const [key, value] of Object.entries(langData.words)) {
      await generateAudio(key, "en", "words", key);
      await generateAudio(value, langCode, "words", key);
      await sleep(100); // Add delay between requests
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
