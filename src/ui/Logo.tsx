import styled from "styled-components";

function Logo() {
  return (
    <StyledLogo>
      <StyledImage src="/logo-light.png" alt="Logo" />
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
