import type { NextApiRequest, NextApiResponse } from "next";
import { BlacklistFlags, LanguageOptions } from "@/types";
import { type JokeRequestParameters } from "./_types";
import { convertParamsToStringLiteral } from "@/utils/convertParamsToStringLiteral";

const JOKE_API_URL = "https://v2.jokeapi.dev/";

const DEFAULT_OPTIONS: JokeRequestParameters = {
  amount: 1,
  blacklistFlags: Object.values(BlacklistFlags),
  lang: LanguageOptions.en,
};

export default async function getJokeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const jokeParameters = convertParamsToStringLiteral({
    ...DEFAULT_OPTIONS,
    ...req.query,
  });

  const jokeResponse = await fetch(
    `${JOKE_API_URL}joke/${req.query.category ?? "Any"}${jokeParameters}`,
  );

  if (!jokeResponse.ok) {
    throw new Error("Failed to fetch information");
  }

  const jsonBody = await jokeResponse.json();

  if (jsonBody.error) {
    return res.status(500).json(jsonBody);
  }

  return res.status(200).json(jsonBody);
}
