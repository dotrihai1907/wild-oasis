import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { IUpdateBooking } from "../../services/apiModel";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";

const CheckinBooking = () => {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoadingSettings } = useSettings();

  const [comfirmPaid, setComfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);

  const handleCheckin = () => {
    if (!comfirmPaid) return;
    if (addBreakfast) {
      const breakfast: IUpdateBooking = {
        hasBreakfast: true,
        extraPrice: optionalBreakfastPrice,
        totalPrice: (booking?.totalPrice ?? 0) + optionalBreakfastPrice,
      };

      checkin({ bookingId: booking?.id ?? 0, breakfast });
    } else {
      checkin({ bookingId: booking?.id ?? 0 });
    }
  };

  const optionalBreakfastPrice = useMemo(() => {
    return (
      (settings?.breakfastPrice ?? 0) *
      (booking?.numNights ?? 0) *
      (booking?.numGuests ?? 0)
    );
  }, [booking, settings]);

  useEffect(() => {
    if (booking) {
      setComfirmPaid(booking.isPaid);
      setAddBreakfast(booking.hasBreakfast);
    }
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}

      {!booking?.hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={false}
            onChange={() => {
              setAddBreakfast((cur) => !cur);
              setComfirmPaid(false);
            }}
          >
            Want to add breakfast for {optionalBreakfastPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={comfirmPaid}
          disabled={comfirmPaid || isCheckingIn}
          onChange={() => setComfirmPaid((cur) => !cur)}
        >
          I confirm that {booking?.guests.fullName} has paid the total amount of{" "}
          {!addBreakfast || booking?.hasBreakfast
            ? formatCurrency(booking?.totalPrice ?? 0)
            : `${formatCurrency(
                (booking?.totalPrice ?? 0) + optionalBreakfastPrice
              )} (${formatCurrency(
                booking?.totalPrice ?? 0
              )} + ${formatCurrency(optionalBreakfastPrice)})`}
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
