import { events } from '@/storage/events_database';

export function deleteEvent(eventId: string) {
  const index = events.findIndex(event => event.id === eventId);
  if (index !== -1) {
    events.splice(index, 1);
  }
}