import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { sharedStyles } from '@/components/styles/styles';
import { useTranslation } from '@/components/hooks/useTranslation';
import { useColorScheme } from '@/hooks/useColorScheme';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';

  // Use pure black/white for background
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const fieldTitleColor = colorScheme === 'dark' ? '#ccc' : '#333';
  const placeholderTextColor = colorScheme === 'dark' ? '#aaa' : '#888';
  const inputTextColor = colorScheme === 'dark' ? '#fff' : '#222';

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const { token } = await res.json();
      // Save token (e.g., AsyncStorage)
      router.replace('/(tabs)');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#30c035ff', dark: '#17851bff' }}
      headerImage={
                    <View
                      style={{
                        paddingTop: 0,
                        marginTop: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {/* MAIN title (no translation) */}
                      <Text
                        style={{
                          fontSize: Platform.OS === 'web' ? 58 : 30,
                          color: colorScheme === 'dark' ? 'white' : 'black',
                          textAlign: 'center',
                          marginTop: 0,
                        }}
                      >
                        Not Quite Splitwise
                      </Text>
                    </View>
                  }
                >
      <View style={[sharedStyles.container, { backgroundColor, minHeight: 400 }]}>
        <Text style={[sharedStyles.title, { color: fieldTitleColor }]}>Sign In</Text>
        <Text style={[sharedStyles.profileFieldLabel, { color: fieldTitleColor }]}>Username or Email</Text>
        <TextInput
          placeholder="Username or Email"
          placeholderTextColor={placeholderTextColor}
          value={username}
          onChangeText={setUsername}
          style={[sharedStyles.profileTextInput, { color: inputTextColor }]}
          autoCapitalize="none"
        />
        <Text style={[sharedStyles.profileFieldLabel, { color: fieldTitleColor }]}>Password</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor={placeholderTextColor}
          value={password}
          onChangeText={setPassword}
          style={[sharedStyles.profileTextInputPassword, { color: inputTextColor }]}
          secureTextEntry
          returnKeyType='done'
          onSubmitEditing={handleLogin}
        />
        {error ? <Text style={sharedStyles.error}>{error}</Text> : null}
        <TouchableOpacity style={sharedStyles.loginButton} onPress={handleLogin}>
          <Text style={sharedStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}