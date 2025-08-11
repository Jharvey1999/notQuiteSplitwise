import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/components/hooks/useTranslation';


export function LeftMenuColumn({ leftOpen, setLeftOpen }: { leftOpen: boolean, setLeftOpen: (open: boolean) => void }) {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { t } = useTranslation();

  if (!leftOpen) return null;

  return (
    <View
      style={[
        sharedStyles.col1,
        { 
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white', // overwrite background color
        },
      ]}
    >
      {/* Scrollable navigation buttons */}
      <ScrollView
        contentContainerStyle={[
          sharedStyles.leftContent,
          { flexGrow: 1, justifyContent: 'flex-start', minHeight: '100%' },
        ]}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            {t.home}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/expenses');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            {t.expenses}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/friends');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            {t.friends}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            sharedStyles.leftTabButton,
            { backgroundColor: colorScheme === 'dark' ? '#222' : '#ccc' },
          ]}
          onPress={() => {
            router.push('/settings');
            setLeftOpen(false);
          }}
        >
          <Text
            style={[
              sharedStyles.leftTabText,
              { color: colorScheme === 'dark' ? 'white' : 'black' },
            ]}
          >
            {t.settings}
          </Text>
        </TouchableOpacity>
        {/* Add more buttons here as needed */}
      </ScrollView>
      {/* Collapse button - absolutely positioned, always visible */}
      <TouchableOpacity
        style={[
          sharedStyles.tab,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 20, // higher than scrollview
          },
        ]}
        onPress={() => setLeftOpen(false)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            sharedStyles.expandHamburgerButton,
            { color: colorScheme === 'dark' ? 'white' : 'black' },
          ]}
        >
          {'\u2261'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}