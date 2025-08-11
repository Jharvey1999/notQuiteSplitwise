import React, { createContext, useContext, useState } from 'react';
import { User } from '@/storage/user_database';

type ProfileContextType = {
  portraitUri?: string;
  setPortraitUri: (uri?: string) => void;
  user: User;
  setUser: (user: User) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

type ProfileProviderProps = {
  children: React.ReactNode;
  initialUser: User; 
};

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children, initialUser }) => {
  const [portraitUri, setPortraitUri] = useState<string | undefined>(initialUser.portraitUri);
  const [user, setUser] = useState<User>(initialUser);

  return (
    <ProfileContext.Provider value={{ portraitUri, setPortraitUri, user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};