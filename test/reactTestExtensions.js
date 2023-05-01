import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

export let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");

  document.body.replaceChildren(container);
};

/**
 * Starting in React 18, the render function is asynchronous: the function call will return before React has modified the DOM.
 * React provides a helper function for our tests that pauses until asynchronous rendering has completed (act).
 * More info about act (Understanding act)
 * https://reacttdd.com/understanding-act
 */
export const render = (component) =>
  act(() => ReactDOM.createRoot(container).render(component));

export const click = (element) => act(() => element.click());

export const element = (selector) => document.querySelector(selector);

export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));

export const typesOf = (elements) => elements.map((element) => element.type);

export const textOf = (elements) =>
  elements.map((element) => element.textContent);
