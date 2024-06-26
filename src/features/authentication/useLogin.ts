import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginProps = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginAction, isPending: isLoading } = useMutation({
    mutationFn: (props: LoginProps) => login(props),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"] as QueryFilters, user.user);
      navigate("/dashboard");
      toast.success("Successfully logged in");
    },
    onError: () => toast.error("Provided email or password are invalid"),
  });

  return {
    loginAction,
    isLoading,
  };
};
