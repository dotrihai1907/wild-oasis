import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/apiAuth";

export const useSignup = () => {
  const { mutate: signupAction, isPending: isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account successfully created");
    },
  });

  return {
    signupAction,
    isLoading,
  };
};
