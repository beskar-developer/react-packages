const checkComposedPath = <T extends HTMLElement | null>(element: T, event: MouseEvent) =>
  element && (event.target === element || event.composedPath().includes(element));

export const useOutsideClick = <T extends HTMLElement>(
  callback: (...args: unknown[]) => void,
  capture = true,
) => {
  const ref = useRef<T>(null);

  const onClick = (event: MouseEvent) => {
    const element = ref.current;

    const isInsideClicked = checkComposedPath(element, event);

    if (isInsideClicked) return;

    callback();
  };

  useEffect(() => {
    document.addEventListener("click", onClick, capture);

    return () => document.removeEventListener("click", onClick, capture);
  }, []);

  return ref;
};
