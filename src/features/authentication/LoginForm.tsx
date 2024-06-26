import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { ACCOUNT_DATA } from "../../utils/constants";

const { EMAIL, PASSWORD } = ACCOUNT_DATA;

const LoginForm = () => {
  const { isLoading, loginAction } = useLogin();

  const [email, setEmail] = useState<string>(EMAIL);
  const [password, setPassword] = useState<string>(PASSWORD);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    loginAction({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          id="email"
          type="email"
          value={email}
          disabled={isLoading}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          id="password"
          type="password"
          value={password}
          disabled={isLoading}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="">
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
