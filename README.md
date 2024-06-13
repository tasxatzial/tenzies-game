# Tenzies game

A game with a very simple purpose: Roll and match all ten dice to the same number as quickly as possible.

This is a project from the React basics module of the [Frontend Career Path](https://scrimba.com/learn/frontend) course on [Scrimba](https://scrimba.com).

## Implementation

I've written the app from the ground up, so it has very few things in common with the course implementation. I've also added many extra things and improved upon others. Here's a non-exhaustive list of the changes:

* App is responsive.
* User can start a new game, or stop a game that is already in progress.
* Dice are represented by dots rather than just numbers.
* A message is displayed when the game is won.
* A timer has been added.
* The best time is both displayed and stored in localStorage, ensuring it persists even when the page is reloaded.
* A countdown from 3, 2, 1 has been added at the start of each game.
* The instructions clearly state how to win the game.
* A custom hook is used to make Confetti properly respond to window resize events.

## Dependencies

This is a basic React project created with Vite. The following dependencies will be installed via `npm install`:

* [react-confetti](https://www.npmjs.com/package/react-confetti)

## Run locally

Install the required dependencies:

```bash
npm install
```

Run the development version:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Build & serve the production version:

```bash
npm run serve
```

## Screenshots

See [screenshots](screenshots/).
