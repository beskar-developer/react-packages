/* eslint-disable func-style */
export const ErrorMessage = (errorMessage: string, showToast: boolean = true) =>
  function <This, Args extends unknown[], Return>(target: (this: This, ...args: Args) => Promise<Return>) {
    async function replacementMethod(this: This, ...args: Args): Promise<Return> {
      try {
        const result = await target.call(this, ...args);

        return result;
      } catch (error) {
        console.error(error);

        if (showToast) toast.error(errorMessage);

        throw error;
      }
    }

    return replacementMethod;
  };
