import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";

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
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      toast.success("Successfully logged in");
    },
    onError: () => toast.error("Provided email or password are invalid"),
  });

  return {
    loginAction,
    isLoading,
  };
};
