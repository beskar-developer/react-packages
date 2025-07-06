/* eslint-disable func-style */
type Options = Partial<{
  error: string;
  success: string;
  showToast: boolean;
}>;

export const Message = ({ error: errorMessage, success: successMessage, showToast = true }: Options = {}) =>
  function <This, Args extends unknown[], Return>(target: (this: This, ...args: Args) => Promise<Return>) {
    async function replacementMethod(this: This, ...args: Args): Promise<Return> {
      try {
        const result = await target.call(this, ...args);

        if (showToast && successMessage) toast.success(successMessage);

        return result;
      } catch (error) {
        console.error(error);

        if (showToast && errorMessage) toast.error(errorMessage);

        throw error;
      }
    }

    return replacementMethod;
  };
