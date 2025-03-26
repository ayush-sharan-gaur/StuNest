// src/services/api.ts
// import { Listing } from "./types"; // (You can also keep the Listing type here)
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Listing type definition
export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  address: string;
};

export const fetchListings = async (): Promise<Listing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "listings"));
    const listings: Listing[] = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...(doc.data() as Omit<Listing, "id">) });
    });
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    // Fallback dummy data:
    return [
      {
        id: '1',
        title: 'PG in Mukherjee Nagar',
        description: 'Affordable and safe housing near campus.',
        price: 3500,
        imageUrl: 'https://via.placeholder.com/300',
        address: 'Mukherjee Nagar, Delhi',
      },
      {
        id: '2',
        title: 'Shared Flat in Kota',
        description: 'Ideal for students, spacious and well-connected.',
        price: 4000,
        imageUrl: 'https://via.placeholder.com/300',
        address: 'Kota, Rajasthan',
      },
      {
        id: '3',
        title: 'Hostel in Delhi',
        description: 'Secure hostel with all amenities.',
        price: 3000,
        imageUrl: 'https://via.placeholder.com/300',
        address: 'Delhi',
      },
    ];
  }
};

export const addListing = async (listing: Listing): Promise<boolean> => {
  try {
    // Exclude the id property since Firestore will generate one
    const { id, ...listingData } = listing;
    await addDoc(collection(db, "listings"), listingData);
    return true;
  } catch (error) {
    console.error("Error adding listing:", error);
    return false;
  }
};

export const bookListing = async (listingId: string, userId: string): Promise<boolean> => {
  try {
    // For booking, add a document to a "bookings" collection
    await addDoc(collection(db, "bookings"), { listingId, userId, timestamp: new Date() });
    return true;
  } catch (error) {
    console.error("Error booking listing:", error);
    return false;
  }
};
