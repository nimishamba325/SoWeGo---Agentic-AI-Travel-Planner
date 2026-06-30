import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // 🛡️ Import Auth to get the email

export const useProfile = () => {
  const { currentUser } = useAuth();
  
  // 🛡️ DYNAMIC KEY: Creates a unique LocalStorage entry for every specific Gmail account
  const storageKey = currentUser ? `sowego_profile_${currentUser.email}` : null;

  const [profile, setProfile] = useState(null);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  // Load the profile when the user logs in
  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setProfile(JSON.parse(saved));
      } else {
        setProfile(null);
      }
    }
    setIsProfileLoaded(true);
  }, [storageKey]);

  const updateProfile = (newData) => {
    setProfile(newData);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newData));
    }
  };

  const clearProfile = () => {
    setProfile(null);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  return { 
    profile, 
    updateProfile, 
    clearProfile, 
    hasProfile: !!profile,
    isProfileLoaded 
  };
};