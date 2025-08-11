import { createEvent } from '@/storage/events_database';
import { Event } from '@/storage/events_database';

export async function addEventToServer(eventData: {
  id: string;
  name: string;
  date: string;
  contributions: { id: string; contribution: number }[];
  createdBy: string;
  users: Event['users']; // Add users if you have them
}) {
  // Calculate totalCost and other fields
  const totalCost = eventData.contributions.reduce((sum, c) => sum + c.contribution, 0);

  // You may need to build the users array based on contributions and user info
  // For now, assuming eventData.users is provided and matches EventUser[]
  const event: Event = {
    id: eventData.id,
    name: eventData.name,
    date: eventData.date,
    totalCost,
    paid: 0, // Set appropriately
    uOwed: 0, // Set appropriately
    othersOwed: 0, // Set appropriately
    users: eventData.users,
  };

  await createEvent(event);
}