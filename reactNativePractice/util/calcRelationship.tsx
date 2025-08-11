import { Event } from '@/storage/events_database';

export function calculateRelationship(events: Event[], userId: string, friendId: string) {
  let youOwe = 0;
  let youAreOwed = 0;

  events.forEach(event => {
    const you = event.users.find(u => u.id === userId);
    const friend = event.users.find(u => u.id === friendId);
    if (you && friend) {
      const share = event.totalCost / event.users.length;
      if (you.contribution < share && friend.contribution > share) {
        youOwe += Math.min(share - you.contribution, friend.contribution - share);
      }
      if (you.contribution > share && friend.contribution < share) {
        youAreOwed += Math.min(share - friend.contribution, you.contribution - share);
      }
    }
  });

  return { youOwe, youAreOwed };
}