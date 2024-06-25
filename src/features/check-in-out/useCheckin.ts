import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { IBooking } from "../../services/apiModel";

export const useCheckin = () => {
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data: IBooking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return {
    checkin,
    isCheckingIn,
  };
};
