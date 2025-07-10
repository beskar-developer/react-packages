interface ILoadingContainer extends ComponentProps<"div"> {
  loading?: boolean;
  message?: string;
}

export const LoadingContainer = ({ loading, children, ...props }: ILoadingContainer) => {
  if (loading) return <LoadingMessage {...props} />;

  return children;
};
