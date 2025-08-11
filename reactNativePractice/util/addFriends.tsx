import { addFriend } from '@/storage/friendsList';

export async function addFriendToServer(name: string) {
  if (!name.trim()) return;
  await addFriend(name.trim());
}