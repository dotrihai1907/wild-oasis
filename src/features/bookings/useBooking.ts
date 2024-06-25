import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(Number(bookingId ?? 0)),
    retry: false,
  });

  return {
    isLoading,
    booking,
  };
};
