import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { users } from '@/storage/user_database';
import { useTranslation } from '@/components/hooks/useTranslation';

type AddEventProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (eventData: { name: string; date: string; contributions: { id: string; contribution: number }[] }) => void;
  currentUserId: string;
  friends: { id: string; name: string }[];
  initialData?: {
    name: string;
    date: string;
    contributions: { id: string; name: string; contribution: number }[];
  };
};

export const AddEvent: React.FC<AddEventProps> = ({
  visible, onClose, onAdd, currentUserId, friends, initialData
}) => {
  const currentUser = users.find(u => u.id === currentUserId);
  const [name, setName] = useState(initialData?.name || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [contributions, setContributions] = useState(
    initialData?.contributions ||
    [{ id: currentUserId, name: users.find(u => u.id === currentUserId)?.username || '', contribution: 0 }]
  );
  const [availableFriends, setAvailableFriends] = useState(friends);
  const [dateError, setDateError] = useState('');
  const { t } = useTranslation();

  if (!visible) return null;

  const addFriend = (friend: { id: string; name: string }) => {
    setContributions([...contributions, { id: friend.id, name: friend.name, contribution: 0 }]);
    setAvailableFriends(availableFriends.filter(f => f.id !== friend.id));
  };

  // Helper to format date to yyyy-mm-dd
  function formatDate(input: string): string {
    // Accepts yyyy-mm-dd, dd-mm-yyyy, mm/dd/yyyy, etc.
    let cleaned = input.replace(/[^\d]/g, '');
    if (cleaned.length === 8) {
      // Try to detect format
      // If input is ddmmyyyy or mmddyyyy, convert to yyyy-mm-dd
      let yyyy, mm, dd;
      if (/^\d{4}\d{2}\d{2}$/.test(cleaned)) {
        yyyy = cleaned.slice(0, 4);
        mm = cleaned.slice(4, 6);
        dd = cleaned.slice(6, 8);
      } else if (/^\d{2}\d{2}\d{4}$/.test(cleaned)) {
        dd = cleaned.slice(0, 2);
        mm = cleaned.slice(2, 4);
        yyyy = cleaned.slice(4, 8);
      } else {
        return input; // fallback
      }
      return `${yyyy}-${mm}-${dd}`;
    }
    return input;
  }

  function isValidDate(str: string) {
    // Checks for yyyy-mm-dd format and valid date
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 80,
        right: 0,
        width: 320,
        backgroundColor: '#fff',
        zIndex: 20,
        padding: 24,
        paddingBottom: 40,
        boxShadow: Platform.OS === 'web' ? '0 4px 8px rgba(0,0,0,0.2)' : undefined,
        elevation: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>{t.addEvent}</Text>
      <ScrollView>
        <Text style={{ marginBottom: 4 }}>{t.eventName}</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 8 }}
          value={name}
          onChangeText={setName}
          placeholder={t.enterEventName}
        />
        <Text style={{ marginBottom: 4 }}>{t.date}</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: dateError ? 'red' : '#ccc', marginBottom: 12, padding: 8 }}
          value={date}
          onChangeText={val => {
            setDate(val);
            setDateError('');
          }}
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
        />
        {dateError ? (
          <Text style={{ color: 'red', marginBottom: 8 }}>{dateError}</Text>
        ) : null}
        <Text style={{ marginBottom: 4 }}>{t.contributions}</Text>
        {contributions.map((c, idx) => (
          <View key={c.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ flex: 1 }}>{c.name}</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', width: 80, padding: 4 }}
              keyboardType="numeric"
              value={c.contribution.toString()}
              onChangeText={val => {
                const newContributions = [...contributions];
                newContributions[idx].contribution = Number(val) || 0;
                setContributions(newContributions);
              }}
              placeholder="0"
            />
          </View>
        ))}
        {/* Add Friends Section */}
        <Text style={{ marginTop: 12, marginBottom: 4, fontWeight: 'bold' }}>{t.addFriends}</Text>
        {availableFriends.map(friend => (
          <TouchableOpacity
            key={friend.id}
            style={{
              padding: 8,
              backgroundColor: '#eee',
              borderRadius: 6,
              marginBottom: 6,
            }}
            onPress={() => addFriend(friend)}
          >
            <Text>{friend.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, paddingBottom: 16 }}>
        <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{t.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const formattedDate = formatDate(date);
            if (!isValidDate(formattedDate)) {
              setDateError(t.pleaseEnterValidDate);
              return;
            }
            onAdd({
              name,
              date: formattedDate,
              contributions: contributions.map(c => ({ id: c.id, contribution: c.contribution })),
            });
            setName('');
            setDate('');
            setDateError('');
            setContributions(currentUser ? [{ id: currentUser.id, name: currentUser.username, contribution: 0 }] : []);
            setAvailableFriends(friends);
            onClose();
          }}
        >
          <Text style={{ color: '#17851bff', fontWeight: 'bold' }}>{t.add}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};