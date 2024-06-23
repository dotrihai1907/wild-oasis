import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

type MenusContextType = {
  openId: number;
  close: () => void;
  position: Position | null;
  open: React.Dispatch<React.SetStateAction<number>>;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
};

type MenusProps = {
  children: React.ReactNode;
};

type ToogleProps = {
  id: number;
};

type ListProps = {
  id: number;
  children: React.ReactNode;
};

type ButtonProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

type Position = {
  x: number;
  y: number;
};

type StyleListProps = {
  position: Position | null;
};

const InitMenusContext: MenusContextType = {
  openId: 0,
  position: null,
  open: () => {},
  close: () => {},
  setPosition: () => {},
};

const MenusContext = createContext<MenusContextType>(InitMenusContext);

const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState<number>(0);
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId(0);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Toogle = ({ id }: ToogleProps) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  useEffect(() => {
    const handleScroll = () => {
      if (openId) {
        close();
        document.removeEventListener("wheel", handleScroll);
      }
    };

    if (openId) document.addEventListener("wheel", handleScroll);

    return () => document.removeEventListener("wheel", handleScroll);
  }, [close, openId]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - (rect?.width ?? 0) - (rect?.x ?? 0),
      y: (rect?.y ?? 0) + (rect?.height ?? 0) + 8,
    });

    !openId || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }: ListProps) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, onClick, icon }: ButtonProps) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Toogle = Toogle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyleListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
