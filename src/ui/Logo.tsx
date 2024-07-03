import styled from "styled-components";
import { useChangeMode } from "../context/ModeContext";

function Logo() {
  const { isDarkMode } = useChangeMode();

  return (
    <StyledLogo>
      <StyledImage
        src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;

const StyledLogo = styled.div`
  text-align: center;
`;

const StyledImage = styled.img`
  height: 9.6rem;
  width: auto;
`;
