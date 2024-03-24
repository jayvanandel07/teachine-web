// storageService.ts

interface StorageService<T> {
    getItem: (key?: keyof T) => T[keyof T] | null;
    setItem: (key: keyof T, value: T[keyof T]) => void;
    removeItem: (key: keyof T) => void;
}
  
const createStorageService = <T extends Record<string, unknown>>(
  storage: Storage,
  storageKey: string
): StorageService<T> => ({
  getItem: (key?: keyof T) => {
    try {
      const serializedItem = storage.getItem(storageKey);
      if (!serializedItem) return null;
      const data: T = JSON.parse(serializedItem);
      return key ? (data[key as string] as T[keyof T]) : (data as T[keyof T]);
    } catch (error) {
      console.error(`Error getting item from ${storage === localStorage ? 'local' : 'session'} storage:`, error);
      return null;
    }
  },
  setItem: (key: keyof T, value: T[keyof T]) => {
    try {
      const data: any = createStorageService(storage, storageKey).getItem() || {} as T;
      data[key] = value;
      storage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting item in ${storage === localStorage ? 'local' : 'session'} storage:`, error);
    }
  },
  removeItem: (key: keyof T) => {
    try {
      const data: any = createStorageService(storage, storageKey).getItem() || {} as T;
      delete data[key];
      storage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error(`Error removing item from ${storage === localStorage ? 'local' : 'session'} storage:`, error);
    }
  },
});

const TeachineLocalStorage = createStorageService(localStorage, 'Teachine');
const TeachineSessionStorage = createStorageService(sessionStorage, 'Teachine');

export { TeachineLocalStorage, TeachineSessionStorage };
