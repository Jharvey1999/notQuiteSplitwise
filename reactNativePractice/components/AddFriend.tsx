import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { sharedStyles } from '@/components/styles/styles';
import { useTranslation } from '@/components/hooks/useTranslation';

type AddFriendProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (friendData: { name: string }) => void; 
};

export const AddFriend: React.FC<AddFriendProps> = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <View style={sharedStyles.rightColumn}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>{t.addFriend}</Text>
      <Text style={{ marginBottom: 4 }}>{t.friendsName}</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 8, borderRadius: 4 }}
        value={name}
        onChangeText={setName}
        placeholder={t.enterFriendsName}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
        <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{t.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (name.trim()) {
              onAdd({ name: name.trim() }); 
              setName('');
            }
          }}
        >
          <Text style={{ color: '#30c035', fontWeight: 'bold' }}>{t.add}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};