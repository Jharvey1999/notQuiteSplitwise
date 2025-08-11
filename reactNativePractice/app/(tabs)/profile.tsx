import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { UniversalHeader } from '@/components/UniversalHeader';
import { sharedStyles } from '@/components/styles/styles';
import { useProfile } from '@/components/ProfileContext';
import { UserPortrait } from '@/components/UserPortrait';
import { useEditProfile } from '@/util/editProfile';
import { LeftMenuColumn } from '@/components/LeftColumnMenu';
import { pickProfileImage } from '@/components/ImagePicker'; 
import { profileBarStyles } from '@/components/styles/styles';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/components/LanguageContext';

export default function ProfileScreen() {
  const { user, setUser, portraitUri, setPortraitUri } = useProfile();
  const colorScheme = useColorScheme() ?? 'light';
  const labelColor = colorScheme === 'dark' ? 'white' : 'black';
  const inputTextColor = colorScheme === 'dark' ? 'white' : 'black';
  const { t } = useLanguage();

  // State for each field, pre-populated
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [dob, setDob] = useState(user.dob);
  const [password, setPassword] = useState(user.password ?? '');
  const [showSuccess, setShowSuccess] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  const editProfile = useEditProfile();
  const router = useRouter();
  
  // Add this function to use your ImagePicker tool
  const handlePickImage = async () => {
    const uri = await pickProfileImage();
    if (uri) {
      setPortraitUri(uri);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={<UniversalHeader title="Profile" />}
    >
      <View style={sharedStyles.row}>
        <LeftMenuColumn leftOpen={leftOpen} setLeftOpen={setLeftOpen} />
        <View style={[sharedStyles.col2, { flex: 2 }]}>
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

          {/* Profile Picture (interactive, matches ProfileBar) */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity onPress={handlePickImage} activeOpacity={0.7}>
              <UserPortrait uri={portraitUri} size={72} />
            </TouchableOpacity>
            <Text style={[sharedStyles.tapToEditLabel]}>
              {t.tapToEdit}
            </Text>
          </View>

          {/* User Info */}
          <ScrollView contentContainerStyle={{ padding: 0 }}>
            {/* First Name */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.firstName}</Text>
            <TextInput
              style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
              value={firstName}
              onChangeText={setFirstName}
              placeholder={t.enterFirstName}
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Last Name */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.lastName}</Text>
            <TextInput
              style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
              value={lastName}
              onChangeText={setLastName}
              placeholder={t.enterLastName}
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Username */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.username}</Text>
            <TextInput
              style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
              value={username}
              onChangeText={setUsername}
              placeholder={t.enterUsername}
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Email */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.email}</Text>
            <TextInput
              style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
              value={email}
              onChangeText={setEmail}
              placeholder={t.enterEmail}
              keyboardType="email-address"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Phone */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.phone}</Text>
            <TextInput
              style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
              value={phone}
              onChangeText={setPhone}
              placeholder={t.enterPhone}
              keyboardType="phone-pad"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Date of Birth */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.dateOfBirth} (yyyy-mm-dd)</Text>
            <TextInput
              style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
              value={dob}
              onChangeText={setDob}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Password */}
            <Text style={[sharedStyles.profileFieldLabel, { color: labelColor }]}>{t.password}</Text>
            <TextInput
              style={[sharedStyles.profileTextInputPassword, { color: inputTextColor }]}
              value={'*'.repeat(password.length)}
              onChangeText={text => setPassword(text)}
              placeholder={t.enterPassword}
              secureTextEntry
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'} 
            />

            {/* Save Button and Success Icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={sharedStyles.profileSaveButton}
                onPress={() => {
                  editProfile({
                    firstName,
                    lastName,
                    username,
                    email,
                    phone,
                    dob,
                    password,
                    portraitUri,
                  });
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 2000); // Hide after 2 seconds
                }}
              >
                <Text style={profileBarStyles.profileSaveButtonText}>  {t.save}  </Text>
              </TouchableOpacity>
              {/* Saved Successfully Icon */}
              {showSuccess && (
                <Text style={{ marginLeft: 12, fontSize: 22, color: 'green' }}>✅</Text>
              )}
            
            
             {/* Cancel Button */}
            <TouchableOpacity
              style={[
                sharedStyles.profileSaveButton,
                { backgroundColor: 'red' },
              ]}
              onPress={() => router.push('/settings')}
            >
              <Text style={profileBarStyles.profileSaveButtonText}>{t.cancel}</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ParallaxScrollView>
  );
}