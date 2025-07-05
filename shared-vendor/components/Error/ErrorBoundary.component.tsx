import { type FallbackProps, ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import ErrorSvg from "@shared-vendor/assets/svg/error.svg?react";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message: string = error?.message ?? error;

  return (
    <div className="app-container flex size-full items-center justify-center">
      <Card className="flex flex-col items-center gap-8 p-8">
        <ErrorSvg className="size-60" />

        <span className="text-xl font-extrabold text-red-400">مشکلی پیش آمده است...</span>

        <span className="font-semibold text-red-300">{message}</span>

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
