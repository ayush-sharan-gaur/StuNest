export type Listing = {
  id: string;
  title: string;
  description: string;
};

const dummyListings: Listing[] = [
  { id: '1', title: 'PG in Mukherjee Nagar', description: 'Affordable and safe housing near campus.' },
  { id: '2', title: 'Shared Flat in Kota', description: 'Ideal for students, spacious and well-connected.' },
  { id: '3', title: 'Hostel in Delhi', description: 'Secure hostel with all amenities.' },
];

export const fetchListings = (): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyListings);
    }, 1500);
  });
};
