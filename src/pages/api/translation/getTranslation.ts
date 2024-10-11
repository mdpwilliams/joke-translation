import { type NextApiRequest, NextApiResponse } from "next";

const TRANSLATION_API_URL = "https://api-free.deepl.com/v2";

// would love for ths request to have specific typescript casting
export default async function getTranslation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.DEEPL_API_KEY) {
    return res.status(500).json({ message: "Missing API key" });
  }

  const { text, targetLanguage } = req.body;

  // Validate request body
  if (!text || !targetLanguage) {
    return res
      .status(400)
      .json({ message: "Text and target language are required" });
  }

  const translationHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
  });

  try {
    const translationResponse = await fetch(
      `${TRANSLATION_API_URL}/translate`,
      {
        method: "POST",
        body: JSON.stringify({
          text: text, // text must be an array of strings
          target_lang: targetLanguage, // This should be an enum
        }),
        headers: translationHeaders,
      },
    );

    if (!translationResponse.ok) {
      const errorBody = await translationResponse.json(); // Capture more detailed error messages
      return res
        .status(translationResponse.status)
        .json({ message: errorBody.message || "Failed to fetch translations" });
    }

    const jsonBody = await translationResponse.json();

    return res.status(200).json(jsonBody);
  } catch (error) {
    console.error("Translation API error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
