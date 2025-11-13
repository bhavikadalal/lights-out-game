# lights-out-gameDiscussion Questions
1. Why is “lifting state up” (from Grid to Game) a necessary pattern for implementing the “undo” feature?

Lifting state up ensures that the Game component owns the authoritative state of the board and its history. If the Grid managed its own state, the Game would have no way to track past moves or restore previous states. By centralizing the state in Game, we can:
a) Maintain a history array of past board configurations.
b) Implement features like Undo by simply reverting to a previous snapshot.
c) Keep the Grid purely presentational, making it easier to test and reuse.


2. Explain the importance of immutability when you update the lights state array. What bug might occur if you mutated the array directly?

React relies on immutability to detect changes and trigger re-renders. When we update the lights array, we must create a new copy instead of mutating the existing one. If we mutated the array directly:
a) React might not detect the change, so the UI wouldn’t update.
b) The history of moves would be corrupted, because all entries in the history would point to the same mutated array.
c) Undo would fail, since past states wouldn’t be preserved correctly.


3. How did you structure your components? Discuss the flow of props and state in your application.

The application is structured into three main components:
a)Game: Holds all state (lights, moves, history, hintIndex). It contains the game logic (toggle, undo, reset, help) and passes props down.
b)Grid: Receives the current lights array and the onLightClick handler as props. It maps over the array and renders individual Light components.
c)Light: A simple presentational component. It receives isLit, onClick, and isHint as props, and renders a square with the correct style.

Flow of props and state:
a)State lives in Game.
b)Game passes lights and event handlers down to Grid.
c)Grid passes individual light values and click handlers down to Light.
d)User interactions bubble back up to Game, which updates state and re-renders the children.

4. What was the most challenging part of implementing the click logic (toggling the light and its neighbors)? If you had more time, what feature would you add?

The most challenging part was correctly calculating the neighbor indices (up, down, left, right) while avoiding out-of-bounds errors at the grid edges. It required careful handling of row and column math to ensure only valid neighbors were toggled.
If I had more time, I would add:
a)A solver algorithm that computes the optimal sequence of moves (using linear algebra over GF(2)).
b)A hint system that suggests the next best move instead of a random lit square.
c)A difficulty selector (easy, medium, hard) that controls how scrambled the initial board is.
