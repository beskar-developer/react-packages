class StorageData {
  constructor(value, { secure = true, ttl = 0 }) {
    this.value = value;
    this.isSecure = secure;
    this.expire = ttl ? +new Date().valueOf() + ttl : 0;
  }
}

export default StorageData;
