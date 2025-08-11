import { Event } from '@/storage/events_database';

/**
 * Returns a list of events shared between the current user and a friend.
 * @param events - All events
 * @param userId - Current user's ID
 * @param friendId - Friend's ID
 * @returns Array of shared Event objects
 */
export function getSharedEvents(events: Event[], userId: string, friendId: string): Event[] {
  if (!userId || !friendId || userId === friendId) return [];
  return events.filter(event => {
    const hasUser = event.users.some(u => u.id === userId);
    const hasFriend = event.users.some(u => u.id === friendId);
    return hasUser && hasFriend;
  });
}