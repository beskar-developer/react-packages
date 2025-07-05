interface Props {
  message?: string;
}

export const FullPageLoading = ({ message }: Props) => {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Loading className="size-12 text-indigo-500" />

      <span className="font-bold">{message}</span>
    </div>
  );
};
