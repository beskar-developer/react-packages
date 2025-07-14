export const useNotFoundPage = () => {
  const navigate = useNavigate();

  const redirectToRoot = () => navigate("/");

  return { redirectToRoot };
};
