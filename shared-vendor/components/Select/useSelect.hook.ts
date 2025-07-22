import type { ISelect, Option } from "@shared-vendor/components/Select/Select.type";

import {
  autoUpdate,
  flip,
  type Middleware,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

const takeParentWidth: Middleware = {
  name: "takeReferenceWidth",
  fn({ rects, elements, ...context }) {
    elements.floating.style.width = rects.reference.width + "px";

    return { ...context, elements, rects };
  },
};

export const useSelect = <T extends string>({
  options = [],
  value,
  name,
  label,
  disabled,
  onChange,
}: ISelect<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift(), takeParentWidth],
    whileElementsMounted: autoUpdate,
    placement: "bottom-end",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const selectedOption = findByKey(options, value, {
    keyName: "value",
  });
  const selectOption = (option: Option<T>) => {
    onChange(option.value);

    setIsOpen(false);
  };

  const isActive = (option: Option<T>) => option.value === selectedOption?.value;

  const referenceProps = {
    readOnly: true,
    value: selectedOption?.label ?? "",
    containerRef: refs.setReference,
    name: `label-${name}`,
    label,
    disabled,
    ...getReferenceProps(),
  };
  const floatingProps = {
    ref: refs.setFloating,
    style: floatingStyles,
    ...getFloatingProps(),
  };

  return {
    referenceProps,
    floatingProps,
    isOpen,
    selectOption,
    isActive,
  };
};
