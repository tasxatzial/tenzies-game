# Tenzies game

A project from the React basics module of the [Frontend Career Path](https://scrimba.com/learn/frontend) course on [Scrimba](https://scrimba.com).

## Implementation

While my implementation follows the course content loosely, it isn't an exact match of the design or the implementation shown in the course. I've made some intentional changes, with the aim of improving upon the provided design. Here's a non-exhaustive list of the updates:

* Game is responsive.
* Game is accessible + screen reader friendly.
* Option to start a new game while a game is in progress.
* Dice are represented by dots, whereas in the course, the dice are represented by simple numbers.
* A message is displayed when the game is won.
* A message is displayed to start a new game when the current game is won and the roll button is clicked.
* Game state is saved in localStorage.
* The instructions clearly state when the game is won.
* A custom hook was used to make Confetti properly respond to window resize events.

## Dependencies

This is a basic React project created with Vite. The following dependencies will be installed via `npm install`:

* [nanoid](https://www.npmjs.com/package/nanoid)
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
