import Link from "next/link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import JokeCard from "./components/JokeCard/JokeCard";
import Typography from "@mui/material/Typography";

export default async function Home() {
  const getJokeData = async () => {
    const data = await fetch("http://localhost:3000/api/jokes/getJokes", {
      // we don't want to cache this, otherwise we will receive the same joke on repeat.
      cache: "no-cache",
    });
    return data.json();
  };

  const response = await getJokeData();

  return (
    <Container>
      <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Typography variant="h2" component="h2">
          Welcome!
        </Typography>
        <JokeCard joke={response} />
        <Link href="joke">
          <Button variant="contained">Get your own!</Button>
        </Link>
      </Stack>
    </Container>
  );
}
