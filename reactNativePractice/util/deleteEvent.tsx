import { deleteEvent } from '@/storage/events_database';

export async function removeEventFromServer(eventId: string) {
  await deleteEvent(eventId);
}