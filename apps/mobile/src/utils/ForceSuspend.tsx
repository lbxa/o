/**
 * Placing this component anywhere inside a Suspense boundary will force
 * it to suspend. Very useful for testing suspense fallback views.
 */
export const ForceSuspend = () => {
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const NOOP = () => {};
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Promise(NOOP);
  }
  return null;
};
