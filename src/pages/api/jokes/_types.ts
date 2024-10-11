import type { LanguageOptions, BlacklistFlags } from "@/types";

export interface JokeRequestParameters {
  amount: number;
  blacklistFlags: BlacklistFlags[];
  lang: LanguageOptions;
  contains?: string;
}
