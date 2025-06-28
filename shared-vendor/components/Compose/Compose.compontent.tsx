interface Props {
  components: Array<JSXElementConstructor<PropsWithChildren<unknown>>>;
  children: ReactNode;
}

export const Compose = ({ components = [], children }: Props) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
