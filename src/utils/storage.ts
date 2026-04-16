import { get, set, del, keys } from 'idb-keyval';

/**
 * Storage utility for LocalStorage and IndexedDB fallback
 */

const STORAGE_KEY_PREFIX = 'study-tools-';

export const storage = {
  // LocalStorage methods (Synchronous)
  saveLocal: (key: string, data: any) => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorage error, possibly quota exceeded', e);
    }
  },

  getLocal: <T>(key: string): T | null => {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    return data ? JSON.parse(data) : null;
  },

  // IndexedDB methods (Asynchronous - for backup/larger data)
  saveDeep: async (key: string, data: any) => {
    await set(`${STORAGE_KEY_PREFIX}${key}`, data);
  },

  getDeep: async <T>(key: string): Promise<T | undefined> => {
    return await get(`${STORAGE_KEY_PREFIX}${key}`);
  },

  getAllKeys: async () => {
    return await keys();
  },

  clear: async (key: string) => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
    await del(`${STORAGE_KEY_PREFIX}${key}`);
  }
};
