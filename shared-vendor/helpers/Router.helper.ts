/* eslint-disable @typescript-eslint/no-explicit-any */

const convertToLazyLoad = (module: any) => {
  const { default: Component } = module;

  return {
    Component,
  };
};

const lazyRoute = (module: () => Promise<any>) => () => module().then(convertToLazyLoad);

export default lazyRoute;
