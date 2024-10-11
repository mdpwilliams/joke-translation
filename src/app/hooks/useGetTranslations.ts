import { useCallback } from "react";

export enum targetLanguageOptions {
  Bulgarian = "BG",
  Czech = "CS",
  Danish = "DA",
  German = "DE",
  Greek = "EL",
  "English (British)" = "EN-GB",
  "English (American)" = "EN-US",
  Spanish = "ES",
  Estonian = "ET",
  Finnish = "FI",
  French = "FR",
  Hungarian = "HU",
  Indonesian = "ID",
  Italian = "IT",
  Japanese = "JA",
  Korean = "KO",
  Lithuanian = "LT",
  Latvian = "LV",
  "Norwegian (Bokmål)" = "NB",
  Dutch = "NL",
  Polish = "PL",
  "Portuguese (Brazilian)" = "PT-BR",
  "Portuguese (European)" = "PT-PT",
  Romanian = "RO",
  Russian = "RU",
  Slovak = "SK",
  Slovenian = "SL",
  Swedish = "SV",
  Turkish = "TR",
  Ukrainian = "UK",
  "Chinese (simplified)" = "ZH",
}

export function useGetTranslation() {
  const getTranslation = useCallback(
    ({
      text,
      targetLanguage,
    }: {
      text: string[];
      targetLanguage: targetLanguageOptions;
    }) => {
      const fetchData = fetch(
        `${window.location.origin}/api/translation/getTranslation`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            text,
            targetLanguage,
          }),
        },
      ).then((data) => data.json());

      return fetchData;
    },
    [],
  );

  return {
    getTranslation,
  };
}
