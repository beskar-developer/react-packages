/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-style */
export function AutoBind<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  const methodName = context.name;

  if (context.private)
    throw new TypeError(`'AutoBound' cannot decorate private properties like ${String(methodName)}.`);

  context.addInitializer(function () {
    (this as any)[methodName] = target.bind(this);
  });
}
