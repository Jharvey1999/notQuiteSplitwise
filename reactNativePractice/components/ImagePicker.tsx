import * as ExpoImagePicker from 'expo-image-picker';

/**
 * Opens image browser
 * returns image or undefined if cancelled
 */
export async function pickProfileImage(): Promise<string | undefined> {
  const result = await ExpoImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  }
  return undefined;
}