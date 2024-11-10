import { ROW_PER_PAGE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import {
  IBooking,
  IBookingsAfterDate,
  IGetBookings,
  IUpdateBooking,
} from "./apiModel";
import supabase from "./supabase";

type BookingProps = {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
};

export const getBookings = async ({ filter, sortBy, page }: BookingProps) => {
  let query = supabase
    .from("bookings")
    .select("*,  cabins(name), guests(fullName, email)", {
      count: "exact",
    });

  if (filter) query = query.eq(filter.field, filter.value);

  const from = (page - 1) * ROW_PER_PAGE;
  const to = from + ROW_PER_PAGE - 1;

  query = query
    .order(sortBy.field, { ascending: sortBy.direction === "asc" })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error("Bookings could  not be loaded");

  return { data, count } as IGetBookings;
};

export const getBooking = async (id: number) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking not found");
  }

  return data as IBooking;
};

export const getBookingsAfterDate = async (date: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("createdAt, totalPrice, extraPrice")
    .gte("createdAt", date)
    .lte("createdAt", getToday({ end: true }));

  if (error) throw new Error("Bookings could not get loaded");

  return data as unknown as IBookingsAfterDate;
};

export const getStaysAfterDate = async (date: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) throw new Error("Bookings could not get loaded");

  return data as IBooking[];
};

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) throw new Error("Bookings could not get loaded");

  return data;
}

export const updateBooking = async (id: number, booking: IUpdateBooking) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(booking)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }
  return data as IBooking;
};

export const deleteBooking = async (id: number) => {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error("Booking could not be deleted");
};
