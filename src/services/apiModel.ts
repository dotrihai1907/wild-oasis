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
  cabins: ICabin;
  guests: IGuest;
}

export interface IGetBookings {
  data: IBooking[];
  count: number;
}

export interface IGuest {
  id: number;
  createdAt: string;
  fullName: string;
  email: string;
  nationalId: string;
  nationality: string;
  countryFlag: string;
}

export interface IUpdateBooking {
  [key: string]: string | number | boolean;
}

export interface ISignup {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ICreateSignup extends Omit<ISignup, "passwordConfirm"> {}
