import type { StorageOptions } from "@shared-vendor/types/Storage.type";

class StorageData {
  value: unknown;
  isSecure: boolean;
  expire: number;

  constructor(value: unknown, { secure = true, ttl = 0 }: StorageOptions) {
    this.value = value;
    this.isSecure = secure;
    this.expire = ttl ? +new Date().valueOf() + ttl : 0;
  }
}

export default StorageData;
