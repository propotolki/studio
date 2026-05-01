export type AppRole = 'guest' | 'host' | 'admin';

export type ListingStatus = 'draft' | 'pending' | 'active' | 'blocked';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type User = {
  id: string;
  name: string;
  phone: string;
  role: AppRole;
  avatar?: string;
};

export type Listing = {
  id: string;
  hostId: string;
  title: string;
  description: string;
  city: string;
  pricePerNight: number;
  status: ListingStatus;
  image: string;
  lat?: number;
  lng?: number;
};

export type Booking = {
  id: string;
  listingId: string;
  guestId: string;
  dateFrom: string;
  dateTo: string;
  totalPrice: number;
  status: BookingStatus;
};
