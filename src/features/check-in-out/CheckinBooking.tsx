import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const CheckinBooking = () => {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();

  const [comfirmPaid, setComfirmPaid] = useState<boolean>(false);

  const handleCheckin = () => {
    if (!comfirmPaid) return;
    checkin(booking?.id ?? 0);
  };

  useEffect(() => {
    booking && setComfirmPaid(booking.isPaid);
  }, [booking]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}

      <Box>
        <Checkbox
          id="confirm"
          checked={comfirmPaid}
          disabled={comfirmPaid || isCheckingIn}
          onChange={() => setComfirmPaid((cur) => !cur)}
        >
          I confirm that {booking?.guests.fullName} has paid the total amount of{" "}
          {formatCurrency(booking?.totalPrice ?? 0)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!comfirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{booking?.id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;
