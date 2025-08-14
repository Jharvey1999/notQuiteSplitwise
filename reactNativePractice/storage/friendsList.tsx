import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from './getToken'; 

export type Friend = {
  id: string;
  name: string;
};

const API_URL = 'http://localhost:3000/api/friends'; // Change to your server IP if needed



export async function fetchFriends() {
  const token = await getToken();
  const res = await fetch(API_URL, {
    headers: { 
      'Content-Type':' application/json',
      Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch friends');
  return res.json();
}

export async function addFriend(name: string) {
  const token = await getToken();
  const res = await fetch(`${API_URL}/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to add friend');
  return res.json();
}

export async function deleteFriend(friendId: string) {
  const token = await getToken();
  const res = await fetch(`${API_URL}/${friendId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete friend');
  return true;
}
