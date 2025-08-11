import { events } from '@/storage/events_database';
import { users } from '@/storage/user_database';

export function addEvent(eventData: {
  id: string;
  name: string;
  date: string;
  contributions: { id: string; contribution: number }[];
  createdBy: string;
}) {
  // add event to existing array
  events.push({
    id: eventData.id,
    name: eventData.name,
    date: eventData.date,
    totalCost: eventData.contributions.reduce((sum, c) => sum + c.contribution, 0),
    paid: eventData.contributions.find(c => c.id === eventData.createdBy)?.contribution || 0,
    uOwed: 0,
    othersOwed: 0, 
    users: eventData.contributions.map(c => {
      // build user to find all data of that user
      const fullUser = users.find(user => user.id === c.id);
      
      if (!fullUser) {
        throw new Error(`User with id ${c.id} not found`);
      }
      
      return {
        ...fullUser,
        contribution: c.contribution,
      };
    }),
  });
}