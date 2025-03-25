import React, { createContext, useState, ReactNode } from 'react';

type FavouritesContextType = {
  favourites: string[];
  addFavourite: (listingId: string) => void;
  removeFavourite: (listingId: string) => void;
};

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});

export const FavouritesProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [favourites, setFavourites] = useState<string[]>([]);

  const addFavourite = (listingId: string) => {
    setFavourites((prev) => [...prev, listingId]);
  };

  const removeFavourite = (listingId: string) => {
    setFavourites((prev) => prev.filter((id) => id !== listingId));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
