import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from '@/components/styles/styles';
import { useColorScheme } from '@/hooks/useColorScheme';

export function UniversalHeader({ title }: { title: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View
      style={[
        sharedStyles.universalHeaderContainer,
        { backgroundColor: colorScheme === 'dark' ? '#17851bff' : '#30c035ff' },
      ]}
    >
      <Text
        style={[
          sharedStyles.universalHeaderText,
          { color: colorScheme === 'dark' ? 'white' : 'white' },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}