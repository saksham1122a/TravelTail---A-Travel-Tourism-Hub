import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const DestinationContext = createContext();

const API_BASE = 'http://localhost:5001';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const DestinationProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(`${API_BASE}/api/destinations`);
        if (res.ok) {
          const data = await res.json();
          setDestinations(data);
          setIsLoading(false);
          return; // success — exit early
        } else {
          throw new Error(`Server responded with status ${res.status}`);
        }
      } catch (err) {
        const isLastAttempt = attempt === MAX_RETRIES;
        if (isLastAttempt) {
          console.error('Failed to fetch destinations after retries:', err);
          setError('Unable to connect to the server. Please make sure the backend is running.');
        } else {
          console.warn(`Attempt ${attempt} failed. Retrying in ${RETRY_DELAY_MS * attempt}ms...`);
          await sleep(RETRY_DELAY_MS * attempt);
        }
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return (
    <DestinationContext.Provider value={{ 
      destinations, 
      isLoading,
      error,
      refreshDestinations: fetchDestinations 
    }}>
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestinations = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestinations must be used within a DestinationProvider');
  }
  return context;
};
