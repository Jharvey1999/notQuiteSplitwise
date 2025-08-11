import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/components/hooks/useTranslation';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  portraitUri?: string;
  contribution: number;
};

type Event = {
  id: string;
  date: string;
  name: string;
  totalCost: number;
  paid: number;
  uOwed: number;
  othersOwed: number;
  users: User[];
};

type Props = {
  events: Event[];
  selectedEvent: string | null;
  setSelectedEvent: (id: string | null) => void;
  onRemoveEvent?: (eventId: string) => void; // <-- Add this line
};

export function EventList({ events, selectedEvent, setSelectedEvent }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const { t } = useTranslation();
  return (
    <View>
      {events.map(event => (
        <View key={event.id}>
          <TouchableOpacity
            style={{
              backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
              borderRadius: 8,
              marginBottom: 12,
              padding: 12,
              elevation: 2,
            }}
            onPress={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{event.name}</Text>
            <Text>{t.date}: {event.date}</Text>
            <Text>{t.totalCost}: ${event.totalCost}</Text>
            <Text>{t.youPaid}: <Text style={{ fontWeight: 'bold' }}>${event.paid}</Text></Text>
            <Text>{t.youOwe}: <Text style={{color: event.uOwed !==0 ? 'red' : 'black'}}>${event.uOwed}</Text></Text>
            <Text>{t.othersOweYou}: <Text style={{color: event.othersOwed !== 0 ? 'green' : 'black'}}>${event.othersOwed}</Text></Text>
          </TouchableOpacity>
          {selectedEvent === event.id && (
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, marginTop: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t.eventDetails}</Text>
              {/* Header Section */}
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>{t.totalCost}: ${event.totalCost}</Text>
                <Text>{t.status}</Text>
                <Text>{t.date}: {event.date}</Text>
                <Text>{t.usersInvolved}: {event.users.length}</Text>
              </View>
              {/* Line Separator */}
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 8 }} />
              {/* Paid Header */}
              <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 4 }}>{t.contribution}</Text>
              {/* Contributions */}
              {event.users.map(user => (
                <View key={user.firstName} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                  <Text>{user.firstName}</Text>
                  <Text>${user.contribution}</Text>
                </View>
              ))}
              {/* Divider */}
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 8 }} />
              {/* Relationships */}
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{t.relationships}</Text>
              {(() => {
                const currentUser = "Anon"; // Replace with getCurrentUser later
                const relationships: { from: string; to: string; amount: number }[] = [];
                const share = event.totalCost / event.users.length;
                const creditors = event.users.filter(u => u.contribution > share);
                const debtors = event.users.filter(u => u.contribution < share);

                debtors.forEach(debtor => {
                  creditors.forEach(creditor => {
                    const amount = Math.min(share - debtor.contribution, creditor.contribution - share);
                    if (amount > 0) {
                      relationships.push({
                        from: debtor.firstName,
                        to: creditor.firstName,
                        amount: Math.round(amount * 100) / 100,
                      });
                    }
                  });
                });

                if (relationships.length === 0) {
                  return (
                    <Text style={{ marginVertical: 2, color: '#888' }}>
                      {t.noRelationships}
                    </Text>
                  );
                }

                return relationships.map((rel, idx) => {
                  let amountColor = '#222';
                  if (rel.to === currentUser) amountColor = 'green';
                  if (rel.from === currentUser) amountColor = 'red';

                  return (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                      <Text>{rel.from} to {rel.to}</Text>
                      <Text style={{ color: amountColor }}>${rel.amount}</Text>
                    </View>
                  );
                });
              })()}
              <TouchableOpacity
                style={{ marginTop: 12, alignSelf: 'flex-end' }}
                onPress={() => setSelectedEvent(null)}
              >
                <Text style={{ color: '#000000ff', fontWeight: 'bold' }}>{t.close}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}