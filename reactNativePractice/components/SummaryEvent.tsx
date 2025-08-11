import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Event } from '@/storage/events_database';
import { useTranslation } from '@/components/hooks/useTranslation';


type SummaryEventProps = {
  visible: boolean;
  events: Event[];
  currentUserId: string;
  onClose: () => void;
};

export const SummaryEvent: React.FC<SummaryEventProps> = ({
  visible,
  events,
  currentUserId,
  onClose,
}) => {
  const { t } = useTranslation();
  if (!visible) return null;

  // Calculate totals
  let totalOwed = 0;
  let totalIsOwed = 0;
  events.forEach(event => {
    const user = event.users.find(u => u.id === currentUserId);
    if (user) {
      // Use event.uOwed and event.othersOwed if available
      totalOwed += event.uOwed || 0;
      totalIsOwed += event.othersOwed || 0;
    }
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: 80,
        right: 0,
        width: 320,
        backgroundColor: '#fff',
        zIndex: 50,
        padding: 24,
        borderRadius: 8,
        boxShadow: Platform.OS === 'web' ? '0 4px 8px rgba(0,0,0,0.2)' : undefined,
        elevation: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>{t.summary}</Text>
      <Text style={{ marginBottom: 12 }}>{t.totalEvents}: <Text style={{ fontWeight: 'bold' }}>{events.length}</Text></Text>
      <Text style={{ color: 'red', marginBottom: 8 }}>
        {t.youOwe}: <Text style={{ fontWeight: 'bold' }}>${totalOwed.toFixed(2)}</Text>
      </Text>
      <Text style={{ color: 'green', marginBottom: 8 }}>
        {t.youAreOwed}: <Text style={{ fontWeight: 'bold' }}>${totalIsOwed.toFixed(2)}</Text>
      </Text>
      <TouchableOpacity
        style={{ marginTop: 16, alignSelf: 'flex-end' }}
        onPress={onClose}
      >
        <Text style={{ color: 'red', fontWeight: 'bold' }}>{t.close}</Text>
      </TouchableOpacity>
    </View>
  );
};