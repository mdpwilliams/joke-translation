import { BlacklistFlags, LanguageOptions } from "@/types";
import { convertParamsToStringLiteral } from "@/utils/convertParamsToStringLiteral";
import { useCallback } from "react";

export default function useGetJoke() {
  const getJoke = useCallback(
    ({
      blacklistFlags,
      lang,
      contains,
    }: {
      blacklistFlags: BlacklistFlags[];
      lang: LanguageOptions;
      contains?: string;
    }) => {
      const urlParams = convertParamsToStringLiteral({
        blacklistFlags,
        lang,
        contains,
      });
      const fetchData = fetch(
        // this needs to pull the url down if it's in production, otherwise use dev url
        `${window.location.origin}/api/jokes/getJokes${urlParams}`,
        {
          cache: "no-cache",
        },
      ).then((data) => data.json());

      return fetchData;
    },
    [],
  );

  return {
    getJoke,
  };
}
