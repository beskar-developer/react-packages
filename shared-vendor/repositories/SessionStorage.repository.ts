import { sessionStorage as sessionStorageClient } from "@shared-vendor/clients";

class SessionStorage implements Storage {
  setItem(key: string, value: string) {
    sessionStorageClient.setItem(key, value);
  }

  getItem(key: string) {
    return sessionStorageClient.getItem(key);
  }

  removeItem(key: string) {
    sessionStorageClient.removeItem(key);
  }

  clear() {
    sessionStorageClient.clear();
  }

  get length() {
    return sessionStorageClient.length;
  }

  key(index: number) {
    return sessionStorageClient.key(index);
  }
}

export default new SessionStorage();
