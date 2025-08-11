import React, { useState } from 'react';
import { Text, Platform, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { LeftMenuColumn } from '@/components/LeftColumnMenu';
import { UniversalHeader } from '@/components/UniversalHeader';
import { useTranslation } from '@/components/hooks/useTranslation';

export default function ExpensesScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={<UniversalHeader title={t.expenses} />}
    >
      <View style={sharedStyles.row}>
        {/* Left Column Menu (shared) */}
        <LeftMenuColumn leftOpen={leftOpen} setLeftOpen={setLeftOpen} />

        {/* Center Column */}
        <View
          style={[
            sharedStyles.col2,
            { flex: 2 },
            !leftOpen && { paddingLeft: 25 },
            !rightOpen && { paddingRight: 0 },
          ]}
        >
          {/* Main content */}
          <ThemedView style={sharedStyles.stepContainer}>
            <ThemedText type="subtitle">{t.yourExpenses}</ThemedText>
            <ThemedText>
              {/* Expenses List */}
              {t.expensesList}
            </ThemedText>
          </ThemedView>
        </View>

        {/* Hamburger Button */}
        <TouchableOpacity
          style={[sharedStyles.tab, { left: 0 }]}
          onPress={() => setLeftOpen(!leftOpen)}
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
    </ParallaxScrollView>
  );
}