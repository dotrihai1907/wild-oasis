import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

const Logout = () => {
  const { isLoading, logoutAction } = useLogout();

  const handleLogout = () => {
    logoutAction();
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <Spinner />}
    </ButtonIcon>
  );
};

export default Logout;
