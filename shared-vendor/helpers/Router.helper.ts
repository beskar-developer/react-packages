/* eslint-disable @typescript-eslint/no-explicit-any */

const convertToLazyLoad = (module: any) => {
  const { default: Component } = module;

  return {
    Component,
  };
};

export const lazyRoute = (module: () => Promise<any>) => () => module().then(convertToLazyLoad);

export const createSetSearchParam =
  <T>(setSearchParams: SetURLSearchParams, key: string) =>
  (value: T) =>
    setSearchParams((params) => {
      const stringValue = String(value);

      if (stringValue) params.set(key, stringValue);
      else params.delete(key);

      return params;
    });
