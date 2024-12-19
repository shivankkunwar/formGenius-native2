import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  getItem: async (key: string) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },
};