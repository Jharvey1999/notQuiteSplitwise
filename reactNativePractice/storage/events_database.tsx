import { User } from './user_database';

export type EventUser = User & { contribution: number };

export type Event = {
  id: string;
  date: string;
  name: string;
  totalCost: number;
  paid: number;
  uOwed: number;
  othersOwed: number;
  users: EventUser[];
};

// Pass users as a parameter to getEventUsers
function getEventUsers(
  userContributions: { id: string; contribution: number }[],
  users: User[]
): EventUser[] {
  return userContributions
    .map(({ id, contribution }) => {
      const user = users.find((u: User) => u.id === id);
      return user ? { ...user, contribution } : null;
    })
    .filter(Boolean) as EventUser[];
}

// method to calc distribution of money
export function calc(
  event: Event,
  currentUserId: string
): {
  perUser: { id: string; firstName: string; lastName: string; contribution: number; balance: number }[];
  totalCost: number;
  uOwed: number;
  othersOwed: number;
} {
  const totalCost = event.users.reduce((sum: number, u: EventUser) => sum + u.contribution, 0);
  const numUsers = event.users.length;
  const share = totalCost / numUsers;

  const perUser = event.users.map((user: EventUser) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    contribution: user.contribution,
    balance: user.contribution - share,
  }));

  const currentUser = perUser.find((u) => u.id === currentUserId);
  let uOwed = 0;
  let othersOwed = 0;

  if (currentUser) {
    if (currentUser.contribution > share) {
      uOwed = 0;
      othersOwed = currentUser.contribution - share;
    } else if (currentUser.contribution < share) {
      uOwed = share - currentUser.contribution;
      othersOwed = 0;
    } else {
      uOwed = 0;
      othersOwed = 0;
    }
  }

  return { perUser, totalCost, uOwed, othersOwed };
}


const API_URL = 'http://localhost:3000/api/events'; // Change to your server IP if needed

// Helper to get token (replace with your actual implementation)
const getToken = async () => {
  // e.g., from AsyncStorage or context
  // return await AsyncStorage.getItem('token');
  return null; // Replace with actual token retrieval
};

export async function fetchEvents(): Promise<Event[]> {
  const token = await getToken();
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function fetchEventById(eventId: string): Promise<Event> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch event');
  return res.json();
}

export async function createEvent(eventData: Event): Promise<Event> {
  const token = await getToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
}

export async function updateEvent(eventId: string, eventData: Partial<Event>): Promise<Event> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/${eventId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete event');
  return true;
}