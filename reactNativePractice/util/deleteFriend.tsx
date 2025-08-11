import { friendsList } from '@/storage/friendsList';

export function deleteFriend(friendId: string) {
  const index = friendsList.findIndex(friend => friend.id === friendId);
  if (index !== -1) {
    friendsList.splice(index, 1);
  }
}