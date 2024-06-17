export interface ICabin {
  id: number;
  createdAt: string;
  name: string | null;
  maxCapacity: number | null;
  regullarPrice: number | null;
  discount: number | null;
  description: string | null;
  image: string | null;
}
