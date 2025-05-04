import React, { createContext, useState, ReactNode } from 'react';
import type { ConfirmationResult } from 'firebase/auth';

type PhoneAuthContextType = {
  confirmationResult: ConfirmationResult | null;
  setConfirmationResult: (result: ConfirmationResult | null) => void;
};

export const PhoneAuthContext = createContext<PhoneAuthContextType>({
  confirmationResult: null,
  setConfirmationResult: () => {},
});

export const PhoneAuthProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  return (
    <PhoneAuthContext.Provider value={{ confirmationResult, setConfirmationResult }}>
      {children}
    </PhoneAuthContext.Provider>
  );
};
