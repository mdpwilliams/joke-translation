export interface SingleJoke {
  type: "single";
  joke: string;
}

export interface TwoPartJoke {
  type: "twopart";
  setup: string;
  delivery: string;
}

export type Joke = (SingleJoke | TwoPartJoke) & {
  id: number;
  category:
    | "Any"
    | "Programming"
    | "Misc"
    | "Dark"
    | "Pun"
    | "Spooky"
    | "Christmas";
};
