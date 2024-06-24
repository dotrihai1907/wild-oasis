/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
import styled from "styled-components";

type TableContextType = {
  columns: string;
};

type TableProps = {
  children: React.ReactNode;
  columns: string;
};

type HeaderRowProps = {
  children: React.ReactNode;
};

type BodyProps = {
  data?: any[];
  render: (value: any) => JSX.Element;
};

type CommonRowProps = {
  columns: string;
};

const InitTableContext: TableContextType = {
  columns: "",
};

const TableContext = createContext<TableContextType>(InitTableContext);

const Table = ({ children, columns }: TableProps) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }: HeaderRowProps) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="header" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }: HeaderRowProps) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

const Body = ({ data, render }: BodyProps) => {
  if (!data?.length) return <Empty children="No data to show at the moment" />;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
