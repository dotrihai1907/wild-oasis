import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ROW_PER_PAGE } from "../utils/constants";

type PaginationButtonProps = {
  active?: boolean;
};

type PaginationProps = {
  count: number;
};

const Pagination = ({ count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.ceil(count / ROW_PER_PAGE);

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const nextPage = () => {
    const next = currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage - 1;
    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * ROW_PER_PAGE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * ROW_PER_PAGE}
        </span>{" "}
        of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton disabled={currentPage === 1} onClick={prevPage}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <HiChevronRight /> <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
