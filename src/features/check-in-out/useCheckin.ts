import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { IBooking, IUpdateBooking } from "../../services/apiModel";

type UpdateBookingProps = {
  bookingId: number;
  breakfast?: IUpdateBooking;
};

export const useCheckin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: UpdateBookingProps) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data: IBooking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true } as InvalidateQueryFilters);

      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return {
    checkin,
    isCheckingIn,
  };
};
