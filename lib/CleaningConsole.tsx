export const CleaningConsole = () => {
  const originalConsoleError = console.error;
  const jsDomCssError = "Error: Could not parse CSS stylesheet";
  const reactError =
    "intercept-console-error.js:51 Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.";

  console.error = (...params) => {
    if (
      !params.find(
        (p) =>
          p.toString().includes(jsDomCssError) ||
          p.toString().includes(reactError)
      )
    ) {
      originalConsoleError(...params);
    }
  };
};
