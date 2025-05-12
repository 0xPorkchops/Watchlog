// token-cache.ts
import * as SecureStore from 'expo-secure-store';
import { TokenCache } from '@clerk/clerk-expo';

export const tokenCache: TokenCache = {
  async getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
};