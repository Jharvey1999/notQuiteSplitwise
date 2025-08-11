import { useProfile } from '@/components/ProfileContext';

export function useEditProfile() {
  const { user, setUser } = useProfile();

  function editProfile(updated: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    dob: string;
    password?: string;
    portraitUri?: string;
  }) {
    setUser({
      ...user,
      ...updated,
    });
  }

  return editProfile;
}