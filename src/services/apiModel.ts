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
