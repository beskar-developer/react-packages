import { localStorage as localStorageClient } from "@shared-vendor/clients";

class LocalStorage implements Storage {
  setItem(key: string, value: string) {
    localStorageClient.setItem(key, value);
  }

  getItem(key: string) {
    return localStorageClient.getItem(key);
  }

  removeItem(key: string) {
    localStorageClient.removeItem(key);
  }

  clear() {
    localStorageClient.clear();
  }

  get length() {
    return localStorageClient.length;
  }

  key(index: number) {
    return localStorageClient.key(index);
  }
}

export default new LocalStorage();
