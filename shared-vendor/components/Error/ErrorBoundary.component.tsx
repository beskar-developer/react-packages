import { type FallbackProps, ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import ErrorSvg from "@shared-vendor/assets/svg/error.svg?react";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message: string = error?.message ?? error;

  return (
    <div className="app-container flex size-full items-center justify-center p-0">
      <Card className="flex flex-col items-center gap-8 p-8">
        <ErrorSvg className="size-60" />

        <span className="text-error-400 text-xl font-extrabold">مشکلی پیش آمده است...</span>

        <span className="text-error-300 font-semibold">{message}</span>

        <BaseButton className="w-80" onClick={resetErrorBoundary}>
          تلاش دوباره
        </BaseButton>
      </Card>
    </div>
  );
};

export const ErrorBoundary = ({ children }: FragmentProps) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};
