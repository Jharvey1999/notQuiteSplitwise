import AsyncStorage from "@react-native-async-storage/async-storage";

// get token for fetch funcs
export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};