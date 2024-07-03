import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useChangeMode } from "../context/ModeContext";

const ChangeModeToogle = () => {
  const { isDarkMode, toogleMode } = useChangeMode();

  return (
    <ButtonIcon onClick={toogleMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default ChangeModeToogle;
