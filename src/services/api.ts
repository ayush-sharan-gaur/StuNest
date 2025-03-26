export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const dummyListings: Listing[] = [
  { id: '1', title: 'PG in Mukherjee Nagar', description: 'Affordable and safe housing near campus.', price: 3500 },
  { id: '2', title: 'Shared Flat in Kota', description: 'Ideal for students, spacious and well-connected.', price: 4000 },
  { id: '3', title: 'Hostel in Delhi', description: 'Secure hostel with all amenities.', price: 3000 },
];

export const fetchListings = async (): Promise<Listing[]> => {
  // Simulate network delay and return dummy data.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyListings);
    }, 1500);
  });
};
