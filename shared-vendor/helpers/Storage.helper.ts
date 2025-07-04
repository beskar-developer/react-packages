import type { StorageOptions } from "@shared-vendor/types";

import { storage as storageMapper } from "@shared-vendor/mappers";

class StorageFactory implements Storage {
  #storage;
  constructor(storage: Storage) {
    this.#storage = storage;
  }

  getItem(key: string) {
    const data = this.#storage.getItem(key) ?? "{}";
    const value = storageMapper.toGetData(data);
    if (!value) this.#storage.removeItem(key);

    return value;
  }

  setItem(key: string, value: unknown, options: StorageOptions = {}) {
    const { secure = true, ttl = 0 } = options;
    const data = storageMapper.toSetData(value, { secure, ttl });

    this.#storage.setItem(key, data);
  }

  removeItem(key: string) {
    this.#storage.removeItem(key);
  }

  clear() {
    this.#storage.clear();
  }

  get length() {
    return this.#storage.length;
  }

  key(index: number) {
    return this.#storage.key(index);
  }
}

export default StorageFactory;
