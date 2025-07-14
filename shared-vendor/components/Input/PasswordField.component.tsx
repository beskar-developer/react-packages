import type { InputProps } from "./TextField.type";

export const PasswordField = (props: InputProps) => {
  const { type, IconComponent, toggleType } = usePasswordField();

  return <TextField {...props} type={type} appendIcon={<IconComponent onClick={toggleType} />} />;
};
