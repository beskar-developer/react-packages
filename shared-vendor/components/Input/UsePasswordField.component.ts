import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const usePasswordField = () => {
  const [type, setType] = useState("password");
  const isPasswordType = type === "password";

  const IconComponent = isPasswordType ? AiFillEye : AiFillEyeInvisible;

  const toggleType = () => setType(isPasswordType ? "text" : "password");

  return { type, IconComponent, toggleType };
};
