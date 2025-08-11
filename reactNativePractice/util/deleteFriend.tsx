import { deleteFriend } from '@/storage/friendsList';

export async function removeFriendFromServer(friendId: string) {
  await deleteFriend(friendId);
}