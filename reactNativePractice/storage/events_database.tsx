import { users, User } from './user_database';

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

// Helper to get users by id
function getUsersByIds(ids: string[]): User[] {
  return users.filter(u => ids.includes(u.id));
}
function getEventUsers(userContributions: { id: string; contribution: number }[]): EventUser[] {
  return userContributions
    .map(({ id, contribution }) => {
      const user = users.find(u => u.id === id);
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
  const totalCost = event.users.reduce((sum, u) => sum + u.contribution, 0);
  const numUsers = event.users.length;
  const share = totalCost / numUsers;

  const perUser = event.users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    contribution: user.contribution,
    balance: user.contribution - share,
  }));

  const currentUser = perUser.find(u => u.id === currentUserId);
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

// Usage in createEvent
export function createEvent(
  id: string,
  date: string,
  name: string,
  userContributions: { id: string; contribution: number }[],
  currentUserId: string
): Event {
  const users = getEventUsers(userContributions);
  const result = calc({ id, date, name, paid: 0, users } as Event, currentUserId);
  return {
    id,
    date,
    name,
    totalCost: result.totalCost,
    paid: users.find(u => u.id === currentUserId)?.contribution || 0,
    uOwed: result.uOwed,
    othersOwed: result.othersOwed,
    users,
  };
}

// temp hardcoded events
export const events: Event[] = [
  createEvent('1', '2025-08-01', 'Birthday Party', [
    { id: '1', contribution: 50 }, // Anon (current user)
    { id: '3', contribution: 40 }, // Einstein
    { id: '4', contribution: 30 }, // Newton
  ], '1'), // '1' is Anon's id
  createEvent('2', '2025-08-15', 'Movie Night', [
    { id: '2', contribution: 20 }, // Oppenheimer
    { id: '3', contribution: 30 }, // Einstein
    { id: '4', contribution: 10 }, // Newton
  ], '1'), // '1' is Anon's id
  createEvent('3', '2025-09-01', 'Game Night', [
    { id: '1', contribution: 15 }, // Anon (current user)
    { id: '2', contribution: 25 }, // Oppenheimer
    { id: '4', contribution: 20 }, // Newton
  ], '1'), // '1' is Anon's id
  createEvent('4', '2025-09-15', 'Dinner Party', [
    { id: '1', contribution: 30 }, // Anon (current user)
    { id: '2', contribution: 40 }, // Oppenheimer
    { id: '3', contribution: 50 }, // Einstein
  ], '1'), // '1' is Anon's id
  createEvent('5', '2025-10-01', 'Picnic', [
    { id: '1', contribution: 25 }, // Anon (current user)
    { id: '2', contribution: 35 }, // Oppenheimer
    { id: '3', contribution: 45 }, // Einstein
    { id: '4', contribution: 20 }, // Newton
  ], '1'), // '1' is Anon's id
];