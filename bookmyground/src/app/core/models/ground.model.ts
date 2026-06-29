export interface Ground {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  pricePerHour: number;
  rating: number;
  facilities: string[];
  available: boolean;
  openingTime: string;
  closingTime: string;
  image: string;
  createdAt: number;
}
