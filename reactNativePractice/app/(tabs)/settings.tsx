import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { UniversalHeader } from '@/components/UniversalHeader';
import { sharedStyles } from '@/components/styles/styles';
import { UserPortrait } from '@/components/UserPortrait';
import { useProfile } from '@/components/ProfileContext';
import { useRouter } from 'expo-router';
import { LeftMenuColumn } from '@/components/LeftColumnMenu'; 
import { useTranslation } from '@/components/hooks/useTranslation';

export default function SettingsScreen() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const { user, portraitUri } = useProfile();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const { t, language, setLanguage, availableLanguages } = useTranslation();

  // Button background and text color based on theme
  const buttonBg = colorScheme === 'dark' ? '#222' : '#ccc';
  const buttonText = colorScheme === 'dark' ? 'white' : 'black';
  const dangerBg = colorScheme === 'dark' ? '#442222' : '#ffeaea';
  const dangerText = 'red';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={<UniversalHeader title={t.settings} />}
    >
      <View style={sharedStyles.row}>
        <LeftMenuColumn leftOpen={leftOpen} setLeftOpen={setLeftOpen} />
        
        <View 
          style={[
            sharedStyles.col2, 
            { flex: 2 },
            !leftOpen && { paddingLeft: 25 },
            rightOpen && { paddingRight: 340 },
          ]}
        >
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

          {/* Top widget with profile picture */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <UserPortrait uri={portraitUri} size={72} />
            {/* Current User Info */}
            <Text style={{ 
              fontWeight: 'bold', 
              fontSize: 18, 
              marginTop: 8,
              color: colorScheme === 'dark' ? 'white' : 'black'
            }}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
              {user.email}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#2196f3',
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 16,
                marginTop: 4,
              }}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>
                {t.editProfile}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Settings Buttons */}
          <View>
            <TouchableOpacity 
              style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}
              onPress={() => setRightOpen(!rightOpen)}
            >
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}
              >
                {t.language}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>{t.themes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>{t.history}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>{t.about}</Text>
            </TouchableOpacity>
          </View>

          {/* Separator */}
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 18 }} />

          {/* Account Handling Buttons */}
          <View>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: dangerBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: dangerText }]}>{t.deleteAccount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[sharedStyles.leftTabButton, { backgroundColor: buttonBg }]}>
              <Text style={[sharedStyles.leftTabText, { color: buttonText }]}>{t.logOut}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Language Selection Column */}
        {rightOpen && (
          <View 
            style={[
              sharedStyles.rightColumnShared,
              { backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9' }
            ]}
          >
            {/* Right Collapse Button */}
            <TouchableOpacity
              style={sharedStyles.collapseButtonShared}
              onPress={() => setRightOpen(false)}
            >
              <Text 
                style={[
                  sharedStyles.expandHamburgerButton,
                  { 
                    fontSize: 24,
                    color: colorScheme === 'dark' ? 'white' : 'black'
                  }
                ]}
              >
                {'\u25B6'}
              </Text>
            </TouchableOpacity>
            
            <Text style={{ 
              fontWeight: 'bold', 
              fontSize: 18, 
              marginBottom: 24,
              marginTop: 48,
              color: colorScheme === 'dark' ? 'white' : 'black'
            }}>
              {t.language}
            </Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {availableLanguages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    sharedStyles.leftTabButton,
                    {
                      backgroundColor: language === lang.code 
                        ? '#007AFF'
                        : (colorScheme === 'dark' ? '#333' : '#f0f0f0'),
                      marginBottom: 12,
                      borderWidth: language === lang.code ? 2 : 1,
                      borderColor: language === lang.code 
                        ? '#007AFF' 
                        : (colorScheme === 'dark' ? '#555' : '#ddd'),
                    },
                  ]}
                  onPress={() => {
                    setLanguage(lang.code);
                  }}
                >
                  <Text
                    style={[
                      sharedStyles.leftTabText,
                      {
                        color: language === lang.code 
                          ? 'white' 
                          : (colorScheme === 'dark' ? 'white' : 'black'),
                        fontWeight: language === lang.code ? 'bold' : 'normal',
                      },
                    ]}
                  >
                    {/* Display the translated language name using the translation key */}
                    {t[lang.displayKey]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ParallaxScrollView>
  );
}