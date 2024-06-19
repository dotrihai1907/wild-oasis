import { useState } from "react";
import styled from "styled-components";
import { ICabin } from "../../services/apiModel";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import EditCabinForm from "./EditCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

type CabinRowType = {
  cabin: ICabin;
};

const CabinRow = ({ cabin }: CabinRowType) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    image,
    regularPrice,
    discount,
    description,
  } = cabin;

  const { isDeleting, deleteAction } = useDeleteCabin();
  const { isCreating, createAction } = useCreateCabin();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleDuplicate = () => {
    createAction({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  };

  return (
    <>
      <TableRow role="row">
        <Image src={image || undefined} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <Discount>&mdash;</Discount>
        )}
        <Action>
          <Button size="small" disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </Button>
          <Button size="small" onClick={() => setIsEdit((cur) => !cur)}>
            <HiPencil />
          </Button>
          <Button
            size="small"
            disabled={isDeleting}
            onClick={() => deleteAction(cabinId)}
          >
            <HiTrash />
          </Button>
        </Action>
      </TableRow>
      {isEdit && <EditCabinForm editCabin={cabin} />}
    </>
  );
};

export default CabinRow;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Image = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Action = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;
