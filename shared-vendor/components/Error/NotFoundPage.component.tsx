export const NotFoundPage = () => {
  const { redirectToRoot } = useNotFoundPage();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <NotFound className="size-auto" message="صفحه مورد نظر شما یافت نشد" />

      <BaseButton variant="tonal" onClick={redirectToRoot}>
        برگشت به صفحه اصلی
      </BaseButton>
    </div>
  );
};
