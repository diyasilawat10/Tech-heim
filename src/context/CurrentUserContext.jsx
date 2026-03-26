import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getUserById } from '../api/usersApi';

const CurrentUserContext = createContext(null);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
};

const writeStoredUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

const getUserId = (user) => user?.id ?? user?._id ?? '';

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(() => readStoredUser());
  const userId = getUserId(currentUser);

  const setCurrentUser = useCallback((user) => {
    setCurrentUserState(user || null);
    writeStoredUser(user || null);
  }, []);

  const clearCurrentUser = useCallback(() => {
    setCurrentUserState(null);
    writeStoredUser(null);
  }, []);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    const refreshUser = async () => {
      try {
        const user = await getUserById(userId);
        if (!cancelled) {
          setCurrentUser(user);
        }
      } catch {
        // Keep the last known session user if refresh fails.
      }
    };

    refreshUser();

    return () => {
      cancelled = true;
    };
  }, [userId, setCurrentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      clearCurrentUser,
    }),
    [currentUser, setCurrentUser, clearCurrentUser]
  );

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within CurrentUserProvider');
  }
  return context;
}
