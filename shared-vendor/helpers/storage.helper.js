import { storage as storageMapper } from "@shared-vendor/mappers";
import { storageKeySchema as keySchema, storageOptionsSchema as optionsSchema } from "@shared-vendor/schemas";

class Storage {
  #storage;
  constructor(storage) {
    this.#storage = storage;
  }

  getItem(key) {
    keySchema.validateSync(key);

    const data = this.#storage.getItem(key);
    const value = storageMapper.toGetData(data);
    if (!value) this.#storage.removeItem(key);

    return value;
  }

  setItem(key, value, options = {}) {
    keySchema.validateSync(key);
    optionsSchema.validateSync(options);

    const { secure = true, ttl = 0 } = options;
    const data = storageMapper.toSetData(value, { secure, ttl });

    this.#storage.setItem(key, data);
  }

  removeItem(key) {
    keySchema.validateSync(key);

    this.#storage.removeItem(key);
  }

  clear() {
    this.#storage.clear();
  }
}

export default Storage;
