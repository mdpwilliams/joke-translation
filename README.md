# Joke and Translation App

## Running in Development

First, install dependencies

```bash
npm install

yarn install

pnpm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup translation API key

Add a `.env.local` to the root of your project with your `DeepL` API key.

## Technology choices

I chose to use:

- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)

My intention here was to simplify the front end development process and take advantage of existing library to build out a robust application and leverage the library's ability to handle form validation. My future intentions are to use Zod to better integrate with TypeScript and improve validation boundaries.

## Future plans

I would like to add a number of features that I think would smooth out the experience.

- Component-centric tests, to improve understanding of the intention of the component
- Feature flags, and an endpoint to show feature availability, handle a case were the translation endpoint isn't available or ready
- Expand usage of the JokeForm to allow translation after fetch of a joke. It would be great to just offer "get this joke in X language" rather than have a two-part fetch and then translate.
