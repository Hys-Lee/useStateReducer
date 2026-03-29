# use-state-reducer

A custom React hook that implements the **State Reducer Pattern**.
It works exactly like `useState`, but allows you to intercept and modify state updates using an optional `externalUpdater`.

## 📦 Installation

```bash
npm install use-state-reducer
# or
yarn add use-state-reducer
# or
pnpm add use-state-reducer

🤔 Why use this?

When building highly reusable components, you sometimes want to allow users of your component to control or restrict its internal state. useStateReducer allows you to pass an externalUpdater to intercept the state changes before they are applied.
🚀 Usage
Basic Usage (Same as useState)

If you don't provide an externalUpdater, it behaves exactly like React's useState.
code Tsx

import { useStateReducer } from 'use-state-reducer';

function Counter() {
  const[count, setCount] = useStateReducer(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

Advanced Usage: Intercepting State Updates

You can use externalUpdater to restrict the state. For example, limiting the maximum count to 10:
code Tsx

import { useStateReducer } from 'use-state-reducer';

function LimitedCounter() {
  const[count, setCount] = useStateReducer(0, (prevState, nextState) => {
    // Restrict the state from exceeding 10
    if (nextState > 10) {
      return prevState;
    }
    return nextState;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```
