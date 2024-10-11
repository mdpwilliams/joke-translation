"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";

import JokeCard from "@/app/components/JokeCard/JokeCard";
import useGetJokes from "@/app/hooks/useGetJokes";

import { type FormInputs, JokeForm } from "./components/JokeForm";
import { Alert, Divider } from "@mui/material";
import TranslationCard from "./components/TranslationCard";

export default function Page() {
  const [currentJoke, setCurrentJoke] = useState(null); // I would like to use a Joke type here.
  const [fetchError, setFetchError] = useState(null);
  const { getJoke } = useGetJokes();

  const handleFetchJoke = (formData: FormInputs) => {
    getJoke({
      blacklistFlags: formData.blacklistFlags,
      lang: formData.lang,
      contains: formData.contains,
    }).then((data) => {
      if (data.error) {
        setCurrentJoke(null);
        setFetchError(data.message);
      } else {
        setCurrentJoke(data);
        setFetchError(null);
      }
    });
  };

  return (
    <Grid container spacing={4}>
      {fetchError ? (
        <Grid size={12}>
          <Alert severity="error">{fetchError}</Alert>
        </Grid>
      ) : null}
      <Grid size={6}>
        <Card variant="outlined">
          <CardContent>
            <JokeForm onSubmit={handleFetchJoke} />
          </CardContent>
        </Card>
      </Grid>
      {currentJoke && (
        <Grid size={6}>
          <JokeCard joke={currentJoke} />
          {/* feature flag from the back end to guard this component from usage in the event it isn't set up or enabled. */}
          <Divider />
          <TranslationCard
            text={
              currentJoke.type === "twopart"
                ? [currentJoke.setup, currentJoke.delivery]
                : [currentJoke.joke]
            }
          />
        </Grid>
      )}
    </Grid>
  );
}
