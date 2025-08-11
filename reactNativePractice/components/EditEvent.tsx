import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Event } from '@/storage/events_database';
import { users } from '@/storage/user_database';
import { useTranslation } from '@/components/hooks/useTranslation';

type EditEventFormProps = {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onSave: (eventData: { name: string; date: string; contributions: { id: string; name: string; contribution: number }[] }) => void;
  friends?: { id: string; name: string }[]; // Optional, for adding friends
};

export const EditEventForm: React.FC<EditEventFormProps> = ({
  visible,
  event,
  onClose,
  onSave,
  friends = [],
}) => {
  if (!visible || !event) return null;

  // Pre-populate fields from event
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [contributions, setContributions] = useState(
    event.users.map(u => ({
      id: u.id,
      name: u.username,
      contribution: u.contribution,
    }))
  );
  const [dateError, setDateError] = useState('');
  const { t } = useTranslation();

  // Friends not already in contributions
  const availableFriends = useMemo(
    () => friends.filter(f => !contributions.some(c => c.id === f.id)),
    [friends, contributions]
  );

  // Add friend to contributions
  const addFriend = (friend: { id: string; name: string }) => {
    setContributions([...contributions, { id: friend.id, name: friend.name, contribution: 0 }]);
  };

  // Helper to format date to yyyy-mm-dd
  function formatDate(input: string): string {
    let cleaned = input.replace(/[^\d]/g, '');
    if (cleaned.length === 8) {
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
        return input;
      }
      return `${yyyy}-${mm}-${dd}`;
    }
    return input;
  }

  function isValidDate(str: string) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime());
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 320,
        backgroundColor: '#fff',
        zIndex: 40,
        padding: 24,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>{t.editEvent}</Text>
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
              setDateError('Please enter a valid date in YYYY-MM-DD format.');
              return;
            }
            onSave({
              name,
              date: formattedDate,
              contributions: contributions.map(c => ({ id: c.id, name: c.name, contribution: c.contribution })),
            });
            onClose();
          }}
        >
          <Text style={{ color: '#17851bff', fontWeight: 'bold' }}>{t.save}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type EditEventProps = {
  visible: boolean;
  events: Event[];
  onClose: () => void;
  onSelect: (event: Event) => void;
};

export const EditEvent: React.FC<EditEventProps> = ({ visible, events, onClose, onSelect }) => {
  const { t } = useTranslation();
  if (!visible) return null;

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
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>{t.selectEventToEdit}</Text>
      <ScrollView>
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}
            onPress={() => {
              onSelect(event);
              onClose();
            }}
          >
            <Text>{event.name} ({event.date})</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{ marginTop: 16, alignSelf: 'flex-end' }}
        onPress={onClose}
      >
        <Text style={{ color: 'red', fontWeight: 'bold' }}>{t.cancel}</Text>
      </TouchableOpacity>
    </View>
  );
};