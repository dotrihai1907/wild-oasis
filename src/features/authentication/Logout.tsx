import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { isLoading, logoutAction } = useLogout();

  const handleLogout = () => {
    logoutAction();
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
