import type { StorageOptions } from "@shared-vendor/types/Storage.type";

class StorageData {
  value: unknown;
  isSecure: boolean;
  expire: number;

  constructor(value: unknown, { secure = true, ttl }: StorageOptions) {
    const hasTtl = ttl || ttl === 0;

    this.value = value;
    this.isSecure = secure;
    this.expire = hasTtl ? +new Date().valueOf() + ttl : 0;
  }
}

export default StorageData;
