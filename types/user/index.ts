export type LocationT = {
  lat: number;
  lng: number;
};

export interface UserI {
  id: string;
  wallet: string;
  location: LocationT | null;
  name: string | null;
  twitter: string | null;
}
export interface UserWithLocationI extends UserI {
  location: Required<LocationT>;
}
