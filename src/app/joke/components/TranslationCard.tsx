"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { targetLanguageOptions } from "@/app/hooks/useGetTranslations";
import { Card, CardContent, MenuItem, Select } from "@mui/material";
import { useGetTranslation } from "@/app/hooks/useGetTranslations";

export default function TranslationCard({ text }: { text: string[] }) {
  const { getTranslation } = useGetTranslation();
  const [translations, setTranslations] = useState([]);
  const [targetTranslationLanguage, setTargetTranslationLanguage] =
    useState<targetLanguageOptions>(targetLanguageOptions.Spanish);

  // reset translation in the event that the joke changes
  useEffect(() => {
    setTranslations([]);
  }, [text]);

  // early return in the event that we don't have a joke
  if (!text) return;

  const handleTranslateJoke = () => {
    getTranslation({
      text,
      targetLanguage: targetTranslationLanguage,
    }).then(({ translations }) => {
      setTranslations(translations.map((translation) => translation.text));
    });
  };

  return (
    <>
      {translations && (
        <Card variant="outlined">
          <CardContent>{translations}</CardContent>
        </Card>
      )}
      <Select
        label="Translate to language"
        value={targetTranslationLanguage}
        onChange={(event) => {
          setTargetTranslationLanguage(event.target.value);
        }}
      >
        <MenuItem>Select language</MenuItem>
        {Object.keys(targetLanguageOptions).map((targetLanguageOption) => {
          return (
            <MenuItem
              key={targetLanguageOption}
              value={targetLanguageOptions[targetLanguageOption]}
            >
              {targetLanguageOption}
            </MenuItem>
          );
        })}
      </Select>
      <Button onClick={handleTranslateJoke}>
        Fetch translation for this Joke
      </Button>
    </>
  );
}
