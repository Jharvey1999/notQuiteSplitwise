import { getToken } from './getToken';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  dob: string; // yyyy-mm-dd
  portraitUri?: string;
  password?: string;
};

const API_URL = 'http://localhost:3000/api/users'; // Change to your server IP if needed


export async function fetchUserProfile() {
  const token = await getToken();
  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
}

export async function updateUserProfile(profileData: User) {
  const token = await getToken();
  const res = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

