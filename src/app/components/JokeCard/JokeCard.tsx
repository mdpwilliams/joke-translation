import { type Joke } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface JokeCardProps {
  joke: Joke;
}

export default function JokeCard({ joke }: JokeCardProps) {
  const jokeBody =
    joke.type === "twopart" ? `${joke.setup} ${joke.delivery}` : joke.joke;

  return (
    <Card variant="outlined">
      <CardContent>{jokeBody}</CardContent>
    </Card>
  );
}
