import { StorageData as StorageDataEntity } from "@packages/shared-vendor/entities";
import { crypto } from "@shared-vendor/libs";

const storageMapper = {
  toSetData(value, { secure, ttl }) {
    const encodedValue = secure ? crypto.encrypt(value) : value;

    return JSON.stringify(new StorageDataEntity(encodedValue, { secure, ttl }));
  },

  toGetData(data = "{}") {
    const { isSecure = false, expire = 0, value = null } = JSON.parse(data) || {};

    const remainedTime = expire - +new Date().valueOf();
    const decodedValue = isSecure && value ? crypto.decrypt(value) : value;

    if (expire && remainedTime <= 0) return null;

    return decodedValue;
  },
};

export default storageMapper;
