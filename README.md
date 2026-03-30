# use-state-reducer

A versatile React hook that bridges the gap between **Uncontrolled State**, **Controlled State**, and the **State Reducer Pattern**.  
It allows components to manage their own state while giving parents the power to intercept, modify, or even cancel state updates.

## 📦 Installation

```bash
npm install use-state-reducer
```

## ✨ Features

- **Uncontrolled by Default:** Works like a standard `useState` if no external value is provided.
- **Fully Controllable:** Syncs perfectly with external props when a `value` is passed.
- **State Interception:** Use `externalUpdater` to implement validation, logging, or custom transformation logic before the state actually changes.

---

## 🚀 Usage Examples

### 1. Uncontrolled Mode (Basic)

Use it just like `useState`. The component manages its own state.

```tsx
const [state, setState] = useStateReducer(0);
// state is managed internally
```

### 2. Controlled Mode (Sync with Parent)

When a `value` prop is passed, the hook follows the parent's state.

```tsx
function Parent() {
  const [val, setVal] = useState("Hello");
  return <Child value={val} onValueChange={setVal} />;
}

function Child({ value, onValueChange }) {
  const [state, setState] = useStateReducer("", value, (prev, next) => {
    onValueChange(next); // Sync back to parent
    return next;
  });

  return <input value={state} onChange={(e) => setState(e.target.value)} />;
}
```

### 3. Interception Mode (The "Interrupt" Pattern)

This is where this hook shines. Even in **Uncontrolled** mode, the parent can "intercept" the update to apply logic, like a **State Reducer**.

```tsx
function LimitedCounter() {
  const [state, setState] = useStateReducer(
    0,
    undefined, // Keep it uncontrolled
    (prev, next) => {
      // 🛡️ Interception Logic: Max value is 10
      if (next > 10) {
        alert("Cannot exceed 10!");
        return prev; // Return previous state to "cancel" the update
      }

      console.log(`Changing from ${prev} to ${next}`);
      return next; // Apply the update
    },
  );

  return <button onClick={() => setState(state + 1)}>{state}</button>;
}
```

---

## 📚 API Reference

```ts
const [state, setState] = useStateReducer(initValue, value, externalUpdater?);
```

### Parameters

| Parameter         | Type                             | Description                                                                                                             |
| :---------------- | :------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `initValue`       | `T`                              | The initial state (used in Uncontrolled mode).                                                                          |
| `value`           | `T \| undefined`                 | The external state. If not `undefined`, the hook enters **Controlled** mode.                                            |
| `externalUpdater` | `(prev, next) => T \| undefined` | _(Optional)_ A function that intercepts the update. Returns the next state to apply, or `undefined` to skip the update. |

### Returns

- `[state, setState]`:
  - `state`: The current active state (internal if uncontrolled, external if controlled).
  - `setState`: A function to trigger a state update. It automatically handles the `externalUpdater` logic and checks for control status.

---

## 💡 Why use this over `useControllableState`?

Standard controllable hooks usually only switch between internal/external state. `useStateReducer` adds a **Middleware Layer** (`externalUpdater`).

This allows you to:

1. **Validate** state changes before they happen.
2. **Transform** data (e.g., forcing uppercase on an input).
3. **Trigger Side Effects** (like logging or analytics) exactly when the state is requested to change, without worrying about React's render-cycle purity issues.

## 📄 License

MIT
