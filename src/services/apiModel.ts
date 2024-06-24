export interface ICabin {
  id: number;
  createdAt: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface ICreateCabin
  extends Omit<ICabin, "id" | "createdAt" | "image"> {
  image: FileList | string;
}

export interface ISettings {
  id: number;
  createdAt: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface IUpdateSetting {
  [key: string]: string;
}

export interface IBookingCabin {
  name: string;
}

export interface IBookingGuest {
  email: string;
  fullName: string;
}

export interface IBooking {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: IBookingCabin;
  guests: IBookingGuest;
}
