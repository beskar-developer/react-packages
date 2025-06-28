import { localStorage as localStorageClient } from "@shared-vendor/clients";

class LocalStorage {
  setItem(key, value) {
    localStorageClient.setItem(key, value);
  }

  getItem(key) {
    return localStorageClient.getItem(key);
  }

  removeItem(key) {
    localStorageClient.removeItem(key);
  }

  clear() {
    localStorageClient.clear();
  }
}

export default new LocalStorage();
