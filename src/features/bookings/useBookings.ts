import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ROW_PER_PAGE } from "../../utils/constants";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  //sortBy
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const { isLoading, data } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // pre-fetching
  const pageCount = Math.ceil((data?.count ?? 0) / ROW_PER_PAGE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return {
    isLoading,
    bookings: data?.data,
    count: data?.count,
  };
};
