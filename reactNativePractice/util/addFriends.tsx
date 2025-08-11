import { friendsList } from '@/storage/friendsList';

export function addFriend(name: string) {
  if (!name.trim()) return;

  // Generate a new id (increment max id)
  const maxId = friendsList.reduce((max, f) => Math.max(max, Number(f.id)), 0);
  const newFriend = { id: String(maxId + 1), name: name.trim() };

  friendsList.push(newFriend);
}